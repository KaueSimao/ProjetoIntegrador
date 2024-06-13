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
  container:{
  },

  
search:{
    fontSize: 60,
    fontFamily: "Roboto-Regular",
    marginTop: 100,
    marginLeft: 400,
    alignSelf: "flex-start",
    
  },

inputsearch: {

    fontSize: 60,
    fontFamily: "Roboto-Regular",
    width: 900,
    height: 119,
    marginTop: 3,
    marginLeft: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    

},

button: {
  fontSize: 26,
  marginTop: 50,
  marginLeft: 50,
  width: 172,
  height: 151,
  borderRadius: 8,
 backgroundColor: "#666666",
},
buttonText:{
  fontSize: 40,
    fontFamily: "Roboto-Medium",
    color: "black",
    alignItems: "center",
    justifyContent: "center",
},
nextText:{
  fontSize: 42,
    fontFamily: "Roboto-Medium",
    color: "white",
    alignItems: "center",
},
buttonNext:{

  marginTop: 1200,
  marginLeft: 230,
  width: 577,
  height: 175,
  borderRadius: 26,
 backgroundColor: "#B20000",
 justifyContent: "center",
 alignItems: "center",
},



});
