import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';

export const MapScreen = ({ route }) => {
  const marker = route.params.item.post.location.coords;
  console.log(route.params.item.post.location);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={{ longitude: marker.longitude, latitude: marker.latitude, latitudeDelta: 0.1, longitudeDelta: 0.1 }}
      >
        <Marker coordinate={{ longitude: marker.longitude, latitude: marker.latitude }} title='PHOTO' />
      </MapView>
    </View>
  );
  
  //return <Text>Map</Text>
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