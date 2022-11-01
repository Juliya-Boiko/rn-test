import { Text, View, Image, FlatList, StyleSheet } from "react-native";

const commentsMock = [
  { photo: '',
    name: 'Comentator Name',
    text: 'Really love your most recent photo. Ive been trying to capture the same thing for a few months and would love some tips!',
    date: '09 июня, 2020 | 08:40', },
  { photo: '',
    name: 'User',
    text: 'A fast 50mm like f1.8 would help with the bokeh. Ive been using primes as they tend to get a bit sharper images.',
    date: '09 июня, 2020 | 09:14', },
  { photo: '',
    name: 'Comentator Name',
    text: 'Thank you! That was very helpful!',
    date: '09 июня, 2020 | 09:20', },
];

export const CommentsScreen = () => {

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/photo.png')} style={styles.postImage} />
      
      <FlatList
        // style={styles.container}
        data={commentsMock}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.comment}>
            <Image source={require('../../assets/images/commentMock.png')} style={styles.commentImage} />
            <View style={styles.commentDetails}>
              <Text style={styles.commentText}>{item.text}</Text>
              <Text style={styles.commentDate}>{item.date}</Text>
            </View>
          </View>
        }
      />



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  postImage: {
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
  },
  comment: {
    flexDirection: "row",
    width: 300,
    marginBottom: 24,
  },
  commentImage: {
    width: 28,
    height: 28,
    marginRight: 16,
  },
  commentDetails: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#E8E8E8',
  },
  commentText: {
    marginBottom: 8,
    fontFamily: 'Roboto-400',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  commentDate: {
    textAlign: "right",
    fontFamily: 'Roboto-400',
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
  },
});