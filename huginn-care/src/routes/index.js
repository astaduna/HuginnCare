import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../views/Home';
import Reports from '../views/Reports';
import AllReports from '../views/AllReports';
import Profile from '../views/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconSource;

                if (route.name === 'Home') {
                    iconSource = require('../resources/dashboard.png');
                } else if (route.name === 'Reports') {
                    iconSource = require('../resources/file.png');
                } else if (route.name === 'Profile') {
                    iconSource = require('../resources/user.png');
                }
                return <Image source={iconSource} style={{ width: 24, height: 24, tintColor: color }} />;
            }
        })}
        tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray'
        }}
    >
        <Tab.Screen name="Home" component={Home} options={{ title: 'Forsíða' }} />
        <Tab.Screen name="Reports" component={Reports} options={{ title: 'Skýrslur' }} />
        <Tab.Screen name="Profile" component={Profile} options={{ title: 'Notandi' }} />
    </Tab.Navigator>
);

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerLeft: null,
            gestureEnabled: true
        }}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="AllReports" component={AllReports} options={{ title: 'Eldri skýrslur' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
