import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginPage from './screens/LoginPage'; 

test('LoginPage', async () => {
  const {getByTestId, getByText} = render(<LoginPage />);
  const username = 'hello';
  const password = 'hello';
  
  const usernameInput = getByTestId('userTest');
  const passwordInput = getByTestId('passTest');
  
  fireEvent.changeText(usernameInput, username);
  fireEvent.changeText(passwordInput, password);

  const button = getByText('Login');
  fireEvent.press(button);
  
  await waitFor(() => expect(getByText('Succesful Login')).toBeTruthy());
});
