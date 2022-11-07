import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export const formStyles = StyleSheet.create({
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