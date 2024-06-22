import React, { useState } from "react";
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

  const cadastro = async () => {
    const data = {
      name: nome,
      email: email,
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

      // Verificar se as senhas coincidem
      if (senha !== confirmaSenha) {
        alert("Erro, as senhas não coincidem.");
        return;
      }

      // Validar se todos os campos obrigatórios foram preenchidos
      if (!nome || !email || !senha || !selectedCourse) {
        alert("Erro, preencha todos os campos obrigatórios.");
        return;
      }

      if (response.ok) {
        alert("Sucesso, cadastro realizado com sucesso!");
        // Redirecionar para a tela de login ou outra tela necessária após o cadastro
        navigation.navigate("Login");
      } else {
        alert("Erro", data.message || "Erro ao tentar realizar o cadastro.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar realizar o cadastro.");
    }
  };
  
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
        />
        <Text style={styles.label}>Email institucional</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email:"
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha:"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />
        <Text style={styles.label}>Repita a senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Repita sua senha:"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmaSenha(text)}
        />
        <Text style={styles.label}>Curso</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCourse(value)}
          items={courses}
          placeholder={{ label: "Escolha seu curso:", value: null }}
          style={pickerSelectStyles}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={cadastro}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
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
    marginTop: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
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
