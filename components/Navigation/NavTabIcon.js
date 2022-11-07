import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../styles/colors';

export const NavTabIcon = ({ name, action }) => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 10}} onPress={action}>
      <MaterialIcons name={name} color={colors.lightGray} size={24} />
    </TouchableOpacity>
  );
};