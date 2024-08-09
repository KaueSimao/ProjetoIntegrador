import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  CheckBox,
  Alert,
} from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000"; // Endpoint da API simulada

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberLogin, setRememberLogin] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Ao carregar a tela, verificar se há um login lembrado
    checkRememberedLogin();
  }, []);

  const checkRememberedLogin = async () => {
    try {
      const rememberedLogin = await AsyncStorage.getItem("rememberedLogin");
      if (rememberedLogin) {
        const user = JSON.parse(rememberedLogin);
        setEmail(user.email);
        setPassword(user.password);
        setRememberLogin(true);
      }
    } catch (error) {
      console.error("Erro ao recuperar o estado de lembrar login", error);
    }
  };

  const login = async () => {
    try {
      // Buscar o estudante correspondente ao email fornecido
      const response = await fetch(`${API_URL}/students`);
      const students = await response.json();
      const user = students.find((student) => student.email === email);

      if (!user || user.password !== password) {
        setAlertMessage("Erro, email ou senha incorretos.");
        setAlertVisible(true);
        return;
      }

      // Login bem-sucedido
      if (rememberLogin) {
        // Salvar o estado de lembrar login localmente
        await AsyncStorage.setItem("rememberedLogin", JSON.stringify(user));
      } else {
        // Remover o estado de lembrar login se a opção não estiver selecionada
        await AsyncStorage.removeItem("rememberedLogin");
      }

      // Navegar para a tela Home ou outra tela necessária após o login
      navigation.navigate("HomeScreen", { user });

    } catch (error) {
      console.error("Erro ao tentar fazer login", error);
      setAlertMessage("Erro ao tentar fazer login.");
      setAlertVisible(true);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>Login</Text>
      <Image source={require("../assets/profile.png")} style={styles.logo} />
      <Text style={styles.label}>Email institucional</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.optionsContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox value={rememberLogin} onValueChange={setRememberLogin} />
          <Text style={styles.rememberLogin}>Lembrar meu login?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signUp}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>

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
            navigation.navigate("Login"); // Redirecionar para a tela de login
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textLogin: {
    fontSize: 32,
    fontFamily: "Roboto-Regular",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberLogin: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginLeft: 5,
  },
  forgotPassword: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "red",
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#B20000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "white",
  },
  signUp: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "red",
    textDecorationLine: "underline",
  },
});
