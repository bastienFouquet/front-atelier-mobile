import React, {useEffect} from "react";
import {authContext} from "../../contexts/AuthContext";
import {Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import Header from "../../components/Header";
import AddIngredient from "../../components/admin/AddIngredient";
import {Categories} from "../../services/Categories";
import {Ingredients} from "../../services/Ingredients";
import {Picker} from "@react-native-picker/picker";

function RecipeForm({navigation}: any) {
    const {state}: any = React.useContext(authContext);
    const [categories, setCategories]: any = React.useState(null);
    const [ingredients, setIngredients]: any = React.useState(null);
    const [data, setData]: any = React.useState({});
    const steps: any = React.useState([]);
    const ingredientsRecipe: any = React.useState([]);

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

    const addStep = (description: string, position: number) => {
        steps.push({
            description: description,
            position: position
        })
    }

    const addIngredientRecipe = (ingredient: any) => {
        ingredientsRecipe.push(ingredient)
    }

    return (
        <ScrollView>
            <Header canBackward={true} navigation={navigation} title={'Recette'}/>
            <TextInput
                placeholder="Titre"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.title}
                onChangeText={(value) => handleData('title', value)}
            />
            <TextInput
                placeholder="Difficulté"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.level}
                onChangeText={(value) => handleData('level', value)}
            />
            <TextInput
                placeholder="Portions"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.servings}
                onChangeText={(value) => handleData('servings', value)}
            />
            <TextInput
                placeholder="Durée"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.duration}
                onChangeText={(value) => handleData('duration', value)}
            />
            <TextInput
                placeholder="Image"
                style={styles.textInput}
                autoCapitalize="none"
                value={data.image}
                onChangeText={(value) => handleData('image', value)}
            />
            <Picker selectedValue={data.categoryId}
                style={{height: 50, width: 100}}
                onValueChange={(value) =>
                    handleData('categoryId', value)
                }>
                {categories ? (
                    categories.map((category: any, i: number) => {
                        return (<Picker.Item key={i} label={category.name} value={category.id} />)
                    })
                ) : null}
            </Picker>
        </ScrollView>
    )
}

export default RecipeForm;

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
})
