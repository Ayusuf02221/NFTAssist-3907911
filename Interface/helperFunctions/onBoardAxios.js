import axios from "axios";
import {backendUrl} from '../path';



export const onBoardAxios = async (props) => {
let axiosRequest = {success:"false",requestMsg:""};
const path = props[2];
 await axios
    .post(backendUrl+path,{
      data:{
        username:props[0],
        password:props[1],
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
      return response;
    })
    .catch(error => console.log(error));
    return axiosRequest;
  }
