import { TouchableWithoutFeedback, Keyboard, ImageBackground, KeyboardAvoidingView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, Platform, Dimensions, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const initialState = {
  login: '',
  email: '',
  password: ''
};

export const RegistrationScreen = ({ navigation }) => { 
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [userState, setUserState] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);

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

  const submitHandler = () => {
    keyboardHide();
    //console.log(userState);
    createUserWithEmailAndPassword(auth, userState.email, userState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        console.log(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={styles.image} source={require('../../assets/images/bg-register.jpg')}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ ...styles.form, paddingBottom: isKeyboardShown ? 32 : 78, paddingHorizontal: dimensions > 500 ? 60 : 16 }}>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              placeholder='Логін'
              placeholderTextColor='#BDBDBD'
              style={styles.input}
              onFocus={() => setIsKeyboardShown(true)}
              value={userState.login}
              onChangeText={(value) => setUserState((prevState) => ({ ...prevState, login: value }))} />
            <TextInput
              placeholder='Адреса електронної пошти'
              placeholderTextColor='#BDBDBD'
              style={styles.input}
              onFocus={() => setIsKeyboardShown(true)}
              value={userState.email}
              onChangeText={(value) => setUserState((prevState) => ({ ...prevState, email: value }))} />
            <TextInput
              placeholder='Пароль'
              placeholderTextColor='#BDBDBD'
              secureTextEntry={true}
              style={{ ...styles.input, marginBottom: 43 }}
              onFocus={() => setIsKeyboardShown(true)}
              value={userState.password}
              onChangeText={(value) => setUserState((prevState) => ({ ...prevState, password: value }))} />
            <TouchableOpacity style={styles.btn} onPress={submitHandler}>
              <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
            <Button title='Вже є акаунт? Увійти' style={styles.link} color={'#1B4371'} onPress={() => navigation.navigate('Login')} />

             {/* <Text style={styles.link}>Вже є акаунт? Увійти</Text> */}
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
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Roboto-700',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
    marginBottom: 32
  },
  input: {
    padding: 10,
    marginBottom: 16,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    color: '#212121',
  },
  btn: {
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },
  btnText: {
    fontFamily: 'Roboto-400',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  link: {
    textAlign: 'center',
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#1B4371',
  }
});