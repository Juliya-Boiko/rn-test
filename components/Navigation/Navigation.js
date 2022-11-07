import { NavTab } from "../../routes/navigators";
import { StyleSheet, View } from 'react-native';
import { PostsScreen } from "../../screens/PostsScreen";
import { ProfileScreen } from '../../screens/ProfileScreen';
import { CreatePostsScreen } from '../../screens/CreatePostsScreen';
import { NavTabIcon } from "./NavTabIcon";
import { colors } from "../../styles/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export const Navigation = () => {
  return (
    <NavTab.Navigator screenOptions={{tabBarStyle: { paddingTop: 9, paddingBottom: 9 }}}>
      <NavTab.Screen
        options={{
          headerRight: () =>
            <NavTabIcon name='logout' action={() => console.log('Dont forget add here LOGOUT func!!!!!')} />,
          tabBarShowLabel: false, 
          tabBarIcon: ({ focused  }) => <Ionicons name="ios-grid-outline" color={colors.black} size={24} />,
        }}
        name='Posts'
        component={PostsScreen} />
      <NavTab.Screen
        options={{
          headerLeft: () =>
            <NavTabIcon name='arrow-back' action={() => console.log('Dont forget add here NAVIGATION!!!!!')}/>,
          tabBarShowLabel: false, 
          tabBarIcon: ({ focused }) => <View style={styles.accent}><Ionicons name="add" color={colors.white} size={24} /></View>
        }}
         name='CreatePost'
        component={CreatePostsScreen} />
      <NavTab.Screen
        options={{
          tabBarShowLabel: false, 
          tabBarIcon: ({ focused }) => <Feather name="user" color={colors.black} size={24} />
        }}
        name='Profile'
        component={ProfileScreen}/>
    </NavTab.Navigator>
  );
};

const styles = StyleSheet.create({
  accent: {
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    borderRadius: 20,
  },
});