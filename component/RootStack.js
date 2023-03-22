/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Screens
import HomePage from '../Screens/Home/HomePage';
import Books from '../Screens/Home/Books';
import Favorites from '../Screens/Home/Favorites';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

//Tab Navigator
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home Page') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            } else if (route.name === 'Books') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused
                ? 'person-circle-outline'
                : 'person-circle-sharp';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerTitle: '',
          headerTransparent: true,
        })}>
        <Tab.Screen name="Home Page" component={HomePage} />
        <Tab.Screen name="Books" component={Books} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    </>
  );
}
//Stack Navigator
const RootStack = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTransparent: true,
            headerTitle: '',
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
            headerShown: false,
          }}>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default RootStack;
