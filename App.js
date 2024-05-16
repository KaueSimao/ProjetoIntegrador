import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import TelaLogin from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';


export default function App() {
  const [exibirTelaLogin, setExibirTelaLogin] = useState(false);

  useEffect(() => {
    // Simula a exibição da tela inicial por 2 segundos
    const timer = setTimeout(() => {
      setExibirTelaLogin(true);
    }, 2000); // Tempo em milissegundos (2 segundos)
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {exibirTelaLogin ? (
        <TelaLogin></TelaLogin>
      ) : (
        <View style={styles.loadingScreen}>
          <Text style={styles.title}>Grade de Horário</Text>
          <Text style={styles.subtitle}>Aplicativo do aluno</Text>
          <Image source={require('./assets/fatec-logo.png')} style={styles.logoFatec} />
          <Image source={require('./assets/cps-logo.png')} style={styles.logoCps} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loadingScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    bottom: 93,
  },
  subtitle: {
    fontSize: 15,
    bottom: 90,
  },
  logoFatec: {
    width: 200,
    height: 100,
    bottom: 50,
  },
  logoCps: {
    width: 100,
    height: 60,
    top: 150, // Coordenada Y
  },
});
