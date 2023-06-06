import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Logout = () => {
clearAsyncStorage = async() => {
    AsyncStorage.clear();
}
}