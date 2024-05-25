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
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const courses = [
    { label: "Engenharia", value: "engenharia" },
    { label: "Medicina", value: "medicina" },
    { label: "Direito", value: "direito" },
    { label: "Administração", value: "administracao" },
  ];

  const cadastro = async () => {
    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          password: senha,
          course: selectedCourse,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }
  
      const data = await response.json();
      alert('Cadastro realizado com sucesso!');
      console.log(data);

      // Navegar para a página de login após cadastro bem-sucedido
      navigation.navigate('Login');

    } catch (error) {
      console.error(error);
      alert('Falha ao realizar o cadastro');
    }
  };
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require("./assets/fatec-logo.png")} style={styles.logo} />
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
          placeholder="Digite seu email: "
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha: "
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
        />
        <Text style={styles.label}>Repita a senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha:"
          secureTextEntry={true}
        />
        <Text style={styles.label}>Curso</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCourse(value)}
          items={courses}
          placeholder={{ label: "Escolha seu curso:", value: null }}
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
    padding: 50,
    alignItems: "center",
  },
  groupInputs: {
    alignItems: "center",
    marginTop: 20,
    width: 450,
  },
  logo: {
    width: 689,
    height: 286,
    marginBottom: 50,
  },
  label: {
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
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
  },
  button: {
    marginTop: 30,
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
