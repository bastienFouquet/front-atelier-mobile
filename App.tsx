import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthProvider from "./contexts/AuthContext";
import Navigation from './components/Navigation';

export default function App({navigation}: any) {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Navigation/>
            </NavigationContainer>
        </AuthProvider>
    );
}
