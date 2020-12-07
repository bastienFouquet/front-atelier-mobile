import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar, Alert
} from "react-native";
import {authContext} from "../contexts/AuthContext";
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

function SignIn({navigation}: any) {
    let passwordInput: any = null;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [err, setErr] = React.useState({email: false, password: false});

    const {state, signIn}: any = React.useContext(authContext);

    const handleEmail: any = (value: string) => {
        setEmail(value);
        if (value.length > 0) {
            setErr({...err, email: false});
        } else {
            setErr({...err, email: true});
        }
    }

    const handlePassword: any = (value: string) => {
        setPassword(value);
        if (value.length > 0) {
            setErr({...err, password: false})
        } else {
            setErr({...err, password: true});
        }
    }

    const handleSignIn: any = async () => {
        if (email.length > 0 && password.length > 0) {
            await signIn(email, password);
        } else {
            Alert.alert('Champs requis',
                'Vous devez remplir les champs obligatoires afin de vous connecter');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Connexion !</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer]}
            >
                <Text style={[styles.text_footer]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        size={20}
                    />
                    <TextInput
                        placeholder="Votre email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput]}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(value) => handleEmail(value)}
                        keyboardType={"email-address"}
                        returnKeyType={"next"}
                        onSubmitEditing={() => passwordInput.focus()}
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
                        size={20}
                    />
                    <TextInput
                        ref={(input) => passwordInput = input}
                        accessibilityLabel={"password"}
                        placeholder="Votre mot de passe"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        style={[styles.textInput]}
                        value={password}
                        onChangeText={(value) => handlePassword(value)}
                        secureTextEntry={true}
                        returnKeyType={"send"}
                        onSubmitEditing={handleSignIn}
                    />
                </View>
                {!err.password ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Mot de passe requis !</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    {!state.error ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorAuthMsg}>Authentification impossible !</Text>
                        </Animatable.View>
                    }
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={handleSignIn}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Connexion</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Inscription</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default SignIn;

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
        flex: 3,
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    errorAuthMsg: {
        color: '#FF0000',
        fontSize: 15,
        paddingBottom: 10,
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
    }
});
