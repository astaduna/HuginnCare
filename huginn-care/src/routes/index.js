import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Main from '../views/Main';
import Reports from '../views/Reports';
import Profile from '../views/Profile';

const Routes = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Main') {
            iconSource = require('../resources/dashboard.png');
          } else if (route.name === 'Reports') {
            iconSource = require('../resources/file.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../resources/user.png');
          }
          return <Image source={iconSource} style={{ width: 24, height: 24, tintColor: color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default Routes;
