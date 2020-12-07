import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Auth} from "../services/Auth";
import {Users} from "../services/Users";

export const authContext = React.createContext({});

const AuthProvider = ({children}: any) => {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        user: action.user,
                        isLoading: false,
                        error: false
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        user: action.user,
                        error: action.error
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        user: null,
                        error: false
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            user: null,
            error: false
        }
    );
    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let user: any;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                user = await AsyncStorage.getItem('user');
            } catch (e) {
                // Restoring token failed
            }
            dispatch({type: 'RESTORE_TOKEN', token: userToken, user: JSON.parse(user)});
        };

        bootstrapAsync().then();
    }, []);

    const context = React.useMemo(
        () => ({
            signIn: async (email: string, password: string): Promise<void> => {
                try {
                    const connection = await Auth.authByCredentials(email, password);
                    if (connection && connection.token) {
                        await AsyncStorage.setItem('userToken', connection.token);
                        await AsyncStorage.setItem('user', JSON.stringify(connection.user));
                        dispatch({type: 'SIGN_IN', token: connection.token, user: connection.user, error: false});
                    }
                } catch (e) {
                    console.error(e);
                    dispatch({type: 'SIGN_IN', token: null, user: null, error: true})
                    return Promise.reject(e);
                }
            },
            signOut: async (): Promise<void> => {
                try {
                    await AsyncStorage.removeItem('userToken');
                    await AsyncStorage.removeItem('user');
                    dispatch({type: 'SIGN_OUT'});
                    return Promise.resolve();
                } catch (e) {
                    return Promise.reject(e);
                }
            },
            signUp: async (data: any) => {
                try {
                    const user = await Users.register(data);
                    if (user) {
                        dispatch({type: 'SIGN_IN', token: null, user: null, error: false})
                        return user;
                    }
                } catch (e) {
                    console.error(e);
                    dispatch({type: 'SIGN_IN', token: null, user: null, error: true})
                    return Promise.reject(e);
                }
            },
            state
        }),
        [state, dispatch]
    );
    return (
        <authContext.Provider value={context}>
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;
