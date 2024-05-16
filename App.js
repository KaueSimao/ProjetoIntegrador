import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen'
import ForgotPasswordScreen from './ForgotPasswordScreen';
import AutoRegisterScreen from './AutoRegisterScreen';


function LoadingScreen({ navigation }) {
  const [exibirTelaLogin, setExibirTelaLogin] = useState(false);

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  useEffect(() => {
    // Simula a exibição da tela inicial por 2 segundos
    const timer = setTimeout(() => {
      setExibirTelaLogin(true);
    }, 3000); // Tempo em milissegundos (2 segundos)
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {exibirTelaLogin ? (
        <LoginScreen navigation={navigation}></LoginScreen> 
      ) : (
        <View style={styles.loadingScreen}>
          <Text style={styles.title}>Grade de Horário</Text>
          <Text style={styles.subtitle}>Aplicativo do Alunos</Text>
          <Image source={require('./assets/fatec-logo.png')} style={styles.logoFatec} />
          <Image source={require('./assets/cps-logo.png')} style={styles.logoCps} />
        </View>
      )}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Projeto Integrador" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Register" component={AutoRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    fontSize: 48,
    fontFamily: 'Roboto-Regular',
    top: 400,
  },
  subtitle: {
    flex: 2,
    fontSize: 48,
    fontFamily: 'Roboto-Regular',
    top: 410,
  },
  loadingScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logoFatec: {
    position: 'fixed',
    width: 789,
    height: 386,
    left: 145, // Coordenada X
    top: 861, // Coordenada Y
  },
  logoCps: {
    position: 'fixed',
    width: 325,
    height: 177,
    left: 377, // Coordenada X
    top: 1914, // Coordenada Y
  }
});
