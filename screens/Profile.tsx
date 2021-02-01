import React, {useContext, useEffect} from "react";
import {View, StyleSheet, ScrollView, Text} from "react-native";
import Header from "../components/Header";
import {authContext} from "../contexts/AuthContext";

function Profile({navigation}: any) {
    const {state}: any = useContext(authContext);

    return (
        <View>
            <Header canBackward={false} title={'Profil'} navigation={navigation}/>
            <ScrollView style={styles.scroll}>
                <Text>Informations personnelles :</Text>
                <Text>Nom : {state.user.lastname} {state.user.firstname}</Text>
                <Text>Email : {state.user.email}</Text>
            </ScrollView>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    scroll: {
        marginBottom: 80,
    },
});
