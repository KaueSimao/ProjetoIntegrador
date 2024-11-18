import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  PressableOpacity
} from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import { registerStudent } from '../api/apiService'; // Verifique o caminho


export default function AutoRegisterScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [studentName, setNome] = useState("");
  const [institutionalEmail, setEmail] = useState("");
  const [studentPassword, setSenha] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const validateFields = () => {
    const trimmedNome = studentName.trim();
    const trimmedEmail = institutionalEmail.trim(); // Corrigido aqui
    const trimmedSenha = studentPassword.trim();
    const regex = /^[\s]+$/;

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!trimmedNome || !nameRegex.test(trimmedNome)) {
      setAlertMessage("Erro, o nome deve conter apenas letras e espaços.");
      setAlertVisible(true);
      return false;
    }

    if (!trimmedEmail.endsWith("@fatec.sp.gov.br") && !regex.test(trimmedEmail)) {
      setAlertMessage("Erro, o email precisa ser institucional.");
      setAlertVisible(true);
      return false;
    }

    if (trimmedSenha === "") {
      setAlertMessage("Erro, digite uma senha.");
      setAlertVisible(true);
      return false;
    }

    return true;
  };

  const cadastro = async () => {
    if (!validateFields()) {
      return;
    }

    const data = {
      studentName: studentName.trim(),
      institutionalEmail: institutionalEmail.trim(),
      studentPassword: studentPassword,
    };

    try {
      const response = await registerStudent(data);
      setAlertMessage("Sucesso, cadastro realizado com sucesso!");
      setAlertVisible(true);
      setRedirectToLogin(true);
    } catch (error) {
      console.error(error);
      setAlertMessage("Erro ao tentar realizar o cadastro.");
      setAlertVisible(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setNome("");
      setEmail("");
      setSenha("");
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
          value={studentName}
        />
        <Text style={styles.label}>Email institucional</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email:"
          onChangeText={(text) => setEmail(text.trim())}
          value={institutionalEmail}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha:"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text.trim())}
          value={studentPassword}
        />
        
        <PressableOpacity
          style={styles.button}
          onPress={cadastro}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </PressableOpacity>
        <PressableOpacity
          style={styles.buttonVoltar}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>VOLTAR</Text>
        </PressableOpacity>
      </View>
      <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title="Atenção"
        message={alertMessage}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#000"
        onConfirmPressed={() => {
          setAlertVisible(false);
          if (redirectToLogin) {
            navigation.navigate("Login");
          }
        }}
        titleStyle={styles.alertTitle}
        messageStyle={styles.alertMessage}
        confirmButtonTextStyle={styles.alertButtonText}
      />
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
  alertTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    color: "#B20000",
  },
  alertMessage: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#333",
  },
  alertButtonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#fff",
  },
});
