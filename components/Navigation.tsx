import React from "react";
import {SignIn} from "../screens/SignIn";
import {createStackNavigator} from "@react-navigation/stack";
import SplashScreen from "../screens/SpashScreen";
import HomeScreen from '../screens/HomeScreen';
import {authContext} from "../contexts/AuthContext";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function Navigation() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const {state}: any = React.useContext(authContext);
    return (state.isLoading ? (
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen}/>
            </Stack.Navigator>
        ) : state.userToken ? (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Splash" component={SplashScreen}/>
                {state?.user?.role?.label === 'Admin' ? (
                    <Tab.Screen name='AdminProfile' component={SignIn}/>
                ) : null}
            </Tab.Navigator>
        ) : (
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignIn}/>
            </Stack.Navigator>
        )
    )
}

export default Navigation;
