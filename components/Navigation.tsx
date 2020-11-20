import React from "react";
import {SignIn} from "../screens/SignIn";
import {createStackNavigator} from "@react-navigation/stack";
import SplashScreen from "../screens/SpashScreen";
import HomeScreen from '../screens/HomeScreen';
import {authContext} from "../contexts/AuthContext";

function Navigation() {
    const Stack = createStackNavigator();
    const {state}: any = React.useContext(authContext);
    return (
        <Stack.Navigator>
            {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen}/>
            ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                        title: 'Sign in',
                        // When logging out, a pop animation feels intuitive
                        animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                />
            ) : (
                // User is signed in
                <Stack.Screen name="Home" component={HomeScreen}/>
            )}
        </Stack.Navigator>
    )
}

export default Navigation;
