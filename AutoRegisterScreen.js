import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts } from 'expo-font';

export default function AutoRegisterScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  const courses = [
    { label: 'Engenharia', value: 'engenharia' },
    { label: 'Medicina', value: 'medicina' },
    { label: 'Direito', value: 'direito' },
    { label: 'Administração', value: 'administracao' },
    // Adicione mais cursos conforme necessário
  ];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rememberLogin, setRememberLogin] = useState(false);

  if (!fontsLoaded) {
    return null; // Ou um indicador de carregamento
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textLogin}>Fatec Itu</Text>
      <Image source={require("./assets/profile.png")} style={styles.logo} />
      <View style={styles.groupInputs}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput style={styles.input} placeholder="Digite seu nome:" />
        <Text style={styles.label}>Email institucional</Text>
        <TextInput style={styles.input} placeholder="Digite seu email:" />
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha:" secureTextEntry={true} />
        <Text style={styles.label}>Repita a senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha:" secureTextEntry={true} />
        <Text style={styles.label}>Curso</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCourse(value)}
          items={courses}
          style={pickerSelectStyles}
          placeholder={{ label: 'Escolha seu curso:', value: null }}
        />
        <View style={styles.optionsContainer}>
          <CheckBox
            isChecked={rememberLogin}
            onClick={() => setRememberLogin(!rememberLogin)}
            rightText="Lembrar Login"
            rightTextStyle={styles.rememberLogin}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { /* Navegação ou ação de próximo */ }}>
          <Text style={styles.buttonText}>PRÓXIMO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textLogin: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginVertical: 20,
  },
  groupInputs: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    width: '100%',
    height: 50,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  rememberLogin: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  button: {
    marginTop: 30,
    width: '100%',
    height: 50,
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    color: '#444',
    paddingRight: 30, // Para assegurar que o texto não se sobrepõe ao ícone de dropdown
  },
  inputAndroid: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    color: '#444',
    paddingRight: 30, // Para assegurar que o texto não se sobrepõe ao ícone de dropdown
  },
});

