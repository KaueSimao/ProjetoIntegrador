import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TelaLogin from './TelaLogin'; 
import { createStackNavigator } from '@react-navigation/stack'; 


const Stack = createStackNavigator();


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
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Image source={require('./assets/image.png')} style={styles.image} />
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
  },
  telaInicial: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 789,
    height: 386,
    left: 145, // Coordenada X
    top: 861, // Coordenada Y
  },
  image: {
    width: 325,
    height: 177,
    left: 377, // Coordenada X
    top: 1914, // Coordenada Y
  },
});
