import React from "react";
import { TouchableOpacity,StyleSheet, View, Text } from "react-native";

const TransparentButton = ({color,title,action}) => {
    return(
        <TouchableOpacity onPress={action}>
            <View style={[styles.button]}>
                <Text style={{color:`${color}`,fontWeight:"bold"}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"rgb(0,0,0,0)",
        justifyContent:"center",
        padding:10,
    },
    
});

export default TransparentButton;