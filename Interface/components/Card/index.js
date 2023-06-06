import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';

const CardView = (props) => {
  // Destructure the props to get the required data
  const { amount, name, contract_type, symbol, imageUrl, owner_of } = props;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView>
          <Card>
            <Card.Title>{name}</Card.Title>
            <Card.Divider />
            <Image
              source={{ uri: imageUrl }}
              style={{
                resizeMode: 'contain',
                height: 250,
                width: 350,
                marginBottom: 20,
              }}
            />
            <Card.Divider />
            <ScrollView>
              {/* Modify the text elements here */}
              <Text style={styles.name}>Name: {name}</Text>
              <Text style={styles.amount}>Amount: {amount}</Text>
              <Text style={styles.owner_of}>Owner: {owner_of}</Text>
              <Text style={styles.contract_type}>
                Contract Type: {contract_type}
              </Text>
              <Text style={styles.symbol}>Symbol: {symbol}</Text>
            </ScrollView>
            <Card.Divider />
          </Card>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <Button
          buttonStyle={styles.Btn}
          title="Wishlist NFT"
          onPress={() => props.saveToWishlist({
            token_id: props.token_id,
            name: name,
            contract_type: contract_type,
            symbol: symbol,
            owner_of: owner_of,
          })}
        />
        <Button
          buttonStyle={styles.Btn}
          title="Go Back"
          onPress={props.takeAnotherPicture}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 3,
  },
  buttons: {
    position: 'relative',
    flex: 1,
  },
  Btn: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#DAA520',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
    marginBottom: 5,
  },
  owner_of: {
    fontSize: 16,
    marginBottom: 5,
  },
  contract_type: {
    fontSize: 16,
    marginBottom: 5,
  },
  symbol: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CardView;
