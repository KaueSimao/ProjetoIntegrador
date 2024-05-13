import React from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function TelaLogin() {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/login.png")} style={styles.logo} />
      <Text> 
      AFAFAFAFA
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Botão Vermelho</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TelaSenha')}>
        <Text style={styles.link}>Esqueci a senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  logo: {
    width: 287,
    height: 287,
    position: 'absolute',
    left: 397, // Coordenada X
    top: 486, // Coordenada Y
  },
  input: {
    width: 900,
    height: 209,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: 526,
    height: 149,
    backgroundColor: '#B20000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'medium',
  },
});
