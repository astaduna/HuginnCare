import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../views/Home';
import Reports from '../views/Reports';
import AllReports from '../views/AllReports';
import Profile from '../views/Profile';

const Tab = createBottomTabNavigator();

const Routes = () => (
    <NavigationContainer>
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
                },
                tabBarButton: (props) => {
                    if (route.name === 'AllReports') {
                        return null;
                    }
                    return <DefaultTabButton {...props} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{ title: 'Forsíða' }} />
            <Tab.Screen name="Reports" component={Reports} options={{ title: 'Skýrslur' }} />
            <Tab.Screen name="AllReports" component={AllReports} options={{ title: 'Eldri Skýrslur' }} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: 'Notandi' }} />
        </Tab.Navigator>
    </NavigationContainer>
);

const DefaultTabButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        onPress={onPress}
    >
        {children}
    </TouchableOpacity>
);

export default Routes;
