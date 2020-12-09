import React from "react";
import {authContext} from "../contexts/AuthContext";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from '../screens/HomeScreen';
import DetailsRecipe from "../screens/DetailsRecipe";

function Navigation({navigation}: any) {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const {state}: any = React.useContext(authContext);
    return (state.userToken ? (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="DetailsRecipe" component={DetailsRecipe} options={{tabBarVisible: false}}/>
                {state?.user?.role?.label === 'Admin' ? (
                    <Tab.Screen name='AdminProfile' component={SignIn}/>
                ) : null}
            </Tab.Navigator>
        ) : (
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Splash" component={SplashScreen}/>
            </Stack.Navigator>
        )
    )
}

export default Navigation;
