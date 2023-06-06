export  const verifyUser = (props) => {
  console.log(props);
  let passwordError = {success:"false",errorMsg:"You must enter a Password"};
  let usernameError = {success:"false",errorMsg:"You must enter a Username"};
  let inputError = {success:"false",errorMsg:"You must enter a Username and password"};
  let success = {success:"true",successMsg:"You have Successfully entered details"};

  if(props[0] == null && props[1] == null){
    return inputError;
 }
  else if(props[0] == null){
    return usernameError;
 }
 else if(props[1] == null){
  return passwordError;
}
else{
  return success
} 
}
