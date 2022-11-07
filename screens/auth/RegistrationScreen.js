import { TouchableWithoutFeedback, Keyboard, ImageBackground, KeyboardAvoidingView, View, Text,
  Platform, Dimensions, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { registerUser } from '../../redux/auth/authOperations';
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/auth/authSlice';
import { Input } from '../../components/common/Input';
import { PrimaryBtn } from '../../components/common/PrimaryBtn';
import { formStyles } from '../../styles/common/form';
import { colors } from '../../styles/colors';

const initialState = {
  login: '',
  email: '',
  password: ''
};

export const RegistrationScreen = ({ navigation }) => { 
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [userState, setUserState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setDimensions(width);
    };
    const width = Dimensions.addEventListener('change', onChange);
    return () => width?.remove();
  });
  
  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const submitHandler = async () => {
    keyboardHide();
    const user = await registerUser(userState);
    dispatch(setUser({ login: user.displayName, id: user.uid }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={formStyles.image} source={require('../../assets/images/bg-register.jpg')}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ ...formStyles.form, paddingBottom: isKeyboardShown ? 32 : 78, paddingHorizontal: dimensions > 500 ? 60 : 16 }}>
            <Text style={formStyles.title}>Реєстрація</Text>
            <Input
              placeholder='Логін' value={userState.login} secure={false}
              focusAction={() => setIsKeyboardShown(true)}
              changeTextAction={(value) => setUserState((prevState) => ({ ...prevState, login: value }))} />
            <Input
              placeholder='Адреса електронної пошти' value={userState.email} secure={false}
              focusAction={() => setIsKeyboardShown(true)}
              changeTextAction={(value) => setUserState((prevState) => ({ ...prevState, email: value }))} />
            <Input
              placeholder='Пароль' value={userState.password} secure={true}
              focusAction={() => setIsKeyboardShown(true)}
              changeTextAction={(value) => setUserState((prevState) => ({ ...prevState, password: value }))} />
            <PrimaryBtn title='Зареєструватися' action={submitHandler}/>
            <Button title='Вже є акаунт? Увійти' style={formStyles.link} color={colors.btn} onPress={() => navigation.navigate('Login')} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};