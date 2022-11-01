import { createStackNavigator } from '@react-navigation/stack';
import { DefaultPostsScreen } from './nested/DefaultScreenPosts';
import { CommentsScreen } from './nested/CommentsScreen';
import { MapScreen } from './nested/MapScreen';

const NestedNav = createStackNavigator();

export const PostsScreen = ({ route }) => {

  return (
    <NestedNav.Navigator>
      <NestedNav.Screen options={{header: () => null}} name='DefaultScreen' component={DefaultPostsScreen} />
      <NestedNav.Screen options={{header: () => null}} name='Map' component={MapScreen} />
      <NestedNav.Screen options={{header: () => null}} name='Comments' component={CommentsScreen} />
    </NestedNav.Navigator>
  );
};