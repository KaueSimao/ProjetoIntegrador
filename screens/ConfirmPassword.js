import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { resetPassword } from "../api/apiService";
import axios from "axios";
import * as Linking from 'expo-linking'; // Importando Linking

const ConfirmPassword = ({ navigation }) => {
  const [password, setPassword] = useState(""); // Estado para a senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar senha
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertVisible, setAlertVisible] = useState(false); 
  const [token, setToken] = useState(""); // Estado para armazenar o token extraído da URL

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const showAlert = (message, isSuccess = false) => {
    setAlertMessage(message);
    setAlertVisible(true);

    if (isSuccess) {
      setTimeout(() => {
        setAlertVisible(false);
        navigation.navigate("Login"); // Navega para a tela de login após o sucesso
      }, 2000); 
    } else {
      setTimeout(() => setAlertVisible(false), 2000);
    }
  };

  // Função para extrair o token da URL
  useEffect(() => {
    const getTokenFromUrl = async () => {
      try {
        const url = await Linking.getInitialURL(); // Obtém a URL inicial
        if (url) {
          // Exemplo de URL: http://localhost:8080/student/reset-password?token=0c31a721-def9-4cfe-9721-c6305204e520
          const tokenMatch = url.match(/token=([a-f0-9\-]+)/); // Expressão regular para capturar o token
          if (tokenMatch && tokenMatch[1]) {
            setToken(tokenMatch[1]); // Armazena o token no estado
          } else {
            showAlert("Token inválido ou ausente.", false);
          }
        }
      } catch (error) {
        console.error("Erro ao obter a URL: ", error);
        showAlert("Erro ao processar o link de recuperação.", false);
      }
    };

    getTokenFromUrl();
  }, []);

  if (!fontsLoaded) return null;

  const handleConfirmPassword = async () => {
    // Verificar se as senhas são iguais
    if (password !== confirmPassword) {
      showAlert("As senhas devem ser iguais.", false);
      return;
    }

    // Verificar se o token está presente
    if (!token) {
      showAlert("Token não encontrado.", false);
      return;
    }

    // Enviar a requisição de reset de senha
    setIsLoading(true);
    try {
      const response = await resetPassword(token, password); // Passa o token e a nova senha para o backend
      if (response.success) {
        showAlert("Senha resetada com sucesso.", true);
      } else {
        showAlert("Erro ao resetar a senha. Tente novamente.", false);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      showAlert("Erro ao resetar a senha.", false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textRecoverPassword}>CONFIRMAR NOVA SENHA</Text>
      <Image source={require("../assets/profile.png")} style={styles.logo} />
      {alertVisible && (
        <View style={[styles.alertContainer, { backgroundColor: alertMessage.startsWith("Senha") ? "#d4edda" : "#f8d7da" }]}>
          <Text style={[styles.alertMessage, { color: alertMessage.startsWith("Senha") ? "#155724" : "#721c24" }]}>
            {alertMessage}
          </Text>
        </View>
      )}
      <View style={styles.groupInputs}>
        <Text style={styles.studentPassword}>Digite sua senha</Text>
        <TextInput 
          style={styles.inputPassword} 
          placeholder="Digite sua senha: " 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry={true} // Senha oculta
        />
        <Text style={styles.studentPassword}>Confirme sua senha</Text>
        <TextInput 
          style={styles.inputPassword} 
          placeholder="Confirme sua senha: " 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          secureTextEntry={true} // Senha oculta
        />
        <TouchableOpacity onPress={handleConfirmPassword} style={styles.button1} disabled={isLoading}>
          {isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.buttonText}>CONFIRMAR</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button2}>
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  studentPassword:{
    fontSize: 20,
  },
  textRecoverPassword: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "Roboto-Regular",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  groupInputs: {
    width: "100%",
  },
  inputPassword: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    marginBottom: 20,
  },
  button1: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#B20000",
    marginBottom: 10,
    width: "100%",
  },
  button2: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#141414",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "white",
  },
  alertContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  alertMessage: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default ConfirmPassword;
