import React, {useContext, useEffect} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Recipe} from "../services/Recipe";
import {authContext} from "../contexts/AuthContext";
import {consts} from '../config/consts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from "../components/Header";

function DetailsRecipe({route, navigation}: any) {
    const {recipeId} = route.params;
    const {state}: any = useContext(authContext);
    const [recipe, setRecipe]: any = React.useState({});

    useEffect(() => {
        async function getRecipe() {
            setRecipe(await Recipe.getOne(recipeId, state.userToken));
        }

        getRecipe().then();
    });

    const imagePath = () => {
        if (recipe.image) {
            if (recipe.image.includes('http')) {
                return recipe.image;
            } else {
                return consts.apiBaseUrl + 'images/' + recipe.image;
            }
        } else {
            return consts.defaultCookingImage;
        }
    }

    const stars = [];
    for (let i = 0; i < recipe.level; i++) {
        stars.push('');
    }

    return (
        <View>
            <Header canBackward={true} title={'Recette'} navigation={navigation}/>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.innerImage}>
                        <Image style={styles.image} source={{uri: imagePath()}}/>
                    </View>
                    <View style={styles.innerTitle}>
                        <Text style={styles.title}>{recipe.title}</Text>
                    </View>
                    <View style={styles.infos}>
                        <View style={styles.info}>
                            <MaterialCommunityIcons
                                name="silverware-fork-knife"
                                color="#009387"
                                size={50}
                            />
                            <Text style={styles.infoText}>{recipe.servings} Personnes</Text>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.stars}>
                                {stars.map((item: any, i: number) => {
                                    return (
                                        <MaterialCommunityIcons
                                            key={i}
                                            style={styles.icon}
                                            name="star"
                                            color="#009387"
                                            size={30}
                                        />
                                    )
                                })}
                            </View>
                            <Text>Difficulté</Text>
                        </View>
                        <View style={styles.info}>
                            <MaterialCommunityIcons
                                name="clock-fast"
                                color="#009387"
                                size={50}
                            />
                            <Text style={styles.infoText}>{recipe.duration}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.listing}>
                            <Text style={styles.subtitle}>Ingrédients nécessaires :</Text>
                            {recipe.ingredients ? (recipe.ingredients.map((ingredient: any, i: number) => {
                                return (
                                    <View key={i} style={styles.ingredient}>
                                        <MaterialCommunityIcons
                                            name="check-circle-outline"
                                            color="#009387"
                                            size={14}
                                        />
                                        <Text> {ingredient.quantity} {ingredient.title}</Text>
                                    </View>
                                )
                            })) : null}
                        </View>
                        <View>
                            {recipe.steps ? (recipe.steps.map((step: any, i: number) => {
                                return (
                                    <View key={i} style={styles.step}>
                                        <Text style={styles.stepPos}>{step.position}</Text>
                                        <Text style={styles.stepText}>{step.description}</Text>
                                        <Text style={styles.line}> </Text>
                                    </View>

                                )
                            })) : null}
                        </View>
                        {recipe.user ? (
                            <Text style={styles.user}>Recette créée par : {recipe.user.firstname} {recipe.user.lastname}</Text>
                        ): null}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default DetailsRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    innerImage: {
        height: 200,
        width: "100%",
        top: 0,
    },
    title: {
        textAlign: "center",
        fontSize: 25,
        marginBottom: 20,
    },
    innerTitle: {
        top: -30,
        borderRadius: 30,
        backgroundColor: "#F2F2F2",
        paddingTop: 10,
    },
    infos: {
        flex: 1,
        flexDirection: "row",
        height: 110,
        shadowColor: "#000",
        marginLeft: 10,
        marginRight: 10,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        paddingTop: 20,
        paddingBottom: 20,
        shadowOpacity: 0.22,
        shadowRadius: 2.24,
        elevation: 3
    },
    icon: {
        height: 50,
    },
    info: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        flex: 1,
        marginTop: 10,
        flexDirection: "row",
    },
    infoText: {
        textAlign: "center",
        flex: 1,
    },
    content: {
        borderBottomWidth: 1,
        borderStyle: "solid",
        padding: 10,
        marginTop: 20,
    },
    listing: {
        marginBottom: 30,
    },
    step: {
        marginBottom: 10,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    stepPos: {
        textAlign: "center",
        fontSize: 30,
        backgroundColor: "#009387",
        width: 40,
        marginBottom: 10,
        color: "white",
        borderRadius: 50,
    },
    stepText: {
        textAlign: "center",
        marginBottom: 10,
    },
    line: {
        width: 200,
        borderBottomWidth: 1,
        height: 10,
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 15,
    },
    ingredient: {
        marginLeft: 20,
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    user: {
        textAlign: "center",
        marginTop: 20,
    },
});
