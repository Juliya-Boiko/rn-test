import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from "react-native";
import { colors } from '../../styles/colors';

export const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params.location.coords;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ longitude, latitude, latitudeDelta: 0.001, longitudeDelta: 0.006 }}
      >
        <Marker coordinate={{ longitude, latitude }} title='PHOTO' />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white
  },
  map: {
    flex: 1,
  },
});