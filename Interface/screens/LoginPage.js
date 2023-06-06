import React,{ useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
import {verifyUser,onBoardAxios} from "../helperFunctions/index";
import {AuthContext} from "../App";
import { OnBaordNavigator } from '../Nav';

const LoginPage = ({ navigation }) =>{  //Declares the login page variable
  const [username, setUsername] = useState(); //Creates a username 
  const [password, setPassword] = useState();

  const {signIn,getStatus} = React.useContext(AuthContext);


  const handlerLogin = () =>{
    const output = verifyUser([username,password]);
    if (output.success=="false"){
      Alert.alert(output.errorMsg);
      return;
    }
    else {
      console.log("Axios part");
      const axiosOutput = onBoardAxios([username,password,"/login"])    
      axiosOutput.then(response => {
        if (response.success =="false"){
          Alert.alert(response.requestMsg);
          response.requestMsg;
          return;
        }      
        else{
          Alert.alert(response.requestMsg);
          signIn(username);
          return;
        }
      })
  }
  }
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/NFTAssist.png')} style={{width: 280,height: 311}}/> 
        <Text style={styles.logo}>Ready to Scan? </Text>
        <View style={styles.inputView} >
          <TextInput  
            autoCapitalize="none"
            style={{
              height:50,
              color:"dark grey"}}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setUsername(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={{
              height:50,
              color:"dark grey"}}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => handlerLogin()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={() =>navigation.navigate("Register")}>
          <Text style={styles.loginText}>Signup</Text>
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
    marginBottom:45
  },
  inputView:{
    width:"80%",
    backgroundColor:"#FFD700",
    borderRadius:26,
    height:51,
    marginBottom:21,
    justifyContent:"center",
    padding:21
  },
  inputText:{
    height:50,
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#B8860B",
    borderRadius:24,
    height:51,
    alignItems:"center",
    justifyContent:"center",
    marginTop:41,
    marginBottom:11
  },
  registerBtn:{
    width:"80%",
    backgroundColor:"#B8860B",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  
  },
  loginText:{
    color:"white"
  },
});

export default LoginPage;