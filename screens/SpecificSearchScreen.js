import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";

const API_URL = "http://localhost:3000";

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
  
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [selectedCourse, selectedSemester, selectedTeacher, selectedDiscipline, selectedRoom]);

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
      filteredTimetable = filteredTimetable.filter(
        (item) => item.courseId === selectedCourse
      );
    }
    if (selectedSemester) {
      filteredTimetable = filteredTimetable.filter(
        (item) => item.semesterId === selectedSemester
      );
    }
    if (selectedTeacher) {
      filteredTimetable = filteredTimetable.filter(
        (item) => item.teacherId === selectedTeacher
      );
    }
    if (selectedDiscipline) {
      filteredTimetable = filteredTimetable.filter(
        (item) => item.disciplineId === selectedDiscipline
      );
    }
    if (selectedRoom) {
      filteredTimetable = filteredTimetable.filter(
        (item) => item.roomId === selectedRoom
      );
    }

    if (filteredTimetable.length === 0) {
      setErrorMessage(
        "Nenhum resultado encontrado para os filtros selecionados."
      );
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

  const handleDayChange = (direction) => {
    if (direction === "prev") {
      setCurrentDayIndex((prevIndex) =>
        prevIndex === 0 ? daysOfWeek.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentDayIndex((prevIndex) =>
        prevIndex === daysOfWeek.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const getDayTimetable = (day) => {
    return timetable.filter((item) => item.day === day);
  };

  const renderTimetableItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.id}</Text>
      <Text style={styles.tableCell}>
        {courses.find((course) => course.id === item.courseId)?.name}
      </Text>
      <Text style={styles.tableCell}>
        {semesters.find((semester) => semester.id === item.semesterId)?.name}
      </Text>
      <Text style={styles.tableCell}>
        {teachers.find((teacher) => teacher.id === item.teacherId)?.name}
      </Text>
      <Text style={styles.tableCell}>
        {
          disciplines.find((discipline) => discipline.id === item.disciplineId)
            ?.name
        }
      </Text>
      <Text style={styles.tableCell}>
        {rooms.find((room) => room.id === item.roomId)?.name}
      </Text>
      <Text style={styles.tableCell}>{item.time}</Text>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  const currentDay = daysOfWeek[currentDayIndex];
  const dayTimetable = getDayTimetable(currentDay);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/fatec-logo.png")} style={styles.logo} />
      <Text style={styles.title}>Filtro Específico</Text>

      <ScrollView style={styles.filtersContainer}>
        <RNPickerSelect
          placeholder={{ label: "Selecione seu curso", value: null }}
          value={selectedCourse}
          onValueChange={(value) => setSelectedCourse(value)}
          items={courses.map((course) => ({
            label: course.name,
            value: course.id,
          }))}
          style={pickerSelectStyles}
        />

        <RNPickerSelect
          placeholder={{ label: "Selecione um semestre", value: null }}
          value={selectedSemester}
          onValueChange={(value) => setSelectedSemester(value)}
          items={semesters.map((semester) => ({
            label: semester.name,
            value: semester.id,
          }))}
          style={pickerSelectStyles}
        />

        <RNPickerSelect
          placeholder={{ label: "Selecione um professor", value: null }}
          value={selectedTeacher}
          onValueChange={(value) => setSelectedTeacher(value)}
          items={teachers.map((teacher) => ({
            label: teacher.name,
            value: teacher.id,
          }))}
          style={pickerSelectStyles}
        />

        <RNPickerSelect
          placeholder={{ label: "Selecione uma disciplina", value: null }}
          value={selectedDiscipline}
          onValueChange={(value) => setSelectedDiscipline(value)}
          items={disciplines.map((discipline) => ({
            label: discipline.name,
            value: discipline.id,
          }))}
          style={pickerSelectStyles}
        />

        <RNPickerSelect
          placeholder={{ label: "Selecione uma sala", value: null }}
          value={selectedRoom}
          onValueChange={(value) => setSelectedRoom(value)}
          items={rooms.map((room) => ({ label: room.name, value: room.id }))}
          style={pickerSelectStyles}
        />
      </ScrollView>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
        <Text style={styles.resetButtonText}>Redefinir Filtros</Text>
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
        </View>
        {dayTimetable.length > 0 ? (
          <FlatList
            data={dayTimetable}
            renderItem={renderTimetableItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyMessage}>Nenhum item encontrado para {currentDay}</Text>
        )}
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => handleDayChange("prev")}>
          <Text style={styles.navigationText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.navigationText}>{currentDay}</Text>
        <TouchableOpacity onPress={() => handleDayChange("next")}>
          <Text style={styles.navigationText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 50,
    alignSelf: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 20,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  resetButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  resetButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
  },
  tableCell: {
    flex: 1,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navigationText: {
    fontSize: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
