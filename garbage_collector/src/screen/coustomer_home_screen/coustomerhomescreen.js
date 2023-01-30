import React,{useEffect, useState} from "react";
import {View, StyleSheet, Text} from 'react-native';

const CoustomerDashBordScreen = () => {
    return(
        <View style={styles.main}>
            <Text>Coustomer DashBord Screen</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        backgroundColor:'#fff',
        alignItems:'center'
    }
});

export default CoustomerDashBordScreen;