import React, {useContext, useEffect} from "react";
import {View, StyleSheet, ScrollView, Text} from "react-native";
import Header from "../components/Header";
import {authContext} from "../contexts/AuthContext";
import {Recipe} from "../services/Recipe";
import {consts} from "../config/consts";

function Profile({navigation}: any) {
    const {state}: any = useContext(authContext);
    const [recipes, setRecipes]: any = React.useState({});

    useEffect(() => {
        async function getRecipes() {
            setRecipes(await Recipe.getAll(state.userToken));
        }

        getRecipes().then();
    });

    return (
        <View>
            <Header canBackward={true} title={'Profil'} navigation={navigation}/>
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
