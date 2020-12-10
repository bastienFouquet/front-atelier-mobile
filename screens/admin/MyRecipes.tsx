import React from "react";
import { View, StyleSheet, ScrollView} from "react-native";
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
    recipe: {
        margin: 10,
        padding: 10,
    },
    scroll: {
        marginBottom: 80,
    },
    image: {
        height: 200,
        width: "100%",
        borderRadius: 10,
        position: "relative",
        resizeMode: "cover",
    },
    title: {
        fontSize: 18,
    },
    category: {
        position: "absolute",
        top: 10,
        right: 10,
        paddingTop: 3,
        borderTopRightRadius: 10,
        paddingBottom: 3,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: "#009387",
        color: "white",
    },
    desc: {
        flexDirection: "row",
    },
    innerTitle: {
        flex: 0.6
    },
    innerStars: {
        flex: 0.4,
        flexDirection: "row-reverse",
    },
    icon: {}
});
