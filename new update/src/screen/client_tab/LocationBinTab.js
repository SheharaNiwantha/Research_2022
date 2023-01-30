import React,{useEffect, useState} from "react";
import {View, StyleSheet, Text, Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LocationBinTab = () => {
    return(
        <View style={styles.main}>
            <View style={styles.holder}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.mpView}
                    region={{
                        latitude: 6.9040,
                        longitude: 79.9550,
                        latitudeDelta: 0.010,
                        longitudeDelta: 0.0050,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 6.9040, longitude: 79.9550 }}
                        title="Malabe Bin 01"
                        description="This bin can fill with plastic and paper"
                    >
                        <Image
                            source={require('../../assert/images/bins.png')}
                            style={{ width: 46, height: 48 }}
                            resizeMode="contain" />
                    </Marker>
                </MapView>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    holder: {
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',

    },
    mpView: {
        height: hp('90%'),
        width: wp('96%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: wp('5%'),
    }
});

export default LocationBinTab;