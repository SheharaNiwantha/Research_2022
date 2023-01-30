import React, { useEffect, useState, Ref } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WinningInfo = ({...props}) => {
    useEffect(()=>{
        //alert("param "+JSON.stringify(props.price));
    },[]);


    return(
        <View style={style.main}>
            <View style={style.winningHolder}>
                <View style={style.winningContainer}>
                        <Text style={style.winingText}>{props.price}</Text>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main : {
        flex : 1,
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor : '#fff'
    },
    winningHolder : {
        width : wp('100%'),
        height : hp('20%'),
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor : '#fff'
    },
    winningContainer : {
        width : wp('94%'),
        height : hp('15%'),
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor : '#fff'
    },
    winingText : {
        fontSize:21,
        fontWeight:'700',
        color : '#000',
        textAlign : 'center'
    }
});

export default WinningInfo;