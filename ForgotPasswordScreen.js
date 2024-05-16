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
      <Text style={styles.textRecoverPassword}>RECUPERAR SENHA</Text>
      <Image source={require("./assets/profile.png")} style={styles.logo} />
      <Text style={styles.emailInstitucional}>Email institucional</Text>
      <TextInput
        style={styles.input}
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
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
  },
  textRecoverPassword: {
    fontSize: 72,
    top:214, // Y
    left:311, // x
    fontFamily: 'Roboto-Regular',
    position:'fixed'
  },
  logo: {
    width: 287,
    height: 287,
    left: 397,
    top: 486,
  },
  emailInstitucional: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    width: 450,
    height: 50,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  },
  button1: {
    marginTop: 70,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#B20000',
    top: 277,
    left: 1266,
  },
  button2: {
    marginTop: 30,
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
