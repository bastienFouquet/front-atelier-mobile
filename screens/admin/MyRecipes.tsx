import React, {useEffect} from "react";
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Header from "../../components/Header";
import {authContext} from "../../contexts/AuthContext";
import {Recipe} from "../../services/Recipe";
import {consts} from "../../config/consts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function MyRecipes({navigation}: any) {
    const {state}: any = React.useContext(authContext);
    const [recipes, setRecipes] = React.useState([]);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        async function getRecipes() {
            setRecipes(await Recipe.getMines(state.userToken));
        }

        getRecipes().then();
    }, []);

    const deleteRecipe = async function (recipeId: number) {
        try {
            const recipe = await Recipe.delete(state.userToken, recipeId);
            Alert.alert('Recette supprimer', `La recette ${recipe.title} à bien été supprimé`);
        } catch (e) {
            setError(e);
            Alert.alert('Erreur', `Une erreur s\'est produite`);
        }
    }

    const imagePath = (recipe: any) => {
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
    const getStars = (recipe: any) => {
        const stars = [];
        for (let i = 0; i < recipe.average; i++) {
            stars.push('');
        }
        return stars;
    }
    return (
        <View>
            <Header canBackward={false} title={'Mes Recettes'} navigation={navigation}/>
            <ScrollView style={styles.scroll}>
                <Text style={styles.tuto}>Appuyez longuement pour éditer une recette</Text>
                {recipes.map((recipe: any, i: number) => {
                    return (
                        <View key={i} style={styles.recipe}>
                            <TouchableHighlight onPress={() => navigation.navigate('Details', {
                                screen: 'Mes recettes',
                                recipeId: recipe.id,
                            })} onLongPress={() => {
                                Alert.alert(recipe.title, 'Veuillez sélectionner une action à effectué', [
                                    {
                                        text: 'Supprimer',
                                        onPress: async () => {
                                            await deleteRecipe(recipe.id);
                                        }
                                    },
                                    {
                                        text: 'Modifier',
                                        onPress: () => {
                                            Alert.alert('Désolé', 'Cette fonctionnalité est en développement')
                                        }
                                    },
                                    {
                                        text: 'OK'
                                    }
                                ])
                            }}>
                                <Image style={styles.image} source={{uri: imagePath(recipe)}}/>
                            </TouchableHighlight>
                            <Text style={styles.category}>{recipe.category.name}</Text>
                            <View style={styles.desc}>
                                <View style={styles.innerTitle}>
                                    <Text style={styles.title}>{recipe.title}</Text>
                                </View>
                                <View style={styles.innerStars}>
                                    {getStars(recipe).map((item: any, i: number) => {
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
                            </View>
                        </View>
                    );
                })}
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
    tuto: {
        color: "#009387",
        textAlign: "center",
        paddingTop: 3
    }
});
