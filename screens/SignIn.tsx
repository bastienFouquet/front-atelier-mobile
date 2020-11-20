import React from "react";
import {Button, TextInput, View} from "react-native";
import {authContext} from "../contexts/AuthContext";

export function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {signIn}: any = React.useContext(authContext);

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={async () => await signIn(email, password)}/>
        </View>
    );
}
