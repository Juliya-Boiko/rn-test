import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export const MapScreen = ({ route }) => {
  const marker = route.params.location.coords;
  //console.log(route.params.location.coords);

  return (

    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          longitude: marker.longitude,
          latitude: marker.latitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006
        }}
      >
        <Marker coordinate={{ longitude: marker.longitude, latitude: marker.latitude }} title='PHOTO' />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
});