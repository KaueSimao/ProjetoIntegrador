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
    <View>
      <Text>
        CARLAO
      </Text>
    </View>
)};
