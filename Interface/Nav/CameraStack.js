import 'react-native-gesture-handler';
import React from 'react';
import {CameraPage,DetailPage  } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';


const CameraStack = createStackNavigator();

const CameraNavigator = () => {
  return (
    <CameraStack.Navigator
    screenOptions={{
      headerShown: false
    }}>
        <CameraStack.Screen name="Camera" component={CameraPage} />
        <CameraStack.Screen name="Detail" component={DetailPage} />
      </CameraStack.Navigator>  
  );
}
export default CameraNavigator;