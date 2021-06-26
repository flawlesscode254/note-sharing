import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Music'
import PlayScreen from '../screens/Play'
import ProfileScreen from '../screens/Profile'

const Stack = createBottomTabNavigator();

const App = () => {

  const tabBarOptions = {
    showLabel: false,
    style: {
        backgroundColor: "#222222",
        paddingBottom: 12,
        paddingTop: 12
    }
}

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
        let iconName = "home"

        switch (route.name) {
            case "Home":
                iconName = "home"
                break;
            case "Post":
                iconName = "add-circle-outline"
                break;
            case "Profile":
                iconName = "person"
                break;

            default:
                iconName = "home"
        }

        if (route.name === "Post"){
               return <Ionicons name="add-circle-outline" size={45} color={focused ? "#ffffff" : "#E9446A"} />
        }
               return  <Ionicons name={iconName} size={24} color={focused ? "#ffffff" : "#666666"} />
    }
  })
  return (
      <Stack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
        <Stack.Screen name="Music" component={HomeScreen} />
        <Stack.Screen name="Post" component={PlayScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  );
};

export default App
