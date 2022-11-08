import { TouchableWithoutFeedback, Keyboard, ImageBackground, KeyboardAvoidingView, View, Text, Platform, Dimensions, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loginUser } from '../../redux/auth/authOperations';
import { setUser } from '../../redux/auth/authSlice';
import { Input } from '../../components/common/Input';
import { PrimaryBtn } from '../../components/common/PrimaryBtn';
import { formStyles } from '../../styles/common/form';
import { colors } from '../../styles/colors';
import { useForm } from 'react-hook-form';
import * as validation from '../../services/validation';

export const LoginScreen = ({ navigation }) => { 
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm();

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

  const handleLogin = async (data) => {
    keyboardHide();
    const user = await loginUser(data);
    dispatch(setUser({ login: user.displayName, id: user.uid }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={formStyles.image} source={require('../../assets/images/bg-register.jpg')}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ ...formStyles.form, paddingBottom: isKeyboardShown ? 32 : 78, paddingHorizontal: dimensions > 500 ? 60 : 16 }}>
            <Text style={formStyles.title}>Увійти</Text>
            <Input
              control={control}
              name='email'
              placeholder='Адреса електронної пошти'
              rules={{
                required: validation.message.require,
                pattern: { value: validation.EMAIL_REGEX, message: validation.message.notCorrect },
              }}
              secure={false} />
            <Input
              control={control}
              name='password'
              placeholder='Пароль'
              rules={{
                required: validation.message.require,
                minLength: { value: 6, message: 'Мінімум 6 символів' },
              }}
              secure={true} />
            <PrimaryBtn action={handleSubmit(handleLogin)} title='Увійти'/>
            <Button
              title='Немає акаунта? Зареєструватися' style={formStyles.link}
              color={colors.btn} onPress={() => navigation.navigate('Registration')} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};