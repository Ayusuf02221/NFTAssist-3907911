import axios from "axios";
import { backendUrl } from "../path";

export const addToWishlist = async (user, nft) => {
  let axiosRequest = { success: "false", requestMsg: "" };
  const path = "/saveWishlist";
  let exists = false;

  const wishlistItems = await getWishlistItems(user);
  
  if (Array.isArray(wishlistItems)) {
    wishlistItems.forEach(element => {
      // Check if element.nft is defined before accessing element.nft.token_id
      if (element.nft && element.nft.token_id === nft.token_id) {
        exists = true;
        axiosRequest.requestMsg = "NFT has already been added to the wishlist. Please select a different picture to add.";
      }
    });
  }
  
  if (!exists) {
    console.log('Sending NFT to backend:', nft); 
    try {
      const response = await axios.post(backendUrl + path, {
        data: {
          username: user,
          nft,
        },
      });
      
      if (response.data.success === "false") {
        axiosRequest.requestMsg = response.data.errorMsg;
      } else {
        axiosRequest.requestMsg = response.data.successMsg;
        axiosRequest.success = "true";
        axiosRequest.nft = nft;
      }
    } catch (error) {
      console.log('Error:', error);
      if (error.response) {
        console.log('Error details:', error.response);
      }
    }
  }

  return axiosRequest;
};

export const getWishlistItems = async (user) => {
  const path = "/wishlistItems";
  const username = "/" + user;

  try {
    const response = await axios.get(backendUrl + path + username);
    console.log(response.data.wishlist);  // To check the data returned
    return response.data.wishlist;
  } catch (error) {
    console.log(error);
  }
};
