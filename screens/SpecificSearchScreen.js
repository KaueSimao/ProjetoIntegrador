import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { Calendar, LocaleConfig } from "react-native-calendars";


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

  LocaleConfig.locales['pt-br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
    today: 'Hoje'
  };

  LocaleConfig.defaultLocale = 'pt-br';
  const fetchFilteredTimetable = async () => {
    if (!accessToken) {
      return setErrorMessage("Token não encontrado. Por favor, faça login novamente.");
    }
  
    try {
      // Converter a data selecionada para o formato 'YYYY-MM-DD' sem a hora
      const selectedDay = selectedDate?.toISOString().split("T")[0]; // Formata apenas a data (sem a hora)
      const selectedWeekDay = selectedDate.toLocaleString('pt-BR', { weekday: 'long' }).toLowerCase();
  
      console.log("Selected Day:", selectedDay);
      console.log("Selected Week Day:", selectedWeekDay);
  
      // Buscar as reservas
      const reservationResponse = await axios.get(`${API_URL}/reservation/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Reservation Response:", reservationResponse.data);
  
      // Filtrar as reservas com base na data selecionada (sem hora) ou no dia da semana
      const filteredReservations = reservationResponse.data.filter((item) => {
        const reservationDate = item.date; // Data sem hora
        const reservationWeekDay = item.weekDay.toLowerCase(); // O dia da semana da reserva
        console.log("Reservation Date:", reservationDate);
        console.log("Reservation Week Day:", reservationWeekDay);
  
        // Verifica se a data da reserva é igual à data selecionada ou se o dia da semana é igual
        return reservationDate === selectedDay || reservationWeekDay === selectedWeekDay;
      });
      console.log("Filtered Reservations:", filteredReservations);
  
      // Buscar os horários fixos
      const scheduleResponse = await axios.get(`${API_URL}/schedule/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Schedule Response:", scheduleResponse.data);
  
      // Filtrar os horários fixos com base no dia da semana selecionado
      const filteredSchedule = scheduleResponse.data.filter((schedule) => {
        const scheduleDay = schedule.weekday.toLowerCase(); // Dia da semana do horário fixo
        console.log("Filtered Schedule Day:", scheduleDay);
  
        return scheduleDay === selectedWeekDay;
      });
  
      console.log("Filtered Schedule:", filteredSchedule);
  
      // Se não houver reservas, use os horários fixos
      if (filteredReservations.length === 0) {
        setTimetable(filteredSchedule);
      } else {
        // Processar os horários, substituindo pelos horários de reserva quando a data coincidir
        const timetable = filteredSchedule.map((schedule) => {
          // Verifica se existe uma reserva para o mesmo horário no dia da semana
          const reservationForSchedule = filteredReservations.find((reservation) => {
            const reservationTime = reservation.time.split(" - ")[1].split(" ")[0]; // Extraí o horário da reserva (ex: "13:00")
            const scheduleTime = schedule.time.split(" - ")[0]; // Extraí o horário fixo (ex: "08:00")
  
            console.log("Reservation Time:", reservationTime);
            console.log("Schedule Time:", scheduleTime);
  
            return reservationTime === scheduleTime; // Comparar os horários
          });
  
          if (reservationForSchedule) {
            // Se a reserva existir, substitui pelo horário da reserva
            return {
              ...schedule,
              status: 'reserved',
              reservation: reservationForSchedule,
            };
          } else {
            // Caso contrário, exibe o horário fixo como disponível
            return {
              ...schedule,
              status: 'available',
            };
          }
        });
  
        setTimetable(timetable);
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
          label: teacher.teacherName || "Professor não disponível", // Garantir que o label nunca seja undefined
          value: teacher.teacherId,
        }));
        setTeachers(formattedTeachers);
      }

      if (Array.isArray(subjectsResponse.data)) {
        const formattedSubjects = subjectsResponse.data.map((subject) => ({
          label: subject.subjectName || "Disciplina não disponível", // Garantir que o label nunca seja undefined
          value: subject.subjectName,
        }));
        setSubjects(formattedSubjects);
      }

      if (Array.isArray(coursesResponse.data)) {
        const formattedCourses = coursesResponse.data.map((course) => ({
          label: course.courseName || "Curso não disponível", // Garantir que o label nunca seja undefined
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
  onDayPress={(day) => {
    const newSelectedDate = new Date(day.dateString); // cria a data correta
    setSelectedDate(newSelectedDate);
    console.log("Selected Date on Day Press:", newSelectedDate); // Verificar o novo valor
  }}
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
/>

      <RNPickerSelect
        onValueChange={(value) => setSelectedTeacher(value)}
        items={teachers && teachers.length > 0
          ? teachers.map((teacher, index) => ({
            label: teacher.label || "Curso não disponível",
            value: teacher.value || "defaultTeacher",
            key: `${teacher.value}-${index}`
          }))
          : [{ label: "Nenhum professor disponível", value: "defaultTeacher" }]}
        placeholder={{ label: "Selecione um Professor", value: undefined }}
        value={selectedTeacher || "defaultTeacher"}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedCourse(value)}
        items={courses && courses.length > 0
          ? courses.map((course, index) => ({
            label: course.label || "Curso não disponível",
            value: course.value || "defaultCourse",
            key: `${course.value}-${index}`
          }))
          : [{ label: "Nenhum curso disponível", value: "defaultCourse" }]}
        placeholder={{ label: "Selecione um Curso", value: undefined }}
        value={selectedCourse || "deafultCourse"}
        style={pickerSelectStyles}
      />



      <RNPickerSelect
        onValueChange={(value) => setSelectedSubject(value)}
        items={subjects && subjects.length > 0 ? subjects.map((subject, index) => ({
          label: subject.label || "Disciplina não disponível",
          value: subject.value || "defaultSubject", // Valor padrão
          key: `${subject.value}-${index}`
        })) : [{ label: "Nenhuma disciplina disponível", value: "defaultSubject" }]} // Valor padrão caso a lista esteja vazia
        placeholder={{ label: "Selecione uma Disciplina", value: undefined }}
        value={selectedSubject || "defaultSubject"} // Valor padrão
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
