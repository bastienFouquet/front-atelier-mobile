import React from "react";
import {authContext} from "../contexts/AuthContext";
import {Button, Text, View} from "react-native";

function HomeScreen() {
    const {signOut, state}: any = React.useContext(authContext);

    return (
        <View>
            <Text>Signed in! {state?.user?.firstname}</Text>
            <Button title="Sign out" onPress={async () => await signOut()}/>
        </View>
    );
}

export default HomeScreen;
