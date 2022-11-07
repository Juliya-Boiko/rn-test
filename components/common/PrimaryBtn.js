import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const PrimaryBtn = ({ action, title }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={action}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: colors.orange,
  },
  title: {
    fontFamily: 'Roboto-400',
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
});