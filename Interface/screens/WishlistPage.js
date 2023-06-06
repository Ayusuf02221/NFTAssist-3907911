import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { getCurrentUser, getWishlistItems, deleteWishlistItem, addToWishlist } from '../helperFunctions';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    function _loadData() {
      getCurrentUser().then(item => {
        setUser(item);
        getWishlistItems(item).then(obj => {
          setWishlistItems(obj);
        });
      });
    }
    _loadData();
  }, []);

  useEffect(() => {}, [wishlistItems]);

  const toggleOverlay = value => {
    deleteWishlistItem(value).then(response => {
      Alert.alert(response.requestMsg);
    });
  };
  
  const addNewItemToWishlist = async (user, nft) => {
    const response = await addToWishlist(user, nft);
    if (response.success === "true") {
      setWishlistItems(prevItems => [...prevItems, nft]);
    }
  };
  
  return (
    <View>
      <ScrollView>
        {wishlistItems === null ? (
          <Text>Hello! This is where your wishlist NFT are stored!</Text>
        ) : (
          <View>
            {Array.isArray(wishlistItems) && wishlistItems.map((item, i) => (
              <View key={i}>
                <Card>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Divider />
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ScrollView>
                        <Text>Contract Type: {item.contract_type}</Text>
                        <Text>Symbol: {item.symbol}</Text>
                        <Text>Token ID: {item.token_id}</Text>
                        <Text>Owner: {item.owner_of}</Text>
                        <Text>Metadata: {item.metadata}</Text>
                      </ScrollView>
                    </ListItem.Content>
                    <Icon
                      name={'delete-outline'}
                      onPress={() => toggleOverlay([item.token_id, user])}
                    />
                  </ListItem>
                </Card>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default WishlistPage;