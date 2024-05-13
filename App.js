import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TelaLogin from './TelaLogin'; 
  export default function App() {
  const [exibirTelaLogin, setExibirTelaLogin] = useState(false);

  useEffect(() => {
    // Simula a exibição da tela inicial por 2 segundos
    const timer = setTimeout(() => {
      setExibirTelaLogin(true);
    }, 2000); // Tempo em milissegundos (2 segundos)
  },
   []);

  return (
    <View style={styles.container}>
      {exibirTelaLogin ? (
        <TelaLogin />
      ) : (
        <View style={styles.telaInicial}>
          <Image source={require('./assets/fatec-logo.png')} style={styles.logofatec} />
          <Image source={require('./assets/cps-logo.png')} style={styles.logocps} />
        </View>
      )}
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  telaInicial: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logofatec: {
    position: 'fixed',
    width: 789,
    height: 386,
    left: 145, // Coordenada X
    top: 861, // Coordenada Y
  },
  logocps: {
    position: 'fixed',
    width: 325,
    height: 177,
    left: 377, // Coordenada X
    top: 1914, // Coordenada Y
  },
});
