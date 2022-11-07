import * as Location from 'expo-location';

export const getLocation = async () => {
  await Location.requestForegroundPermissionsAsync();
  const location = await Location.getCurrentPositionAsync();
  const { latitude, longitude } = location.coords;
  const response = await Location.reverseGeocodeAsync({
    latitude,
    longitude
  });
  const reversedLocation = response[0].city;
  const data = {
    coords: { ...location.coords },
    reversedLocation
  };
  return data;
};
