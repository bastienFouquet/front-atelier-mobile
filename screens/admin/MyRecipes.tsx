import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import Header from "../../components/Header";

function MyRecipes() {
    return (
        <View>
            <Header canBackward={false} title={'Mes recettes'}/>
            <ScrollView style={styles.scroll}>

            </ScrollView>
        </View>
    );
}

export default MyRecipes;

const styles = StyleSheet.create({
    scroll: {
        marginBottom: 80,
    },
});
