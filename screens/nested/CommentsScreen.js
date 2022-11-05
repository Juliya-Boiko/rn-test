import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, TextInput, View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const CommentsScreen = ({ route }) => {
  const postId = route.params.postId;
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const name = useSelector(state => state.auth.user.login);

  useEffect(() => {
    getCurrentPost();
  }, []);

  const getCurrentPost = async () => {
    const docRef = doc(db, "posts", postId);
    const data = await (await getDoc(docRef)).data();
    setPhoto(data.photo);
    setComments(data.comments);
  };

  const submitHandler = async () => {
    const data = {
      name: name,
      text: newComment,
      date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
    } 
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      comments: arrayUnion(data),
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri:photo }} style={styles.postImage} />
      
      <FlatList
        style={styles.container}
        data={comments}
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
      <View style={styles.bottomBlock}>
        <View style={styles.commentField}>
          <TextInput
            placeholder='Коментувати...'
            placeholderTextColor='#BDBDBD'
            style={styles.input}
            value={newComment}
            onChangeText={(value) => setNewComment(value)} 
          />
          <TouchableOpacity style={styles.btn} onPress={submitHandler}>
            <Ionicons name="arrow-up" color='#ffffff' size={14}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  postImage: {
    height: 240,
    alignSelf: 'center',
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
  commentField: {
    position: 'relative'
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
    color: '#212121'
  },
  btn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#FF6C00',
  },
  bottomBlock: {
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor: 'red'
  }
});