import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../components/LoginModal/user';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../views/Main';
import Login from '../views/Login';
import Home from '../views/Home';
import Reports from '../views/Reports';
import AllReports from '../views/AllReports';
import Drafts from '../views/Drafts';
import ReportDetail from '../views/ReportDetail';
import Profile from '../views/Profile';
import NewReport from '../views/NewReport';
import Settings from '../views/Settings';
import Clients from '../views/Clients';
import Staffs from '../views/Staffs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
    const currentUser = useRecoilValue(userState);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === 'HomePage') {
                        iconSource = require('../resources/dashboard.png');
                    } else if (route.name === 'Reports') {
                        iconSource = require('../resources/report.png');
                    } else if (route.name === 'Profile') {
                        iconSource = require('../resources/user.png');
                    }
                    return <Image source={iconSource} style={{ width: 24, height: 24, tintColor: color }} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray'
            })}
        >
            <Tab.Screen name='HomePage' component={Home} options={{ title: 'Forsíða', headerTitle: currentUser.routeTitle + ', ' + currentUser.thisUser.name }} />
            <Tab.Screen name='Reports' component={Reports} options={{ title: 'Skýrslur', headerTitleAlign: 'left' }} />
            <Tab.Screen name='Profile' component={Profile} options={{ title: 'Notandi' }} />
            <Tab.Screen name='AllReports' component={AllReports} options={{ title: 'Eldri Skýrslur', tabBarButton: () => null }} />
            <Tab.Screen name='Drafts' component={Drafts} options={{ title: 'Öll Drög', tabBarButton: () => null }} />
            <Tab.Screen name='ReportDetail' component={ReportDetail} options={{ title: 'Stök skýrsla', tabBarButton: () => null }} />
            <Tab.Screen name='NewReport' component={NewReport} options={{ title: 'Ný Skýrsla', tabBarButton: () => null }} />
            <Tab.Screen name='Settings' component={Settings} options={{ title: 'Stillingar', tabBarButton: () => null }} />
            <Tab.Screen name='Clients' component={Clients} options={{ title: 'Allir þjónustuþegar', tabBarButton: () => null }} />
            <Tab.Screen name='Staffs' component={Staffs} options={{ title: 'Allir starfsmenn', tabBarButton: () => null }} />
        </Tab.Navigator>
    );
};

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Routes;
