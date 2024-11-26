import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";

const API_URL = "https://projeto-integrador-1v4i.onrender.com";

export default function SpecificSearchScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [accessToken, setAccessToken] = useState(null);

  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const weeks = Array.from({ length: 4 }, (_, i) => `Semana ${i + 1}`);
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
    value: i,
  }));

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setAccessToken(token);
    };

    getToken();
    fetchFilters();
    fetchData();
  }, [accessToken]);

  const fetchData = async () => {
    if (!accessToken) {
      return setErrorMessage("Token não encontrado. Por favor, faça login novamente.");
    }

    try {
      const timetableResponse = await axios.get(`${API_URL}/schedule/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTimetable(timetableResponse.data);
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

      const formattedTeachers = Array.isArray(teachersResponse.data)
        ? teachersResponse.data.map((teacher, index) => ({
          label: teacher.teacherName,
          value: teacher.teacherId,
          key: `${teacher.teacherId}-${index}`,
        }))
        : [teachersResponse.data].map((teacher, index) => ({
          label: teacher.teacherName,
          value: teacher.teacherId,
          key: `${teacher.teacherId}-${index}`,
        }));

      console.log("Professor Formatado:", JSON.stringify(formattedTeachers, null, 2));

      const formattedCourses = Array.isArray(coursesResponse.data)
        ? coursesResponse.data.map((course, index) => ({
          label: course.courseName,
          value: course.courseName,
          key: `${course.courseName}-${index}`,
        }))
        : [];

      const formattedSubjects = Array.isArray(subjectsResponse.data)
        ? subjectsResponse.data.map((subject, index) => ({
          label: subject.subjectName,
          value: subject.subjectName,
          key: `${subject.subjectName}-${index}`,
        }))
        : [];

      setTeachers(formattedTeachers);
      setCourses(formattedCourses);
      setSubjects(formattedSubjects);
    } catch (error) {
      console.error("Erro ao carregar os filtros", error);
      setErrorMessage("Erro ao carregar os filtros. Tente novamente mais tarde.");
    }
  };

  const filterTimetable = () => {
    return timetable.filter((item) => {
      const matchesTeacher = selectedTeacher ? item.teacher === selectedTeacher : true;
      const matchesCourse = selectedCourse ? item.course === selectedCourse : true;
      const matchesSubject = selectedSubject ? item.subject === selectedSubject : true;
      return matchesTeacher && matchesCourse && matchesSubject;
    });
  };

  const getWeekTimetable = () => {
    const startOfWeek = selectedWeek * 7;
    return filterTimetable().filter((item) => {
      const dayIndex = new Date(item.date).getDay();
      return dayIndex >= startOfWeek && dayIndex < startOfWeek + 7;
    });
  };

  const renderTimetableItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.course}</Text>
      <Text style={styles.tableCell}>{item.semester}</Text>
      <Text style={styles.tableCell}>{item.teacher}</Text>
      <Text style={styles.tableCell}>{item.subject}</Text>
      <Text style={styles.tableCell}>{item.time}</Text>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  const weekTimetable = getWeekTimetable();

  return (

    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("HomeScreen")}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>
        <Image source={require("../assets/fatec-logo.png")} style={styles.logo} />
      </View>

      <Text style={styles.title}>Filtro Específico</Text>

      <RNPickerSelect
        onValueChange={(value) => setSelectedMonth(value)}
        items={months}
        placeholder={{ label: "Selecione um Mês", value: undefined }}
        value={selectedMonth || ""}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedWeek(value)}
        items={weeks.map((week, index) => ({ label: week, value: index }))}
        placeholder={{ label: "Selecione uma Semana", value: undefined }}
        value={selectedWeek || ""}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedTeacher(value)}  // O value agora é o teacherId
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
        items={subjects}
        placeholder={{ label: "Selecione uma Disciplina", value: undefined }}
        value={selectedSubject || ""}
        style={pickerSelectStyles}
      />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Curso</Text>
          <Text style={styles.tableHeaderText}>Semestre</Text>
          <Text style={styles.tableHeaderText}>Professor</Text>
          <Text style={styles.tableHeaderText}>Disciplina</Text>
          <Text style={styles.tableHeaderText}>Horário</Text>
        </View>
        {weekTimetable.length > 0 ? (
          <FlatList
            data={weekTimetable}
            renderItem={renderTimetableItem}
            keyExtractor={(item) => item.scheduleId.toString()}
          />
        ) : (
          <Text style={styles.emptyMessage}>Nenhum horário encontrado para a semana selecionada.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 50,
    marginLeft: 150,
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#B20000",
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  emptyMessage: {
    padding: 20,
    textAlign: "center",
    color: "#999",
  },
  voltar: {
    textDecorationLine: "underline",
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    marginTop: 25,
    color: "#B20000",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#000",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#000",
    marginBottom: 20,
  },
};
