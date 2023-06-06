import React from "react";
import { TouchableOpacity,StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import UploadImage from "../UploadImage";

export default function BottomBar({ takePicture }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={takePicture}>
        <Ionicons name="ios-radio-button-on" size={90} color={"#ffffff"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  position: 'absolute',
  bottom:0,
  right:"40%"  
}
});
