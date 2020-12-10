import React from "react";
import {authContext} from "../../contexts/AuthContext";
import {Text, StyleSheet} from "react-native";


function AddIngredient() {
    const {state}: any = React.useContext(authContext);
    const [data, setData] = React.useState({})

    return (
        <Text>AddIngredient Component</Text>
    )
}

export default AddIngredient;

const styles = StyleSheet.create({

})
