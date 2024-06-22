import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

export default function HomeScreen({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const [user, setUser] = useState(null); // State para armazenar o usuário

  useEffect(() => {
    // Recuperar o usuário passado como parâmetro de navegação
    if (route.params && route.params.user) {
      setUser(route.params.user);
    }
    // Aqui você pode continuar com o resto do seu código de inicialização
  }, [route.params]);

  if (!fontsLoaded || !user) {
    return null; // Pode mostrar um spinner de carregamento aqui
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/fatec-logo.png")} style={styles.logo} />
      <Text style={styles.title}>Seja Bem-Vindo, {user.name}</Text>
      {/* Rest of your UI */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.buttonText}>Grade de Horários</Text>
      </TouchableOpacity>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.navText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 100,
    color: "#333",
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
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#B20000",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
