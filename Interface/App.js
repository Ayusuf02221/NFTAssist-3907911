import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MainPageNavigator, OnBaordNavigator} from './Nav/index'
import { Ionicons,AntDesign } from "@expo/vector-icons";

const stack = createStackNavigator();

export const AuthContext = React.createContext();
export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
 
      isSignout: false,
      isLoading: true,
      userToken: null,
    }
  );




  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log("failed to retrieve toekn", e)
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, [state]);

  
  
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          await AsyncStorage.setItem('userToken',data);} 
        catch (e) {
          console.log("failed to set token in storage", e)
          }
        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  const Logout = () => {
    clearAsyncStorage = async() => {
        AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT'});
    }
    clearAsyncStorage(); 
    }

 
 

  return (
    <AuthContext.Provider value= {authContext}>
    <NavigationContainer>
      {state.userToken == null ? 
      (
        <stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
          <stack.Screen name="Onboard" component={OnBaordNavigator} />
       </stack.Navigator>        
       ) : (
        <stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffc800',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <stack.Screen name="Main Page"component={MainPageNavigator}  options={{
          headerRight: () => (
            <Button
              onPress={() => Logout()}
              title="Logout"
              color="#fff"
            />
          ),
          headerLeft: () => (
            <View> 
            <AntDesign name="user" size={26} color="white" />
             <Text>{state.userToken}</Text> 
            </View>
           
            
          ),
        }} />  
        </stack.Navigator>         
        )} 
      </NavigationContainer>
      </AuthContext.Provider>
  );
}
