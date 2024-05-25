import React, { useState, useEffect } from "react";
import RNPickerSelect from 'react-native-picker-select';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import database from './db.json';

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

  useEffect(() => {
    setCourses(database.courses.map(course => ({ label: course, value: course.toLowerCase() })));
    setSemesters(database.semesters.map(semester => ({ label: semester, value: semester.toLowerCase() })));
    setTeachers(database.teachers.map(teacher => ({ label: teacher, value: teacher.toLowerCase() })));
    setDisciplines(database.disciplines.map(discipline => ({ label: discipline, value: discipline.toLowerCase() })));
    setRooms(database.rooms.map(room => ({ label: room, value: room.toLowerCase() })));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textSearch}>Pesquisa Específica</Text>
      <Image source={require("./assets/fatec-logo.png")} style={styles.logo} />
      <Text style={styles.lbl_course}>Curso</Text>
      <RNPickerSelect
        items={courses}
        onValueChange={(value) => console.log(value)}
        placeholder={{ label: "Escolha seu curso:", value: null }}
      />
      <Text style={styles.lbl_semester}>Semestre</Text>
      <RNPickerSelect
        items={semesters}
        onValueChange={(value) => console.log(value)}
        placeholder={{ label: "Escolha seu semestre:", value: null }}
      />
      <Text style={styles.lbl_teacher}>Professor</Text>
      <RNPickerSelect
        items={teachers}
        onValueChange={(value) => console.log(value)}
        placeholder={{ label: "Escolha o professor:", value: null }}
      />
      <Text style={styles.lbl_discipline}>Disciplina</Text>
      <RNPickerSelect
        items={disciplines}
        onValueChange={(value) => console.log(value)}
        placeholder={{ label: "Escolha a disciplina:", value: null }}
      />
      <Text style={styles.lbl_room}>Sala</Text>
      <RNPickerSelect
        items={rooms}
        onValueChange={(value) => console.log(value)}
        placeholder={{ label: "Escolha a sala:", value: null }}
      />
      <TouchableOpacity style={styles.button}>
        <Text
          onPress={() => navigation.navigate("Home")}
          style={styles.buttonText}
        >
          PRÓXIMO
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  textSearch: {
    fontSize: 60,
    fontFamily: "Roboto-Light",
    height: 137,
    width: 582,
    textAlign: 'center',
    marginTop: 50,
  },
  logo: {
    width: 357,
    height: 175,
    marginBottom: 50,
  },
  lbl_course: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  lbl_semester: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  lbl_teacher: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  lbl_discipline: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  lbl_room: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  button: {
    marginTop: 100,
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
});
