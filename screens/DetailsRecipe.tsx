import React, {useContext, useEffect} from "react";
import {Alert, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Recipe} from "../services/Recipe";
import {authContext} from "../contexts/AuthContext";
import {consts} from '../config/consts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from "../components/Header";
import {Notes} from "../services/Notes";
import {Picker} from "@react-native-picker/picker";

function DetailsRecipe({route, navigation}: any) {
    const {recipeId} = route.params;
    const {state}: any = useContext(authContext);
    const [recipe, setRecipe]: any = React.useState({});
    const [note, setNote]: any = React.useState({});

    useEffect(() => {
        async function getRecipe() {
            const recipe = await Recipe.getOne(recipeId, state.userToken)
            setRecipe(recipe);
            const notes = recipe.notes.filter((el: any) => el.user === state.user.id);
            if (notes.length > 0) {
                setNote(notes[0]);
            }
        }

        getRecipe().then();
    }, []);

    const handleNote = async (value: any) => {
        if (note.id) {
            const newNote = await updateNote(value);
            setNote(newNote);
        } else {
            const newNote = await createNote(value);
            setNote(newNote);
        }
    }

    const createNote = async (value: number) => {
        try {
            const noteCreated = await Notes.create(state.userToken, recipe.id, value);
            if (noteCreated) {
                Alert.alert('Note', 'Merci pour votre contribution !');
                return Promise.resolve(noteCreated);
            }
        } catch (e) {
            Alert.alert('Erreur', 'Une erreur est survenue');
        }
    }

    const updateNote = async (value: number) => {
        try {
            console.log(note)
            const noteUpdated = await Notes.update(state.userToken, {...note, value: value});
            if (noteUpdated) {
                Alert.alert('Note', 'Merci pour votre contribution !');
                return Promise.resolve(noteUpdated);
            }
        } catch (e) {
            Alert.alert('Erreur', 'Une erreur est survenue');
        }
    }

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
    for (let i = 1; i <= 4; i++) {
        if (i <= recipe.level) {
            stars.push('circle');
        } else {
            stars.push('circle-outline');
        }

    }
    let difficulty = '';
    switch (recipe.level) {
        case 1:
            difficulty = 'Très facile';
            break;
        case 2:
            difficulty = 'Facile';
            break;
        case 3:
            difficulty = 'Moyen';
            break;
        case 4:
            difficulty = 'Difficile';
            break;
    }

    return (
        <View>
            <Header canBackward={true} title={'Recette'} navigation={navigation}/>
            <ScrollView style={styles.scroll}>
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
                                            name={item}
                                            color="#009387"
                                            size={30}
                                        />
                                    )
                                })}
                            </View>
                            <Text>{difficulty}</Text>
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
                        <View>
                            <Text>Notez cette recette : </Text>
                            <Picker selectedValue={note.value ? note.value : 0}
                                    style={{height: 50, width: '100%'}}
                                    onValueChange={async (value) =>
                                        await handleNote(value)
                                    }>
                                <Picker.Item label={'0'} value={0}/>
                                <Picker.Item label={'1'} value={1}/>
                                <Picker.Item label={'2'} value={2}/>
                                <Picker.Item label={'3'} value={3}/>
                                <Picker.Item label={'4'} value={4}/>
                                <Picker.Item label={'5'} value={5}/>
                            </Picker>
                        </View>
                        {recipe.user ? (
                            <Text style={styles.user}>Recette créée par
                                : {recipe.user.firstname} {recipe.user.lastname}</Text>
                        ) : null}
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
    scroll: {
        marginBottom: 50,
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
        marginBottom: 20,
    },
});
