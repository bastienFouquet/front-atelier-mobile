import React, {useEffect} from "react";
import {authContext} from "../contexts/AuthContext";
import {Text, View, StyleSheet} from "react-native";
import Header from "../components/Header";
import {Recipe} from '../services/Recipe';

function HomeScreen() {
    const {state}: any = React.useContext(authContext);
    const [recipes, setRecipes] = React.useState([]);
    useEffect(() => {
        async function getRecipes() {
            setRecipes(await Recipe.getAll(state.userToken));
        }
        getRecipes().then();
    });

    return (
        <View>
            <Header/>
            {recipes.map((recipe)=> {
                return(
                    <View style={styles.recipe}>
                        <Text>{recipe.title}</Text>
                        <Text>Pour {recipe.servings} personnes</Text>
                        <Text>{recipe.category.name}</Text>
                        <Text>{recipe.user.firstname+" "+recipe.user.lastname}</Text>
                    </View>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    recipe: {
        height: 130,
        margin: 10,
        padding: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    }
});
export default HomeScreen;
