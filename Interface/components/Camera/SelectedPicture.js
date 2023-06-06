import React from "react";
import styled from "styled-components";

export default function SelectedPicture({
  picture,
  onRetake,
  onConfirm,
  loading
}) {
  return (
    <Container>
      {picture && (
        <Image source={{ uri: picture.uri ? picture.uri : picture }} />
      )}
      {!loading && (
        <ButtonGroup>
          <SingleButton onPress={onRetake}>
           <Text> Retake </Text> 
          </SingleButton>
          <SingleButton onPress={onConfirm}>
           <Text> Use This Picture </Text> 
          </SingleButton>
        </ButtonGroup>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Image = styled.Image`
  flex: 1;
`;

const Text = styled.Text`
  color: white;
`;
const SingleButton = styled.TouchableOpacity`
background-color: #DAA520; /* Green */
border: none;
color: white;
padding: 20px;
text-align: center;
text-decoration: none;
font-size: 16px;
margin: 4px 2px;
border-radius: 50px;

`;const ButtonGroup = styled.View`
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
