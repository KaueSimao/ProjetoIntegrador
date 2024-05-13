import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

export default function TelaLogin() {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.textLogin, { fontFamily: 'Roboto-Regular'}]}>
        LOGIN
      </Text>
      <Image source={require("./assets/profile.png")} style={styles.logo} />
      <TextInput
        style={[styles.input1, { fontFamily: 'Roboto-Regular'}]}
        placeholder="Digite seu email:"
      />
      <TextInput
        style={[styles.input2, { fontFamily: 'Roboto-Regular'}]}
        placeholder="Digite sua senha:"
      />
      <TouchableOpacity style={[styles.button, { fontFamily:'Roboto-Medium'}]}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    fontSize: 96,
    position: 'absolute',
    left: 403,
    top: 311,
  },
  logo: {
    width: 287,
    height: 287,
    position: 'absolute',
    left: 397,
    top: 486,
  },
  input1: {
    fontSize: 65,
    position: 'absolute',
    width: 900,
    height: 119,
    borderWidth: 3,
    borderColor: 'black',
    color: 'black',
    borderRadius: 6,
    marginBottom: 20,
    left: 78,
    top: 910,
  },
  input2: {
    fontSize: 65,
    position: 'absolute',
    width: 900,
    height: 119,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 6,
    marginBottom: 20,
    left: 78,
    top: 1163,
  },
  button: {
    width: 526,
    height: 149,
    backgroundColor: '#B20000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    position: 'absolute',
    left: 255,
    top: 1663,
  },
  buttonText: {
    fontSize: 34,
    color: 'white',
    fontFamily: 'Roboto-Medium',
  },
});
