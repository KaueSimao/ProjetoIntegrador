import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity, CheckBox } from 'react-native';
import { useFonts } from 'expo-font';


export default function TelaLogin({}) {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });


  const [rememberLogin, setRememberLogin] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>LOGIN</Text>
      <Image source={require("./assets/profile.png")} style={styles.logo} />
      <Text style={styles.emailInstitucional}>Email institucional</Text>
      <TextInput style={styles.input1} placeholder="Digite seu email:" />
      <Text style={styles.password}>Senha</Text>
      <TextInput style={styles.input2} placeholder="Digite sua senha:" secureTextEntry={true} />
      <View style={styles.optionsContainer}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberLogin}
            onValueChange={setRememberLogin}
          />
          <Text style={styles.rememberLogin}>Lembrar meu login?</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
      <Text style={styles.signUp}>Não tem uma conta? Cadastre-se</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textLogin: {
    fontSize: 40,
    marginTop: 50,
    fontFamily: 'Roboto-Regular',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
  },
  emailInstitucional: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginTop: 25,
    alignSelf: 'flex-start',
  },
  input1: {
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
  password: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  input2: {
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 450,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberLogin: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginLeft: 5,
  },
  forgotPassword: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 100,
    width: 200,
    height: 50,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#B20000',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: 'white',
  },
  signUp: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginTop: 20,
    color: 'blue',
  },
});
