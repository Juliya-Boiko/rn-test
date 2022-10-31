import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RegistrationScreen } from '../screens/auth/RegistrationScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { PostsScreen } from '../screens/PostsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CreatePostsScreen } from '../screens/CreatePostsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { StyleSheet, View } from 'react-native';


const AuthStack = createStackNavigator();
const NavTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen options={{header: () => null}} name='Login' component={LoginScreen} />
        <AuthStack.Screen options={{header: () => null}} name='Registration' component={RegistrationScreen} />
      </AuthStack.Navigator>
    );
  }

  return (
    <NavTab.Navigator screenOptions={{tabBarStyle: { paddingTop: 9 }}}>
      <NavTab.Screen
        options={{
          header: () => null,
          tabBarShowLabel: false, 
          tabBarIcon: ({ focused  }) => <Ionicons name="ios-grid-outline" color='#212121' size={24} />,
        }}
        name='Posts'
        component={PostsScreen} />
      <NavTab.Screen
        options={{
          header: () => null,
          tabBarShowLabel: false, 
          tabBarIcon: ({ focused }) => <View style={styles.accentIcon}><Ionicons name="add" color='#fff' size={24} /></View>
        }}
        name='Profile'
        component={ProfileScreen} />
      <NavTab.Screen
        options={{
          header: () => null,
          tabBarShowLabel: false, 
          tabBarIcon: ({ focused }) => <Feather name="user" color='#212121' size={24} />
        }}
        name='CreatePost'
        component={CreatePostsScreen} />
    </NavTab.Navigator>
  );
};

  const screenOptions = {
    tabBarStyle: {
      paddingTop: 9,
    },
  };

const styles = StyleSheet.create({
  accentIcon: {
    width: 70,
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingVertical: 13,
    //paddingHorizontal: 28,
    backgroundColor: '#FF6C00',
    borderRadius: 20,
  }
});