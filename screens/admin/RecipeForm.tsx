import React, {useEffect, useRef} from "react";
import {authContext} from "../../contexts/AuthContext";
import {
    Alert,
    FlatList,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
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

function RecipeForm({navigation}: any) {
    const childRef: any = useRef();
    const {state}: any = React.useContext(authContext);
    const [categories, setCategories]: any = React.useState(null);
    const [ingredients, setIngredients]: any = React.useState(null);
    const [data, setData]: any = React.useState({level: 1});
    const [steps, setSteps]: any = React.useState([{description: null, position: 1}]);
    const [ingredientsRecipe, setIngredientsRecipe]: any = React.useState([]);

    useEffect(() => {
        async function getCategories() {
            setCategories(await Categories.getAll(state.userToken));
        }

        getCategories().then();
    }, [])

    useEffect(() => {
        async function getIngredients(): Promise<any> {
            setIngredients(await Ingredients.getAll(state.userToken));
        }

        getIngredients().then();
    }, [])

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
            <Header canBackward={true} navigation={navigation} title={'Recette'}/>
            <ScrollView>
                <Text style={styles.text_footer}>Titre</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Entrez le titre"
                        style={styles.textInput}
                        value={data.title}
                        onChangeText={(value) => handleData('title', value)}
                    />
                </View>
                <Text style={styles.text_footer}>Catégorie</Text>
                <View style={styles.action}>
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
                <View style={styles.action}>
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
                <View style={styles.action}>
                    <TextInput
                        placeholder="Portions"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={data.servings}
                        onChangeText={(value) => handleData('servings', value)}
                    />
                </View>
                <Text style={styles.text_footer}>Durée</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Durée"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={data.duration}
                        onChangeText={(value) => handleData('duration', value)}
                    />
                </View>
                <Text style={styles.text_footer}>Image</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Image"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={data.image}
                        onChangeText={(value) => handleData('image', value)}
                    />
                </View>
                <View>
                    <Text style={styles.text_footer}>Ingrédients</Text>
                    <TouchableOpacity
                        onPress={() => {
                            childRef.current.handleAddIngredientModal()
                        }}>
                        <Feather name="plus"
                                 color="green"
                                 size={20}/>
                    </TouchableOpacity>
                </View>
                <AddIngredient ref={childRef}/>
                <View style={styles.action}>
                    <SafeAreaView>
                        <FlatList
                            horizontal
                            data={ingredients ? ingredients : null}
                            renderItem={renderItem}
                            keyExtractor={item => item.title}
                        />
                    </SafeAreaView>
                </View>
                {ingredientsRecipe.map((ingredient: any, i: number) => {
                    return (<View key={i} style={styles.action}>
                        <Text>{ingredient.title}</Text>
                        <TextInput
                            placeholder="Quantité"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={ingredient.quantity}
                            onChangeText={(value) => setQuantity(ingredient, value)}/>
                        <TouchableOpacity
                            onPress={() => {
                                removeIngredientRecipe(ingredient)
                            }}>
                            <Feather name="trash-2"
                                     color="red"
                                     size={20}/>
                        </TouchableOpacity>
                    </View>)
                })}
                <View>
                    {steps.map((step: any, i: number) => {
                        return (<View key={i}>
                            <TextInput
                                placeholder={`Description de l'étape ${step.position}`}
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={step.description}
                                onChangeText={(value: string) => {
                                    setDescription(step, value)
                                }}/>
                        </View>)
                    })}
                </View>
                <TouchableHighlight
                    onPress={async () => {
                        await createRecipe().then();
                    }}>
                    <Text>Confirmer</Text>
                </TouchableHighlight>
            </ScrollView>
        </View>
    )
}

export default RecipeForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    info: {
        flexDirection: "row",
        paddingBottom: 10,
    },
    item: {
        height: 50,
        width: 100,
        backgroundColor: '#009387',
        margin: 5,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    item_text: {
        color: '#fff',
        textAlign: "center"
    }
})
