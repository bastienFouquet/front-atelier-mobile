import React, {forwardRef, useContext, useImperativeHandle, useState} from "react";
import {Modal, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {Ingredients} from "../services/Ingredients";
import {authContext} from "../contexts/AuthContext";

const AddIngredient = forwardRef((props, ref) => {
    const {state}: any = useContext(authContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle]: any = useState(null);
    const [ingredient, setIngredient]: any = useState({});

    useImperativeHandle(ref, () => ({
            handleAddIngredientModal() {
                setModalVisible(!modalVisible)
            }
        }),
    )

    const addIngredient = async () => {
        const ingredient = await Ingredients.create(state.userToken, title);
        if (ingredient) {
            setIngredient(ingredient);
            setModalVisible(!modalVisible);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Ajout d'un ingrédient</Text>
                    <TextInput
                        placeholder="Nom de l'ingrédient"
                        autoCapitalize="none"
                        style={{paddingBottom: 40, paddingTop: 20}}
                        value={title}
                        onChangeText={(value) => setTitle(value)}/>
                    <TouchableHighlight
                        style={{...styles.openButton, backgroundColor: "#009387"}}
                        onPress={async () => {
                            await addIngredient()
                        }}
                    >
                        <Text style={styles.textStyle}>Ajouter</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
})

export default AddIngredient;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 40,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18
    }
});
