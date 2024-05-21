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

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const [rememberLogin, setRememberLogin] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>login</Text>
      <Image source={require("./assets/profile.png")} style={styles.logo} />
      <Text style={styles.emailInstitucional}>Email institucional</Text>
      <TextInput style={styles.inputEmail} placeholder="Digite seu email:" />

      <Text style={styles.password}>Senha</Text>

      <TextInput
        style={styles.inputPassword}
        placeholder="Digite sua senha:"
        secureTextEntry={true}
      />
      <View style={styles.optionsContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox value={rememberLogin} onValueChange={setRememberLogin} />
          <Text style={styles.rememberLogin}>Lembrar meu login?</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Esqueci minha senha{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text
          onPress={() => navigation.navigate("Home")}
          style={styles.buttonText}
        >
          ENTRAR
        </Text>
      </TouchableOpacity>
      <Text
        style={styles.signUp}
        onPress={() => navigation.navigate("Register")}
      >
        Não tem uma conta? Cadastre-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    top: 800,
  },
  textLogin: {
    fontSize: 96,
    textTransform: "uppercase",
    top: -400,
    left: 0,
    fontFamily: "Roboto-Regular",
    height: 20,
  },
  logo: {
    top: 500,
    left: 397,
    width: 287,
    height: 287,
    position: "fixed",
  },
  emailInstitucional: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  input1: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    width: 450,
    height: 50,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
  },
  password: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  inputPassword: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    width: 450,
    height: 50,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
  },
  inputEmail: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    width: 450,
    height: 50,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 450,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberLogin: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    marginLeft: 5,
  },
  forgotPassword: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    color: "red",
    textDecorationLine: "none",
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
    fontSize: 26,
    fontFamily: "Roboto-Medium",
    color: "black",
  },
  signUp: {
    fontSize: 26,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    color: "red",
    textDecorationLine: "none",
  },
});