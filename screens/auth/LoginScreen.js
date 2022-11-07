import { TouchableWithoutFeedback, Keyboard, ImageBackground, KeyboardAvoidingView, View, Text, StyleSheet, Platform, Dimensions, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loginUser } from '../../redux/auth/authOperations';
import { setUser } from '../../redux/auth/authSlice';
import { Input } from '../../components/common/Input';
import { PrimaryBtn } from '../../components/common/PrimaryBtn';
import { colors } from '../../styles/colors';

const initialState = {
  email: '',
  password: ''
};

export const LoginScreen = ({ navigation }) => { 
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
    const user = await loginUser(userState);
    dispatch(setUser({ login: user.displayName, id: user.uid }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={styles.image} source={require('../../assets/images/bg-register.jpg')}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ ...styles.form, paddingBottom: isKeyboardShown ? 32 : 78, paddingHorizontal: dimensions > 500 ? 60 : 16 }}>
            <Text style={styles.title}>Увійти</Text>
            <Input
              placeholder='Адреса електронної пошти' value={userState.email} secure={false}
              focusAction={() => setIsKeyboardShown(true)}
              changeTextAction={(value) => setUserState((prevState) => ({ ...prevState, email: value }))} />
            <Input
              placeholder='Пароль' value={userState.password} secure={true}
              focusAction={() => setIsKeyboardShown(true)}
              changeTextAction={(value) => setUserState((prevState) => ({ ...prevState, password: value }))} />
            <PrimaryBtn action={submitHandler} title='Увійти'/>
            <Button
              title='Немає акаунта? Зареєструватися' style={styles.link}
              color={colors.btn} onPress={() => navigation.navigate('Registration')} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: 'Roboto-700',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: colors.black,
    marginBottom: 32
  },
  link: {
    textAlign: 'center',
    fontFamily: 'Roboto-400',
    fontSize: 16,
  }
});