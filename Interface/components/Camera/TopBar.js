import React from "react";
import styled from "styled-components";
import { Constants } from "expo-constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";


const flashIcons = {
  off: "flash-off",
  on: "flash-on",
  auto: "flash-auto",
  torch: "highlight"
};



export default function TopBar({
  flash,
  toggleFacing,
  toggleFlash,
}) {
  return (
    <Wrapper>
      <ToggleButton onPress={toggleFacing}>
        <Ionicons name="camera-reverse-outline" size={32} color="white" />
      </ToggleButton>
      <ToggleButton onPress={toggleFlash}>
        <MaterialIcons name={flashIcons[flash]} size={32} color="white" />
      </ToggleButton>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  top: 20px;
  flex-grow: 0.2;
  background-color: transparent;
  flex-direction: row;
  justify-content: space-around;
`;

const ToggleButton = styled.TouchableOpacity`
  flex-grow: 0.25;
  height: 40px;
  margin-horizontal: 2px;
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 5px;
  align-items: center;
  justify-content: center;
`;
