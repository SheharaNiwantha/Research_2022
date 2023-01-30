import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, useDispatch } from 'react-redux';

import { Funtion_Auth } from '../../componet/api_call';

const AuthScreen = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [auth, setAuth] = useState(false);

    const { user } = useSelector(state => state.userReducer);
    const { drivers } = useSelector(state => state.userReducer);

    const AuthFuntion = () => {
        let driver_mail = "abc@gmail.com";
        let driver_pass = "1234";
        //alert(" mail " + email);

        if (!auth) {
            // drivers.map((driv) => {
            //     if (driv.email == email && driv.password == password) {
            //         setAuth(true);
            //         global.driverId = driv.id;
            //         global.driverName = driv.name;
            //         alert("Successfully login as Driver ");
            //         Actions.driverAuthenticate();
            //     }
            // });

            Funtion_Auth(email, password).then((resp) => {
                if (resp.code == "200") {
                    if (resp.responce.code == "200") {
                        setAuth(true);
                        global.driverId = resp.responce.data[0].iddriver;
                        global.driverName = resp.responce.data[0].full_name;
                        alert("Successfully login as Driver ");
                        Actions.driverAuthenticate();
                    } else {
                        if (email == user.email && password == user.password) {
                            setAuth(true);
                            Actions.clientAuthenticate();
                            // alert("Successfully auth");
                        } else {
                            alert("your email or password not match, please try again");
                        }
                    }
                } else {
                    if (email == user.email && password == user.password) {
                        setAuth(true);
                        Actions.clientAuthenticate();
                        // alert("Successfully auth");
                    } else {
                        alert("your email or password not match, please try again");
                    }
                }
            }).catch((err) => {
                console.log("eror " + err);
            });

        }



        // if(!auth){
        //     if (email == user.email && password == user.password) {
        //         setAuth(true);
        //         Actions.clientAuthenticate();
        //        // alert("Successfully auth");
        //     } else {
        //         alert("your email or password not match, please try again");
        //     }
        // }

        // if (driver_mail == email && password == driver_pass) {
        //     //driver login
        //     //naviagtae to driver home
        //     alert("Successfully login as Driver ");
        //     Actions.driverAuthenticate();

        // } else {
        //     //clinet login
        //     // naviagte to client home
        //    // Actions.clientAuthenticate();
        //     if (email == user.email && password == user.password) {
        //         Actions.clientAuthenticate();
        //     } else {
        //         //alert("your email or password not match, please try again");
        //     }
        // }
    }

    const SignUpFuntion = () => {
        Actions.sigup();
    }



    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.mainTitelHolder}>
                    <Text style={styles.fontMain}>Auth Screen</Text>
                </View>
                <View style={styles.holder}>
                    <TextInput style={styles.inputStyle} placeholderTextColor="#000" placeholder="Enter Email Address" onChangeText={(val) => { setEmail(val) }} />
                </View>
                <View style={styles.holder}>
                    <TextInput style={styles.inputStyle} placeholderTextColor="#000" placeholder="Enter Password" secureTextEntry={true} onChangeText={(val) => { setPassword(val) }} />
                </View>
                <View style={[styles.holder, { alignItems: 'center', backgroundColor: 'blue', borderColor: 'blue' }]}>
                    <TouchableOpacity onPress={AuthFuntion}>
                        <View>
                            <Text style={styles.btnText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={SignUpFuntion} >
                        <View>
                            <Text>Signup Now</Text>
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
        alignItems: 'center',
    },
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    holder: {
        width: wp('96%'),
        height: hp('8%'),
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
    },
    mainTitelHolder: {
        width: wp('96%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontMain: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000'
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    },
    inputStyle: {
        width: wp('90%'),
        height: hp('6%'),
        marginLeft: 20,
    }

});

export default AuthScreen;