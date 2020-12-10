import React from "react";
import {authContext} from "../contexts/AuthContext";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from '../screens/HomeScreen';
import DetailsRecipe from "../screens/DetailsRecipe";
import RecipeForm from "../screens/admin/RecipeForm";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyRecipes from "../screens/admin/MyRecipes";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="Details" component={DetailsRecipe} options={{headerShown: false}}/>
        </HomeStack.Navigator>
    );
}

function Navigation() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const {state}: any = React.useContext(authContext);

    if (state.userToken) {
        return (
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Accueil') {
                        iconName = focused
                            ? 'home-circle'
                            : 'home';
                    } else if (route.name === 'Mes recettes') {
                        iconName = focused ? 'silverware-fork-knife' : 'silverware-fork-knife';
                    } else if (route.name === 'Ajouter une recette') {
                        iconName = focused ? 'plus-circle-outline' : 'plus-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
                },
            })}
                           tabBarOptions={{
                               activeTintColor: '#009387',
                               inactiveTintColor: 'gray',
                           }}>
                <Tab.Screen name="Accueil" component={HomeStackScreen}/>
                {state?.user?.role?.label === 'Admin' ? (
                    <Tab.Screen name="Ajouter une recette" component={RecipeForm}/>
                ) : null}
                <Tab.Screen name="Mes recettes" component={MyRecipes}/>
            </Tab.Navigator>
        )
    } else {
        return (
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="SignIn" component={SignIn}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Splash" component={SplashScreen}/>
            </Stack.Navigator>
        )
    }
}

export default Navigation;
