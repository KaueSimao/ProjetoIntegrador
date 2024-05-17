import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { useFonts } from "expo-font";

const courses = [
  { label: "Engenharia", value: "engenharia" },
  { label: "Medicina", value: "medicina" },
  { label: "Direito", value: "direito" },
  { label: "Administração", value: "administracao" },
  // Adicione mais cursos conforme necessário
];
export default function SpecificSearchScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textSearch}>Pesquisa Específica</Text>
      <Image source={require("./assets/fatec-logo.png")} style={styles.logo} />
      <Text style={styles.lbl_course}>Curso</Text>
      <Text style={styles.lbl_semester}>Semestre</Text>
      <TextInput style={styles.input} placeholder="Escolha seu semestre" />
      <Text style={styles.lbl_teacher}>Professor</Text>
      <TextInput style={styles.input} placeholder="Escolha o professor" />
      <Text style={styles.lbl_discipline}>Disciplina</Text>
      <TextInput style={styles.input} placeholder="Escolha a disciplina" />
      <Text style={styles.lbl_room}>Sala</Text>
      <TextInput style={styles.input} placeholder="Escolha a sala" />

      <View style={styles.optionsContainer}>
        <View style={styles.checkboxContainer}>
        </View>
      </View>
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
    top: 800,
    backgroundColor: "white",
  },
  textSearch: {
    fontSize: 60,
    top: 457,
    left: 249,
    fontFamily: "Roboto-Light",
    height: 137,
    width: 582,
  },
  logo: {
    top: 138,
    left: 7258,
    width: 357,
    height: 175,
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
  input: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    width: 450,
    height: 50,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
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
  signUp: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    color: "red",
    textDecorationLine: "none",
  },
});