import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { forgotPassword } from '../api/apiService';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleForgotPassword = async () => {
    if (!email.endsWith('@fatec.sp.gov.br')) {
      Alert.alert('Erro', 'Por favor, insira um e-mail institucional válido.');
      return;
    }
  
    setIsLoading(true); // Inicia o carregamento
  
    try {
      const response = await forgotPassword(email); // Chama a função da API
  
      if (response.success) {
        Alert.alert('Sucesso', `E-mail de recuperação enviado para ${email}`);
      } else {
        Alert.alert('Erro', response.message || 'Erro ao enviar o e-mail.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao tentar recuperar a senha.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.textRecoverPassword}>RECUPERAR SENHA</Text>
      <Image source={require('../assets/profile.png')} style={styles.logo} />
      <View style={styles.groupInputs}>
        <Text style={styles.emailInstitucional}>Email institucional</Text>
        <TextInput
          style={styles.inputEmail}
          placeholder="Digite seu email: "
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handleForgotPassword} style={styles.button1} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>ENVIAR</Text>
          )}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textRecoverPassword: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Roboto-Regular',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  groupInputs: {
    width: '100%',
  },
  emailInstitucional: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
  },
  inputEmail: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    marginBottom: 20,
  },
  button1: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#B20000',
    marginBottom: 10,
    width: '100%',
  },
  button2: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#141414',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: 'white',
  },
});

export default ForgotPasswordScreen;
