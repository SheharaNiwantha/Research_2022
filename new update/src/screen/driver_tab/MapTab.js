import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Linking, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 6.9040;
const LONGITUDE = 79.9550;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCMQenuM_etGjUWubVoXE4YaDTHiw9sLhI';


const onReady = ({ result }) => {
    alert("rdey" + result);
}

const onError = ({ errorMessage }) => {
    console.log(errorMessage); // eslint-disable-line no-console
}

const setDistance = (distance, duration_in_traffic) => {
    alert(" distance " + distance);
}

const MapTab = () => {
    const [codinate, setCordinate] = useState(
        [
            {
                latitude: 6.9040,
                longitude: 79.9550,
            },
            {
                latitude: 6.8906,
                longitude: 79.9249,
            },
        ]
    )
    // const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    // const destination = { latitude: 37.771707, longitude: -122.4053769 };

    const { collectingBin } = useSelector(state => state.userReducer);

    useEffect(() => {
        if (collectingBin.length > 0) {
            var lt = codinate;
            collectingBin.map((ino) => {
                // console.log("data "+ino.binLocation[0]);
                // alert("dta "+JSON.stringify(ino.binLocation[0].latitute));
                var c = {
                    latitude: ino.binLocation[0].logitute,
                    longitude: ino.binLocation[0].latitute
                }
                lt.push(c);
            });
            setCordinate(lt);
            console.log("set list " + JSON.stringify(lt));
        }



    }, [codinate]);

    //https://www.google.lk/maps/dir/
    //Kahathuduwa+Interchange,+Southern+Expressway,+Polgasowita/PX7Q%2BQH5+Bandaragama+Junction,+Bandaragama,+Sri+Lanka,+Bandaragama/Panadura/Weediyagoda+Temple,+Gnapola+Rd/@6.7435488,79.9201547,13z/data=!3m1!4b1!4m26!4m25!1m5!1m1!1s0x3ae24e5b5754a563:0xc31e2993d80162b1!2m2!1d79.9804648!2d6.7843134!1m5!1m1!1s0x3ae24923c91dca9b:0xfc9514a559a63a8f!2m2!1d79.9889847!2d6.7143916!1m5!1m1!1s0x3ae24616c169e7c3:0xd21e80c970651d56!2m2!1d79.9074262!2d6.7106361!1m5!1m1!1s0x3ae24ebfb4aa8223:0x9d9896073f8821c5!2m2!1d79.9886791!2d6.751627!3e0

    function openMaps() {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const label = 'Bin';
        var lengths = global.directionList.length;

        if(lengths == 1){
            let latLng = null;
            global.directionList.map((direction)=>{
                 latLng = `${direction.logitute},${direction.latitute}`;
                
            });
            const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`
            });
    
            Linking.openURL(url);

        }else if(lengths == 2){

            let url = `https://maps.google.com/maps?saddr=My+Location&daddr=${global.directionList[0].logitute},${global.directionList[0].latitute}+to:${global.directionList[1].logitute},${global.directionList[1].latitute}&key=AIzaSyAuY6iB9WBika5i8RBzl4ItkvDGOSyvCmQ`;
    
            Linking.openURL(url);
        }else{
            let url = `https://maps.google.com/maps?saddr=My+Location&daddr=${global.directionList[0].logitute},${global.directionList[0].latitute}+to:${global.directionList[1].logitute},${global.directionList[1].latitute}+to:${global.directionList[2].logitute},${global.directionList[2].latitute}&key=AIzaSyAuY6iB9WBika5i8RBzl4ItkvDGOSyvCmQ`;
            Linking.openURL(url);
        }

        
    }

    return (
        <View style={styles.main}>
            <View style={styles.mapHolder}>
                <View style={StyleSheet.absoluteFill}>
                    <MapView
                        initialRegion={{
                            latitude: LATITUDE,
                            longitude: LONGITUDE,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        style={StyleSheet.absoluteFill}
                        onPress={onReady}
                    >
                        {
                            codinate.map((bins) => {
                                return (
                                    <Marker coordinate={bins} />
                                )
                            })
                        }
                        {/* <Marker coordinate={codinate[1]} />
                        <Marker coordinate={codinate[2]} /> */}
                        <MapViewDirections
                            origin={codinate[0]}
                            waypoints={(codinate.length > 2) ? codinate.slice(1, -1) : undefined}
                            destination={codinate[codinate.length - 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="red"
                        />

                    </MapView>
                    <TouchableOpacity style={styles.directionBtn} onPress={() => { openMaps();}}>
                        <View style={styles.directionBtn}>
                            <View style={styles.btnHolder}>
                                <Text style={styles.btnText}>Direction</Text>
                            </View>
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
    mapHolder: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center'
    },
    directionBtn: {
        width: wp('100%'),
        height: hp('6%'),
        position: 'absolute',
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnHolder: {
        width: wp('94%'),
        height: hp('6%'),
        borderRadius: 5,
        backgroundColor: "#5C5CFF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18,
        fontWeight: "300",
        color: '#fff',
    }
});

export default MapTab;