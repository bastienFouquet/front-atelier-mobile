import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthProvider from "./contexts/AuthContext";
import Navigation from './components/Navigation';
import {StatusBar} from "react-native";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar backgroundColor={'#86CEFA'} barStyle={'default'}> </StatusBar>
                <Navigation/>
            </NavigationContainer>
        </AuthProvider>
    );
}
