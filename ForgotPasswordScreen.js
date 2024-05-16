import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Implementar lógica para enviar o email de recuperação de senha
    alert(`Email de recuperação enviado para ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button
        title="Enviar"
        onPress={handleForgotPassword}
        style={styles.button}
      />

      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007bff',
    color: '#fff',
    marginBottom: 10,
  },
});

export default ForgotPasswordScreen;
