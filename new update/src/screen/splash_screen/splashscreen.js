import React,{useEffect, useState} from "react";
import {View, StyleSheet, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {OnConnectClient} from '../../componet/mqtt_info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfo,addTrashInfo} from '../../redux/actions';

import { useSelector, useDispatch } from 'react-redux';
//import {OnConnectClient} from '../../componet/mqtt_info';

const SplashScreen = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        OnConnectClient();
        CheckLocal();
        setTimeout(()=>{
            Actions.auth();
        },2000);
    });

    function CheckLocal () {
        AsyncStorage.getItem('UserInfo').then((user) => {
            if (user != null) {
                var dumy = JSON.parse(user);
                dispatch(setUserInfo(dumy));
            } else {
            }

        });
        AsyncStorage.getItem('TrashInfo').then((trash) => {
            if (user != null) {
                var dumy = JSON.parse(trash);
                dispatch(addTrashInfo(dumy));
            } else {
            }

        });
    }

    return(
        <View style={styles.main}>
            <Text style={styles.mainTitel}>Litter Monitor</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    mainTitel : {
        fontWeight : 'bold',
        fontSize : 25,
        color : 'green'
    }
});

export default SplashScreen;