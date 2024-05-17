import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';
// provavelmente o erro é no app.js 
const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; // ou um componente de carregamento
  }

  const handleForgotPassword = () => {
    // Implementar lógica para enviar o email de recuperação de senha
    alert(`Email de recuperação enviado para ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textRecoverPassword}>RECUPERAR SENHA </Text>
      <Image source={require("./assets/profile.png")} style={styles.logo} />
      <View style={styles.groupInputs}>
      <Text style={styles.emailInstitucional}>Email institucional</Text>
      <TextInput
        style={styles.inputEmail}
        placeholder="Digite seu email: "
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        title="Enviar"
        onPress={handleForgotPassword}
        style={styles.button1}
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button2}
      >
        <Text style={styles.buttonText} onPress={() => navigation.goBack()}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top: 800,
  },
  textRecoverPassword: {
    fontSize: 72,
    top: -400,
    fontFamily: 'Roboto-Regular',
  },
  logo: {
    top: 500,
    left: 397,
    width: 287,
    height: 287,
    position: "fixed",
  },
  groupInputs: {
    alignItems: "center",
    marginTop: 20,
    width: 450,
  },
  emailInstitucional: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  inputEmail: {
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
  button1: {
    width: 200,
    height: 50,
    marginTop: 90,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#B20000',
  },
  button2: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#141414',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: 'white',
  },
});

export default ForgotPasswordScreen;