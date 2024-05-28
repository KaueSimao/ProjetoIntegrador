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

const API_URL = 'http://localhost:3000'; // Atualize com o URL do seu JSON server

export default function SpecificSearchScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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
      
      setCourses(coursesResponse.data.map(course => ({ label: course.name, value: course.name.toLowerCase() })));
      setSemesters(semestersResponse.data.map(semester => ({ label: semester.name, value: semester.name.toLowerCase() })));
      setTeachers(teachersResponse.data.map(teacher => ({ label: teacher.name, value: teacher.name.toLowerCase() })));
      setDisciplines(disciplinesResponse.data.map(discipline => ({ label: discipline.name, value: discipline.name.toLowerCase() })));
      setRooms(roomsResponse.data.map(room => ({ label: room.name, value: room.name.toLowerCase() })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}/timetable`, {
        params: {
          course: selectedCourse,
          semester: selectedSemester,
          teacher: selectedTeacher,
          discipline: selectedDiscipline,
          room: selectedRoom
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textSearch}>Pesquisa Específica</Text>
      <Image source={require("./assets/fatec-logo.png")} style={styles.logo} />
      
      <Text style={styles.lbl_course}>Curso</Text>
      <RNPickerSelect
        items={courses}
        onValueChange={setSelectedCourse}
        placeholder={{ label: "Escolha seu curso:", value: '' }}
      />
      
      <Text style={styles.lbl_semester}>Semestre</Text>
      <RNPickerSelect
        items={semesters}
        onValueChange={setSelectedSemester}
        placeholder={{ label: "Escolha seu semestre:", value: '' }}
      />
      
      <Text style={styles.lbl_teacher}>Professor</Text>
      <RNPickerSelect
        items={teachers}
        onValueChange={setSelectedTeacher}
        placeholder={{ label: "Escolha o professor:", value: '' }}
      />
      
      <Text style={styles.lbl_discipline}>Disciplina</Text>
      <RNPickerSelect
        items={disciplines}
        onValueChange={setSelectedDiscipline}
        placeholder={{ label: "Escolha a disciplina:", value: '' }}
      />
      
      <Text style={styles.lbl_room}>Sala</Text>
      <RNPickerSelect
        items={rooms}
        onValueChange={setSelectedRoom}
        placeholder={{ label: "Escolha a sala:", value: '' }}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>PRÓXIMO</Text>
      </TouchableOpacity>

      {searchResults.length > 0 && (
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Curso</Text>
            <Text style={styles.tableHeaderText}>Semestre</Text>
            <Text style={styles.tableHeaderText}>Professor</Text>
            <Text style={styles.tableHeaderText}>Disciplina</Text>
            <Text style={styles.tableHeaderText}>Sala</Text>
            <Text style={styles.tableHeaderText}>Horário</Text>
          </View>
          <FlatList
            data={searchResults}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.course}</Text>
                <Text style={styles.tableCell}>{item.semester}</Text>
                <Text style={styles.tableCell}>{item.teacher}</Text>
                <Text style={styles.tableCell}>{item.discipline}</Text>
                <Text style={styles.tableCell}>{item.room}</Text>
                <Text style={styles.tableCell}>{item.time}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  textSearch: {
    fontSize: 30,
    fontFamily: "Roboto-Light",
    height: 60,
    width: "100%",
    textAlign: 'center',
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  lbl_course: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  lbl_semester: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  lbl_teacher: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  lbl_discipline: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  lbl_room: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 10,
    alignSelf: "flex-start",
  },
  button: {
    marginTop: 20,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#B20000",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "white",
  },
  table: {
    marginTop: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  }
});
