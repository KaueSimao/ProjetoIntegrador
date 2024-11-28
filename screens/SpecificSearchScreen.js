import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { Calendar } from "react-native-calendars";
import * as Localization from "react-native-localize"; // Importando o pacote

const API_URL = "https://projeto-integrador-1v4i.onrender.com";

export default function SpecificSearchScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [timetable, setTimetable] = useState([]); // Para armazenar o horário que será exibido
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data atual
  const [reservations, setReservations] = useState([]); // Dados de reservas
  const [isTokenLoaded, setIsTokenLoaded] = useState(false); // Estado que indica se o token foi carregado

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setAccessToken(token);
      setIsTokenLoaded(true); // Marca que o token foi carregado
    };

    getToken();
  }, []);

  useEffect(() => {
    if (isTokenLoaded) {
      fetchFilters();
      fetchFilteredTimetable();
    }
  }, [isTokenLoaded, accessToken]);

  const getCalendarLocale = () => {
    const locales = Localization.getLocales();
    if (locales && locales[0].languageTag === "pt-BR") {
      return "pt-br";
    }
    return "en";
  };

  const fetchFilteredTimetable = async () => {
    if (!accessToken) {
      return setErrorMessage("Token não encontrado. Por favor, faça login novamente.");
    }

    try {
      const selectedDay = selectedDate?.toISOString().split("T")[0]; // Formata a data
      const reservationResponse = await axios.get(`${API_URL}/reservation/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Filtrando reservas para a data selecionada
      const filteredReservations = reservationResponse.data.filter(
        (item) => item.date === selectedDay
      );

      if (filteredReservations.length > 0) {
        setReservations(filteredReservations); // Exibe as reservas
        setTimetable(filteredReservations); // Exibe a tabela com as reservas
      } else {
        const scheduleResponse = await axios.get(`${API_URL}/schedule/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Exibe os horários fixos caso não haja reservas
        setReservations(scheduleResponse.data); 
        setTimetable(scheduleResponse.data); 
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao carregar os dados. Tente novamente mais tarde.");
    }
  };

  const fetchFilters = async () => {
    if (!accessToken) {
      return setErrorMessage("Token não encontrado. Por favor, faça login novamente.");
    }

    try {
      const teachersResponse = await axios.get(`${API_URL}/teacher/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const subjectsResponse = await axios.get(`${API_URL}/subject/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const coursesResponse = await axios.get(`${API_URL}/course/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Organizando os filtros (professores, cursos, disciplinas)
      if (Array.isArray(teachersResponse.data)) {
        const formattedTeachers = teachersResponse.data.map((teacher) => ({
          label: teacher.teacherName,
          value: teacher.teacherId,
        }));
        setTeachers(formattedTeachers);
      }

      if (Array.isArray(subjectsResponse.data)) {
        const formattedSubjects = subjectsResponse.data.map((subject) => ({
          label: subject.subjectName,
          value: subject.subjectName,
        }));
        setSubjects(formattedSubjects);
      }

      if (Array.isArray(coursesResponse.data)) {
        const formattedCourses = coursesResponse.data.map((course) => ({
          label: course.courseName,
          value: course.courseName,
        }));
        setCourses(formattedCourses);
      }

    } catch (error) {
      console.error("Erro ao carregar os filtros", error);
      setErrorMessage("Erro ao carregar os filtros. Tente novamente mais tarde.");
    }
  };

  const renderTable = () => {
    if (timetable.length === 0) {
      return <Text style={styles.emptyMessage}>Não há horários disponíveis para a data selecionada.</Text>;
    }

    return (
      <FlatList
        data={timetable}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.course || "Curso Indisponível"}</Text>
            <Text style={styles.tableCell}>{item.weekDay || "Dia não especificado"}</Text>
            <Text style={styles.tableCell}>{item.teacher}</Text>
            <Text style={styles.tableCell}>{item.subject}</Text>
            <Text style={styles.tableCell}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>
        <Image source={require("../assets/fatec-logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.title}>Filtro Específico</Text>

      <Calendar
        onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
        markedDates={{
          [selectedDate?.toISOString().split("T")[0]]: {
            selected: true,
            marked: true,
            selectedColor: "#B20000",
          },
        }}
        theme={{
          selectedDayBackgroundColor: "#B20000",
          todayTextColor: "#B20000",
          arrowColor: "#B20000",
        }}
        locale={getCalendarLocale()}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedTeacher(value)}
        items={teachers}
        placeholder={{ label: "Selecione um Professor", value: undefined }}
        value={selectedTeacher || ""}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedCourse(value)}
        items={courses}
        placeholder={{ label: "Selecione um Curso", value: undefined }}
        value={selectedCourse || ""}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedSubject(value)}
        items={subjects.map((subject) => ({
          label: subject.name,
          value: subject.id,  // Usando 'id' para garantir que a chave seja única
          key: subject.id,    // Adicionando 'key' com um identificador único
        }))}
        placeholder={{ label: "Selecione uma Disciplina", value: undefined }}
        value={selectedSubject || ""}
        style={pickerSelectStyles}
      />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Curso</Text>
          <Text style={styles.tableHeaderText}>Dia</Text>
          <Text style={styles.tableHeaderText}>Professor</Text>
          <Text style={styles.tableHeaderText}>Disciplina</Text>
          <Text style={styles.tableHeaderText}>Horário</Text>
        </View>
        {renderTable()}
      </View>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  voltar: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B20000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#B20000",
    paddingVertical: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#B20000",
  },
  errorMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "red",
  },
});

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // para ícones à direita
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
});
