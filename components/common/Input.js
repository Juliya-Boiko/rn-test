import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const Input = ({ placeholder, focusAction, value, changeTextAction, secure }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.lightGray}
      style={styles.input}
      onFocus={focusAction}
      value={value}
      onChangeText={changeTextAction}
      secureTextEntry={secure}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginBottom: 16,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.input.border,
    backgroundColor: colors.input.background,
    borderRadius: 6,
    color: colors.black,
  },
});