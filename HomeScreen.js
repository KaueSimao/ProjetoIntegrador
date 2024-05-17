import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity, CheckBox } from 'react-native';
import { useFonts } from 'expo-font';


export default function LoginScreen({ navigation })
{
 
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  return(
    <View style={styles.container}>
    <Text style={styles.textemail}>Email institucional</Text>
    <TextInput style={styles.inputemail} placeholder="Digite seu email:" />
  </View>
  

)};

const styles = StyleSheet.create({
  container:{
  },

  textemail:{
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 20,
    alignSelf: "flex-start",
    
  },

inputemail: {
  fontSize: 16,
    fontFamily: "Roboto-Regular",
    width: 450,
    height: 50,
    marginTop: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,

}



});
