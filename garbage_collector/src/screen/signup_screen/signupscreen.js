import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';

import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions';
import {StoreUserInfo} from '../../componet/localStorege';

const SignUpScreen = () => {

    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [mobileNumber, setMobileNumber] = useState();

    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const Sigup_Funtion = () => {
        // get data and save into local and redux storeage
        // redirct to auth screen

        if (emailAddress != null) {
            if (password != null) {
                if (name != null) {
                    if (mobileNumber != null) {
                        var user_info = {
                            "name": name,
                            "email": emailAddress,
                            "password": password,
                            "mobile": mobileNumber,
                            "type": "Client"
                        }

                        dispatch(setUserInfo(user_info));
                        StoreUserInfo(user_info);
                        // need to store data in local storage

                        Actions.auth();

                    } else {
                        alert("Plase fill Mobile Number");
                    }
                } else {
                    alert("Plase fill Name");
                }
            } else {
                alert("Plase fill password");
            }
        } else {
            alert("Plase fill Email Address");
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.formHolder}>
                    <View style={styles.tittel_holder}>
                        <Text style={styles.fontMain}>Signup Now</Text>
                    </View>
                    <View style={styles.formRowHolder}>
                        <TextInput style={styles.inputStyle} placeholderTextColor = "#000"  onChangeText={(val) => { setEmailAddress(val) }} placeholder="Enter email address" />
                    </View>
                    <View style={styles.formRowHolder}>
                        <TextInput style={styles.inputStyle} placeholderTextColor = "#000" placeholder="Enter password" onChangeText={(val) => { setPassword(val) }} />
                    </View>
                    <View style={styles.formRowHolder}>
                        <TextInput style={styles.inputStyle} placeholderTextColor = "#000" placeholder="Enter your name" onChangeText={(val) => { setName(val) }} />
                    </View>
                    <View style={styles.formRowHolder}>
                        <TextInput style={styles.inputStyle} placeholderTextColor = "#000" placeholder="Enter mobile number" onChangeText={(val) => { setMobileNumber(val) }} />
                    </View>

                    <TouchableOpacity onPress={Sigup_Funtion}>
                        <View style={[styles.formRowHolder, { backgroundColor: 'blue',alignItems:'center', borderColor:'blue' }]}>
                            <Text style={styles.btnText}>Signup</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    container: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        backgroundColor: '#fff'

    },
    formHolder: {
        width: wp('96%'),
        height: hp('60%'),
        alignItems: 'center',
        justifyContent:'center'

    },
    formRowHolder: {
        width: wp('96%'),
        height: hp('8%'),
        justifyContent:'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 20,
    },
    fontMain: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000'
    },
    tittel_holder : {
        width: wp('96%'),
        height: hp('8%'),
        marginTop : hp('10%'),
        alignItems:'center',
        justifyContent:'center'
    },
    inputStyle : {
        width: wp('90%'),
        height: hp('6%'),
        marginLeft : 20,
        color : '#000'
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    },

});

export default SignUpScreen;