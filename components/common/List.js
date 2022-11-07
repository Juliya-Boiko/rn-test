import { FlatList, View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { commentsAmount } from '../../services/commentsAmount';
import { colors } from "../../styles/colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export const List = ({ data, navigation }) => { 
  return (
    <FlatList
      style={styles.list}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        <View style={styles.post}>
          <Image source={{ uri: item.photo }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.details}>
            <TouchableOpacity style={styles.comments} onPress={() => navigation.navigate('Comments', { postId: item.id, photo: item.photo })} >
              <EvilIcons style={styles.commentsIcon} name="comment" color={colors.lightGray} size={24} />
              <Text style={styles.commentsText}>{commentsAmount(item)}</Text>
            </TouchableOpacity>
            <View style={styles.location}>
              <EvilIcons name="location" color={colors.lightGray} size={24} style={styles.locationIcon} />
              <Text style={styles.locationText} onPress={() => navigation.navigate('Map', { location: item.location })}>{item.location.reversedLocation}</Text>
            </View>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  post: {
    justifyContent: 'center',
    marginBottom: 32,
  },
  image: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
    fontFamily: 'Roboto-500',
    fontSize: 16,
    color: colors.black,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    flexDirection: 'row',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: colors.black,
    textDecorationLine: 'underline'
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentsIcon: {
    marginRight: 6,
  },
  commentsText: {
    color: colors.lightGray,
  }
});