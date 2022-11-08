import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { Controller } from 'react-hook-form';

export const Input = ({ control, name, placeholder, rules, secure }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>
        <View style={styles.label}>
          <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.lightGray}
          style={styles.input}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
            secureTextEntry={secure} />
          { error && <Text style={styles.error} >{error.message || 'Error'}</Text> }
        </View>
        }
    />
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
    padding: 10,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.input.border,
    backgroundColor: colors.input.background,
    borderRadius: 6,
    color: colors.black,
  },
  error: {
    textAlign: 'center',
    color: colors.error
  }
});