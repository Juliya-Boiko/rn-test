import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, TextInput, View, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getComments } from "../../firebase/get/getComments";
import { uploadComment } from "../../firebase/upload/uploadComment";
import { getCurrentDate } from "../../services/getCurrentDate";
import { colors } from "../../styles/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const name = useSelector(state => state.auth.user.login);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const items = await getComments(postId);
    setComments(items);
  };

  const submitHandler = async () => {
    await uploadComment({ name, text: newComment, date: getCurrentDate()}, postId);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.comment}>
            <Image source={require('../../assets/images/commentMock.png')} style={styles.thumb} />
            <View style={styles.commentData}>
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        }
      />
      <View style={styles.label}>
        <View style={styles.area}>
          <TextInput
            placeholder='Коментувати...'
            placeholderTextColor={colors.lightGray}
            style={styles.input}
            value={newComment}
            onChangeText={(value) => setNewComment(value)} 
          />
          <TouchableOpacity style={styles.btn} onPress={submitHandler}>
            <Ionicons name="arrow-up" color={colors.white} size={14}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  image: {
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
  },
  comment: {
    flexDirection: "row",
    width: 300,
    marginBottom: 24,
  },
  thumb: {
    width: 28,
    height: 28,
    marginRight: 16,
  },
  commentData: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.input.border,
  },
  text: {
    marginBottom: 8,
    fontFamily: 'Roboto-400',
    fontSize: 13,
    lineHeight: 18,
    color: colors.black,
  },
  date: {
    textAlign: "right",
    fontFamily: 'Roboto-400',
    fontSize: 10,
    lineHeight: 12,
    color: colors.lightGray,
  },
  label: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  area: {
    position: 'relative'
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.input.border,
    borderRadius: 100,
    backgroundColor: colors.input.background,
    color: colors.black
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
    backgroundColor: colors.orange,
  },

});