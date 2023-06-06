import axios from "axios";
import {backendUrl} from '../path';

export const deleteWishlistItem = async (props) => {
  let axiosRequest = {success:"false",requestMsg:""};
  const path = "/deleteItem/";
  console.log("wishlist axios part", props);
  return axios // Return the Axios request from the function
      .post(backendUrl+path+props[1],{
          data:{
              item:props[0],
          },
      },)
      .then(response => {
          if (response.data.success == "false") {
              axiosRequest.requestMsg = response.data.errorMsg;
          }
          else {
              axiosRequest.requestMsg = response.data.successMsg;
              axiosRequest.success = "true" 
          }
          return axiosRequest; 
      })
      .catch(error => {
          console.log(error);
          // Return some error object when the request fails
          return {success: "false", requestMsg: "An error occurred"};
      });
}
