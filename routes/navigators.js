import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const AuthStack = createStackNavigator();
export const NavTab = createBottomTabNavigator();
export const NestedNav = createStackNavigator();