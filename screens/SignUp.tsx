import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar, Alert
} from "react-native";
import {authContext} from "../contexts/AuthContext";
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

function SignUp({navigation}: any) {
    const {state, signUp}: any = React.useContext(authContext);
    let inputs: any = {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirmationPassword: null
    };
    const [data, setData] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmationPassword: ''
    })
    const [err, setErr] = React.useState({
        firstname: false,
        lastname: false,
        email: false,
        password: false,
        confirmationPassword: false
    })

    const handleAttributes = (key: string, value: string) => {
        setData({
            ...data,
            [key]: value
        })
        if (value.length > 0) {
            setErr({
                ...err,
                [key]: false,
            })
        } else {
            setErr({
                ...err,
                [key]: true,
            })
        }
    }

    const handleSignUp = async () => {
        if (data.email.length > 0 && data.password.length > 0 && data.confirmationPassword.length > 0) {
            if (data.password === data.confirmationPassword) {
                const user = await signUp(data);
                if (user) {
                    Alert.alert('Merci !',
                        'Vous êtes désormais inscrit à Cookit ! Vous pouvez maintenant vous connecter et faire parler vos couteaux !')
                }
            } else {
                Alert.alert('Erreur d\'inscription',
                    'Merci de remplir tous les champs ainsi que de vérifier que la confirmation de mot de passe est correcte');
            }
        } else {
            Alert.alert('Erreur d\'inscription',
                'Merci de remplir tous les champs ainsi que de vérifier que la confirmation de mot de passe est correcte');
        }
    }

    // @ts-ignore
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Inscription !</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <View style={styles.info}>
                        <View style={styles.names} marginRight={'2%'}>
                            <Text style={styles.text_footer}>Nom</Text>
                            <TextInput
                                ref={(input) => inputs.lastname = input}
                                placeholder="Votre nom"
                                style={styles.textInputNames}
                                autoCapitalize="none"
                                value={data.lastname}
                                onChangeText={(value) => handleAttributes('lastname', value)}
                                returnKeyType={"next"}
                                onSubmitEditing={() => inputs.firstname.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.names}>
                            <Text style={styles.text_footer}>Prénom</Text>
                            <TextInput
                                ref={(input) => inputs.firstname = input}
                                placeholder="Votre prénom"
                                style={styles.textInputNames}
                                autoCapitalize="none"
                                value={data.firstname}
                                onChangeText={(value) => handleAttributes('firstname', value)}
                                returnKeyType={"next"}
                                onSubmitEditing={() => inputs.email.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>
                    {!err.lastname ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Nom requis !</Text>
                        </Animatable.View>
                    }
                    {!err.firstname ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Prénom requis !</Text>
                        </Animatable.View>
                    }
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="at"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            ref={(input) => inputs.email = input}
                            placeholder="Votre email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={data.email}
                            onChangeText={(value) => handleAttributes('email', value)}
                            returnKeyType={"next"}
                            onSubmitEditing={() => inputs.password.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    {!err.email ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Adresse email requise !</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Mot de Passe</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            ref={(input) => inputs.password = input}
                            placeholder="Votre mot de passe"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={data.password}
                            onChangeText={(value) => handleAttributes('password', value)}
                            secureTextEntry={true}
                            returnKeyType={"next"}
                            onSubmitEditing={() => inputs.confirmationPassword.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    {!err.password ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Mot de passe requis !</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Confirmation</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            ref={(input) => inputs.confirmationPassword = input}
                            placeholder="Confirmez votre mot de passe"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={data.confirmationPassword}
                            onChangeText={(value) => handleAttributes('confirmationPassword', value)}
                            secureTextEntry={true}
                            returnKeyType={"send"}
                            onSubmitEditing={handleSignUp}
                            blurOnSubmit={false}
                        />
                    </View>
                    {!err.confirmationPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Confirmation requise !</Text>
                        </Animatable.View>
                    }
                    <View style={styles.button}>
                        {!state.error ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorSignUpMsg}>Inscription impossible !</Text>
                            </Animatable.View>
                        }
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={handleSignUp}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Inscription</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Connexion</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
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
    names: {
        flex: 1,
        flexDirection: "column",
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    textInputNames: {
        flex: 1,
        marginTop: 0,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    errorSignUpMsg: {
        color: '#FF0000',
        fontSize: 15,
        paddingBottom: 10,
    },
});
