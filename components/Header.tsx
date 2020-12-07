import React from "react";
import {Text} from "react-native";

function Header(props: any) {
    return (
        <Text>{props.name}</Text>
    )
}

export default Header;
