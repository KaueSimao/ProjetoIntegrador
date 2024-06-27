import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";

export default function AutoRegisterScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const courses = [
    { label: "Engenharia", value: "engenharia" },
    { label: "Medicina", value: "medicina" },
    { label: "Direito", value: "direito" },
    { label: "Administração", value: "administracao" },
  ];

  const validateFields = () => {
    // Trim whitespace from inputs
    const trimmedNome = nome.trim();
    const trimmedEmail = email.trim();
    const trimmedSenha = senha.trim();
    const trimmedConfirmaSenha = confirmaSenha.trim();
    const regex = /^[\s]+$/;

    // Validate name: no special characters
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!trimmedNome || !nameRegex.test(trimmedNome)) {
      alert("Erro, nome deve conter apenas letras e espaços.");
      return false;
    }

    // Validate email: must be institutional
    if (!trimmedEmail.endsWith("@fatec.sp.gov.br") && !regex.test(trimmedEmail)) {
      alert("Erro, o email precisa ser institucional.");
      return false;
    }

    // Validate password match
    if (trimmedSenha !== trimmedConfirmaSenha) {
      alert("Erro, as senhas não coincidem.");
      return false;
    }

    return true;
  };

  const cadastro = async () => {
    if (!validateFields()) {
      return;
    }

    const data = {
      name: nome.trim(), // Ensure trimmed value is used for saving
      email: email.trim(), // Ensure trimmed value is used for saving
      password: senha,
      courseId: selectedCourse,
    };

    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Sucesso, cadastro realizado com sucesso!");
        navigation.navigate("Login");
      } else {
        const responseData = await response.json();
        alert("Erro", responseData.message || "Erro ao tentar realizar o cadastro.");
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao tentar realizar o cadastro.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmaSenha("");
      setSelectedCourse(null);
    }, [])
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/fatec-logo.png")} style={styles.logo} />
      <View style={styles.groupInputs}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome:"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        <Text style={styles.label}>Email institucional</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email:"
          onChangeText={(text) => setEmail(text.trim())}
          value={email}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha:"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text.trim())} // Trim input
          value={senha}
        />

        <Text style={styles.label}>Repita a senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha:"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmaSenha(text.trim())} // Trim input
          value={confirmaSenha}
        />
        <Text style={styles.label}>Curso</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCourse(value)}
          items={courses}
          placeholder={{ label: "Escolha seu curso:", value: null }}
          style={pickerSelectStyles}
          value={selectedCourse}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={cadastro}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  groupInputs: {
    width: "100%",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#B20000",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonVoltar: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#333",
  },
  inputAndroid: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#333",
  },
});
