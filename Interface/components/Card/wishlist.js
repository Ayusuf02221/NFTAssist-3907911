import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

const WishlistCard = (props) => {
  const { token_id, name, contract_type, symbol, owner_of, metadata } = props.nft;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{name}</Card.Title>
        <Card.Divider />
        <ScrollView>
          {/* Modify the text elements here */}
          <Text style={styles.name}>Token ID: {token_id}</Text>
          <Text style={styles.name}>Name: {name}</Text>
          <Text style={styles.contract_type}>Contract Type: {contract_type}</Text>
          <Text style={styles.symbol}>Symbol: {symbol}</Text>
          <Text style={styles.owner_of}>Owner: {owner_of}</Text>
          <Text style={styles.metadata}>Metadata: {JSON.stringify(metadata)}</Text>
        </ScrollView>
        <Card.Divider />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
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
  owner_of: {
    fontSize: 16,
    marginBottom: 5,
  },
  metadata: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default WishlistCard;
