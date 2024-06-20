import React, { useState, useEffect } from "react";
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useFonts } from "expo-font";

const API_URL = 'http://localhost:3000'; 

export default function SpecificSearchScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [timetable, setTimetable] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const coursesResponse = await axios.get(`${API_URL}/courses`);
      const semestersResponse = await axios.get(`${API_URL}/semesters`);
      const teachersResponse = await axios.get(`${API_URL}/teachers`);
      const disciplinesResponse = await axios.get(`${API_URL}/disciplines`);
      const roomsResponse = await axios.get(`${API_URL}/rooms`);
      const timetableResponse = await axios.get(`${API_URL}/timetable`);

      setCourses(coursesResponse.data);
      setSemesters(semestersResponse.data);
      setTeachers(teachersResponse.data);
      setDisciplines(disciplinesResponse.data);
      setRooms(roomsResponse.data);
      setTimetable(timetableResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    let filteredTimetable = timetable;

    if (selectedCourse) {
      filteredTimetable = filteredTimetable.filter(item => item.courseId === selectedCourse);
    }
    if (selectedSemester) {
      filteredTimetable = filteredTimetable.filter(item => item.semesterId === selectedSemester);
    }
    if (selectedTeacher) {
      filteredTimetable = filteredTimetable.filter(item => item.teacherId === selectedTeacher);
    }
    if (selectedDiscipline) {
      filteredTimetable = filteredTimetable.filter(item => item.disciplineId === selectedDiscipline);
    }
    if (selectedRoom) {
      filteredTimetable = filteredTimetable.filter(item => item.roomId === selectedRoom);
    }

    if (filteredTimetable.length === 0) {
      setErrorMessage("Nenhum resultado encontrado para os filtros selecionados.");
    } else {
      setErrorMessage(null);
    }

    setTimetable(filteredTimetable);
  };


  const resetFilters = () => {
    setSelectedCourse(null);
    setSelectedSemester(null);
    setSelectedTeacher(null);
    setSelectedDiscipline(null);
    setSelectedRoom(null);
    fetchData();
  };

  const renderTimetableItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>{courses.find(course => course.id === item.courseId)?.name}</Text>
      <Text style={styles.tableCell}>{semesters.find(semester => semester.id === item.semesterId)?.name}</Text>
      <Text style={styles.tableCell}>{teachers.find(teacher => teacher.id === item.teacherId)?.name}</Text>
      <Text style={styles.tableCell}>{disciplines.find(discipline => discipline.id === item.disciplineId)?.name}</Text>
      <Text style={styles.tableCell}>{rooms.find(room => room.id === item.roomId)?.name}</Text>
      <Text style={styles.tableCell}>{item.time}</Text>
      <Text style={styles.tableCell}>{item.day}</Text>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/fatec-logo.png")} style={styles.logo} />
      <Text style={styles.title}>Filtro Específico</Text>

      <RNPickerSelect
        placeholder={{ label: "Selecione um curso", value: null }}
        value={selectedCourse}
        onValueChange={(value) => setSelectedCourse(value)}
        items={courses.map(course => ({ label: course.name, value: course.id }))}
      />

      <RNPickerSelect
        placeholder={{ label: "Selecione um semestre", value: null }}
        value={selectedSemester}
        onValueChange={(value) => setSelectedSemester(value)}
        items={semesters.map(semester => ({ label: semester.name, value: semester.id }))}
      />

      <RNPickerSelect
        placeholder={{ label: "Selecione um professor", value: null }}
        value={selectedTeacher}
        onValueChange={(value) => setSelectedTeacher(value)}
        items={teachers.map(teacher => ({ label: teacher.name, value: teacher.id }))}
      />

      <RNPickerSelect
        placeholder={{ label: "Selecione uma disciplina", value: null }}
        value={selectedDiscipline}
        onValueChange={(value) => setSelectedDiscipline(value)}
        items={disciplines.map(discipline => ({ label: discipline.name, value: discipline.id }))}
      />

      <RNPickerSelect
        placeholder={{ label: "Selecione uma sala", value: null }}
        value={selectedRoom}
        onValueChange={(value) => setSelectedRoom(value)}
        items={rooms.map(room => ({ label: room.name, value: room.id }))}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
        <Text style={styles.resetButtonText}>Redefinir Filtros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reserButton} onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Curso</Text>
          <Text style={styles.tableHeaderText}>Semestre</Text>
          <Text style={styles.tableHeaderText}>Professor</Text>
          <Text style={styles.tableHeaderText}>Disciplina</Text>
          <Text style={styles.tableHeaderText}>Sala</Text>
          <Text style={styles.tableHeaderText}>Horário</Text>
          <Text style={styles.tableHeaderText}>Dia</Text>
        </View>
        <FlatList
          data={timetable}
          renderItem={renderTimetableItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
    left: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resetButtonText: {
    color: "white",
    textAlign: "center",
  },
  table: {
    marginTop: 20,
    width: "90%",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    padding: 10,
  },
});
