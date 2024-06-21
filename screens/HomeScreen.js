import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { useFonts } from 'expo-font';
import { Button } from 'react-native-web';


export default function LoginScreen({ navigation })
{
 
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  return(
<View style={styles.container}>

<TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.button}>
 <Text
 
style={styles.buttonText}
  >
Menu
 </Text>
</TouchableOpacity>


  

  <TouchableOpacity onPress={() => navigation.navigate("Search")} style={styles.buttonNext}>
 <Text
style={styles.nextText}
  >
   Próximo
 </Text>
</TouchableOpacity>
  
  </View>


);
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    search: {
      fontSize: 30, 
      fontFamily: 'Roboto-Regular',
      marginTop: 20, 
      alignSelf: 'flex-start', 
    },
    inputsearch: {
      fontSize: 30, 
      fontFamily: 'Roboto-Regular',
      width: '100%', 
      height: 50,
      marginTop: 10, 
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 5,
    },
    button: {
      fontSize: 20, 
      marginTop: 20, 
      width: 150, 
      height: 50, 
      borderRadius: 8,
      backgroundColor: '#666666',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 24, 
      fontFamily: 'Roboto-Medium',
      color: 'black',
    },
    nextText: {
      fontSize: 26, 
      fontFamily: 'Roboto-Medium',
      color: 'white',
    },
    buttonNext: {
      marginTop: 50, 
      width: '70%', 
      height: 60,
      borderRadius: 12,
      backgroundColor: '#B20000',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

