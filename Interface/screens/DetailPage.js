import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { getCurrentUser, addToWishlist } from '../helperFunctions/index';
import { useNFTInfo } from '../MoralisAPI/moralis';
import CardView from '../components/Card/index';

// DetailPage component for displaying NFT details and providing user interaction options
const DetailPage = ({ route, navigation }) => {
  // Retrieve the base64-encoded image from route params
  const base64Img = route.params.picture.base64;
  // Initialize state variable for storing NFT details
  const [nft, setNft] = useState({});
  // Destructure relevant properties from the NFT object
  const { name, contract_type, symbol, owner_of } = nft;
  // Fetch NFT details using the useNFTInfo function
  const fetchNFT = async () => {
    try {
      const nftData = await useNFTInfo(base64Img);
      setNft(nftData);
      console.log('nft:', nftData);
    } catch (error) {
      console.error(error);
    }
  };
  // Call fetchNFT when the component mounts
  useEffect(() => {
    fetchNFT();
  }, []);

  // Navigate back to the previous screen to take another picture
  const takeAnotherPicture = () => {
    console.log('takeAnotherPicture');
    navigation.goBack();
  };
  // Save the NFT to the user's wishlist and navigate to the Wishlist screen
  const saveToWishlist = () => {
    console.log('saveToWishlist');
    getCurrentUser().then(user => {
      if (nft) {
        addToWishlist(user, nft).then(response => {
          console.log('addToWishlist response:', response);
          Alert.alert(response.requestMsg);
          if (response.success) {
            navigation.navigate('Wishlist');
          }
        });
      } else {
        console.error('NFT object is null');
      }
    });
  };
  // Show a loading message while the NFT data is being fetched
  if (Object.keys(nft).length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  // Convert IPFS URL to an HTTP URL
  const convertIpfsUrlToHttpUrl = (ipfsUrl) => {
    const ipfsPath = ipfsUrl.replace('ipfs://', '');
    return `https://ipfs.io/ipfs/${ipfsPath}`;
  };
  // Get the image URL from the metadata and convert it to an HTTP URL
  const imageUrl = JSON.parse(nft.metadata).image;
  const httpImageUrl = convertIpfsUrlToHttpUrl(imageUrl);
  
  // Render CardView component with NFT details and interaction options
  return (
    <CardView
      takeAnotherPicture={takeAnotherPicture}
      saveToWishlist={saveToWishlist}
      name={name}
      contract_type={contract_type}
      symbol={symbol}
      owner_of={owner_of}
      imageUrl={httpImageUrl}
    />
  );
};

export default DetailPage;
