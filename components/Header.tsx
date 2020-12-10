import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {authContext} from "../contexts/AuthContext";
import Feather from "react-native-vector-icons/Feather";
import Menu, {MenuDivider, MenuItem} from 'react-native-material-menu';


function Header(props: any) {
    const {canBackward, title, navigation} = props;
    const {signOut}: any = React.useContext(authContext);
    let menu: any = null;

    const setMenuRef = (ref: any) => {
        menu = ref;
    }

    const showMenu = () => {
        if (menu) {
            menu.show();
        }
    }

    const handleAlert = (title: string) => {
        menu.hide();
        Alert.alert(title, 'Cette fonctionnalité est encore en développement');
    }

    return (
        <View style={styles.header}>
            {canBackward ? (
                <Feather
                    name="arrow-left"
                    color="#fff"
                    size={25}
                    onPress={() => navigation.goBack()}
                />
            ) : (
                <Feather
                    name="arrow-left"
                    color="#009387"
                    size={25}
                />
            )}
            <Text style={styles.text}>{title}</Text>
            <Menu ref={(ref: any) => setMenuRef(ref)} style={styles.menu}
                  button={<Feather
                      name="more-horizontal"
                      color="#fff"
                      size={25}
                      onPress={() => showMenu()}/>
                  }>
                <MenuItem onPress={() => handleAlert('Profil')}>
                    Profil
                </MenuItem>
                <MenuItem onPress={() => handleAlert('Options')}>
                    Options
                </MenuItem>
                <MenuDivider/>
                <MenuItem onPress={async () => await signOut()}>
                    Déconnexion
                </MenuItem>
            </Menu>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 16,
        backgroundColor: '#009387',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        color: '#fff',
        fontSize: 17
    },
    menu: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: '35%'
    }
})
