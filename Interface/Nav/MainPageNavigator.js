import 'react-native-gesture-handler';
import React from 'react';
import {n } from "../screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CameraStack from "./CameraStack"
import {WishlistPage} from "../screens";


const Tab = createBottomTabNavigator();

const MainPageNavigators = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'CameraPack') {
            iconName = focused
              ? 'camera'
              : 'camera';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'list' : 'list';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="CameraPack" component={CameraStack} />
      <Tab.Screen name="Wishlist" component={WishlistPage} />
    </Tab.Navigator>
  
  );
}
export default MainPageNavigators;
