import React,{ useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import {verifyUser,onBoardAxios} from "../helperFunctions/index";

const RegisterPage = ({ navigation }) =>{
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handlerRegister = () =>{
    const output = ([username,password]);
    console.log(output);
    if (output.success=="false"){
      Alert.alert(output.errorMsg);
      return;
    }
    else {
      console.log("axios part");
      const axiosOutput = onBoardAxios([username,password,"/register"])
      axiosOutput.then(response => {
        if (response.success =="false"){
          Alert.alert(response.requestMsg);
          response.requestMsg;
          return;
        }      
        else{
          Alert.alert(response.requestMsg);
          return;
        }
      })
  }
  }
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/NFTAssist.png')} style={{width: 280,height: 311}}/>
        <Text style={styles.logo}>Create an Account </Text>
        <View style={styles.inputView} >
          <TextInput  
            autoCapitalize="none"
            style={{
              height:50,
              color:"Dark Grey"}}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setUsername(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={{
              height:50,
              color:"Dark Grey"}}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() =>navigation.navigate("Login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={() => handlerRegister()}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>

  
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:35,
    color:"#FFD700",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#F9D43E",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#DAA520",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  registerBtn:{
    width:"80%",
    backgroundColor:"#DAA520",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  
  },
  loginText:{
    color:"white"
  }
});

export default RegisterPage;