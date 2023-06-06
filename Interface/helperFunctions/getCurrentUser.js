import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUser = async () => {
    let userToken;
    try {
      userToken =  await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log("failed to retrieve token", e)
    }
  return userToken;
}
