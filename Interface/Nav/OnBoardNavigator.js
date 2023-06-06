import 'react-native-gesture-handler';
import React from 'react';
import {RegisterPage,LoginPage  } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";


const OnBoardStack = createStackNavigator();

const MainPageNavigator = () => {
  return (
    <OnBoardStack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <OnBoardStack.Screen name="Login" component={LoginPage} />
        <OnBoardStack.Screen
          name="Register"
          component={RegisterPage}
          options={{ title: 'Register' }}
        />
      </OnBoardStack.Navigator>  
  );
}
export default MainPageNavigator;



