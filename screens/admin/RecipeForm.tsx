import React, {useEffect, useRef} from "react";
import {authContext} from "../../contexts/AuthContext";
import {
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Header from "../../components/Header";
import {Categories} from "../../services/Categories";
import {Ingredients} from "../../services/Ingredients";
import {Picker} from "@react-native-picker/picker";
import Feather from "react-native-vector-icons/Feather";
import AddIngredient from "../../components/AddIngredient";
import {Recipe} from "../../services/Recipe";
import {LinearGradient} from "expo-linear-gradient";

function RecipeForm({navigation}: any) {
    const childRef: any = useRef();
    const {state}: any = React.useContext(authContext);
    const [categories, setCategories]: any = React.useState(null);
    const [ingredients, setIngredients]: any = React.useState(null);
    const [data, setData]: any = React.useState({level: 1});
    const [steps, setSteps]: any = React.useState([{description: null, position: 1}]);
    const [ingredientsRecipe, setIngredientsRecipe]: any = React.useState([]);
    const [refresh]: any = React.useState(false);

    useEffect(() => {
        async function getCategories() {
            setCategories(await Categories.getAll(state.userToken));
        }

        getCategories().then();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            async function getIngredients() {
                setIngredients(await Ingredients.getAll(state.userToken));
            }

            getIngredients().then();
        }, 3000)
    })

    const handleData = (key: string, value: any) => {
        setData({
            ...data,
            [key]: value
        });
    }

    const setDescription = (step: any, description: string) => {
        const index = steps.indexOf(step);
        steps[index] = {...step, description: description};
        setSteps(JSON.parse(JSON.stringify(steps)));
        if (step.position === (steps.length)) {
            setSteps([...steps, {
                description: null,
                position: steps.length + 1
            }])
        }
    }

    const addIngredientRecipe = (ingredient: any) => {
        setIngredientsRecipe([...ingredientsRecipe, {
            id: ingredient.id,
            title: ingredient.title
        }]);
    }

    const removeIngredientRecipe = (ingredient: any) => {
        const index = ingredientsRecipe.indexOf(ingredient);
        ingredientsRecipe.splice(index, 1);
        setIngredientsRecipe(JSON.parse(JSON.stringify(ingredientsRecipe)));
    }

    const setQuantity = (ingredient: any, quantity: string) => {
        const index = ingredientsRecipe.indexOf(ingredient);
        ingredientsRecipe[index] = {...ingredient, quantity: quantity};
        setIngredientsRecipe(JSON.parse(JSON.stringify(ingredientsRecipe)));
    }

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity onPress={() => {
                addIngredientRecipe(item)
            }} style={styles.item}>
                <Text style={styles.item_text}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const createRecipe = async () => {
        const filteredSteps = steps.filter((el: any) => el.description !== null);
        const recipe = await Recipe.create(state.userToken, {
            ...data,
            steps: filteredSteps,
            ingredients: ingredientsRecipe
        });
        if (recipe) {
            Alert.alert('Recette', 'Recette ajouter avec succès !')
        } else {
            Alert.alert('Recette', 'Une erreur s\'est produite lors de l\'ajout. Veuillez réessayer plus tard')
        }
    }

    return (
        <View style={styles.container}>
            <Header canBackward={true} navigation={navigation} title={'Ajout de recette'}/>
            <ScrollView>
                <Text style={styles.text_footer}>Titre</Text>
                <TextInput
                    placeholder="Entrez le titre"
                    style={styles.input}
                    value={data.title}
                    onChangeText={(value) => handleData('title', value)}
                />
                <Text style={styles.text_footer}>Catégorie</Text>
                <View style={styles.input}>
                    <Picker selectedValue={data.categoryId}
                            style={{height: 50, width: '100%'}}
                            onValueChange={(value) =>
                                handleData('categoryId', value)
                            }>
                        {categories ? (
                            categories.map((category: any, i: number) => {
                                return (<Picker.Item key={i} label={category.name} value={category.id}/>)
                            })
                        ) : null}
                    </Picker>
                </View>
                <Text style={styles.text_footer}>Difficulté</Text>
                <View style={styles.input}>
                    <Picker selectedValue={data.level}
                            style={{height: 50, width: '100%'}}
                            onValueChange={(value) =>
                                handleData('level', value)
                            }>
                        <Picker.Item label={'1'} value={1}/>
                        <Picker.Item label={'2'} value={2}/>
                        <Picker.Item label={'3'} value={3}/>
                        <Picker.Item label={'4'} value={4}/>
                    </Picker>
                </View>
                <Text style={styles.text_footer}>Portions</Text>
                <TextInput
                    placeholder="Entrez le nombre de portions"
                    style={styles.input}
                    autoCapitalize="none"
                    value={data.servings}
                    onChangeText={(value) => handleData('servings', value)}
                />
                <Text style={styles.text_footer}>Durée</Text>
                <TextInput
                    placeholder="Entrez la durée"
                    style={styles.input}
                    autoCapitalize="none"
                    value={data.duration}
                    onChangeText={(value) => handleData('duration', value)}
                />
                <Text style={styles.text_footer}>Image</Text>
                <TextInput
                    placeholder="Entrez l'url de l'image"
                    style={styles.input}
                    autoCapitalize="none"
                    value={data.image}
                    onChangeText={(value) => handleData('image', value)}
                />
                <View style={styles.action}>
                    <Text style={styles.text_footer}>Ingrédients</Text>
                    <TouchableOpacity
                        onPress={() => {
                            childRef.current.handleAddIngredientModal()
                        }} style={{paddingTop: 8}}>
                        <Feather name="plus-circle"
                                 color="green"
                                 size={25}/>
                    </TouchableOpacity>
                </View>
                <AddIngredient ref={childRef}/>
                <View style={{...styles.action, paddingTop: 10}}>
                    <SafeAreaView>
                        <FlatList
                            horizontal
                            data={ingredients ? ingredients : null}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>
                {ingredientsRecipe.length > 0 ? (
                    <View style={styles.list}>
                        {ingredientsRecipe.map((ingredient: any, i: number) => {
                            return (<View key={i} style={{...styles.action, flex: 1}}>
                                <Text style={{...styles.list_text, flex: 0}}>{ingredient.title} : </Text>
                                <TextInput
                                    placeholder="Entrez la quantité"
                                    style={{...styles.input, flex: 1}}
                                    autoCapitalize="none"
                                    value={ingredient.quantity}
                                    onChangeText={(value) => setQuantity(ingredient, value)}/>
                                <TouchableOpacity
                                    style={{flex: 0}}
                                    onPress={() => {
                                        removeIngredientRecipe(ingredient)
                                    }}>
                                    <Feather name="trash-2"
                                             color="red"
                                             size={25}/>
                                </TouchableOpacity>
                            </View>)
                        })}
                    </View>
                ) : null}
                <View style={{paddingTop: 10}}>
                    <Text style={styles.text_footer}>Etapes :</Text>
                    {steps.map((step: any, i: number) => {
                        return (<View key={i} style={{
                            flex: 1,
                            flexDirection: "row",
                            paddingBottom: 5,
                            paddingTop: 5,
                        }}>
                            <Text style={{...styles.list_text, flex: 0}}>{step.position}</Text>
                            <TextInput
                                multiline={true}
                                placeholder={`Description de l'étape ${step.position}`}
                                style={{...styles.input, flex: 1}}
                                value={step.description}
                                onChangeText={(value: string) => {
                                    setDescription(step, value)
                                }}/>
                        </View>)
                    })}
                </View>
                <TouchableOpacity
                    style={styles.confirm}
                    onPress={async () => {
                        await createRecipe().then();
                    }}>
                    <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.confirm}>
                        <Text style={[styles.textConfirm, {
                            color: '#fff'
                        }]}>Confirmer</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default RecipeForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 8
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 0,
        marginRight: 10,
        marginBottom: 15,
        alignItems: "center"
    },
    input: {
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 3,
        paddingTop: 10,
        padding: 5,
        backgroundColor: '#e7e7e7',
        borderRadius: 5,
    },
    item: {
        height: 50,
        width: 100,
        backgroundColor: '#009387',
        margin: 3,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    item_text: {
        color: '#fff',
        textAlign: "center"
    },
    list_text: {
        color: '#05375a',
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 8
    },
    list: {
        margin: 5,
        borderRadius: 1.41,
        borderColor: '#000',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 1
    },
    confirm: {
        flex: 1,
        flexDirection: "row",
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textConfirm: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
