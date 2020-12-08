import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {authContext} from "../contexts/AuthContext";
import Feather from "react-native-vector-icons/Feather";

function Header() {
    const {signOut, state}: any = React.useContext(authContext)
    return (
        <View style={styles.header}>
            <Text>Bonjour {state.user.firstname} {state.user.lastname} !</Text>
            <Feather
                name="log-out"
                color="#05375a"
                size={20}
                onPress={async () => await signOut()}
            />
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 35,
        padding: 5,
        backgroundColor: '#1393D8',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {},
    back: {
        backgroundColor: '#86CEFA'
    }
})
