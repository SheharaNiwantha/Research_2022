import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {collectBinInfo} from '../../redux/actions';

const NotificationTile = ({ bintitel, binAddress, location, setSelectedObj,obj,dispatch }) => {

    var tempPin = {
        "binName" : obj.binNam,
        "logitute" : obj.binLocation[0].logitute,
        "latitute" : obj.binLocation[0].latitute
      }
    
    var selectOne = {
        "binID": obj.binID,
        "binName": obj.binName,
        "binLocation": obj.binLocation,
        "binStatus": obj.binStatus,
        "binType": obj.binType,
        "maxLoad": obj.maxLoad, //this on kg
        "currentLoad": obj.currentLoad,
        "binAddress": obj.binAddress,
        "driverId" : global.driverId,
    }

    return (
        <View style={styles.notificationHolder}>
            <View style={styles.notificationContainer}>
                <View style={styles.notificationIcon}>
                    <Icon color={'blue'} name={'enviroment'} size={30} />
                </View>
                <View style={styles.notificationInfo}>
                    <View style={styles.notificationTitelHolder}>
                        <Text style={styles.notificationTitelText}>{bintitel + " pending for Collect"}</Text>
                    </View>
                    {/* <View style={styles.notificationDesciptionHolder}>
                        <Text style={styles.notificationSubTitelText}>{binAddress}</Text>
                    </View> */}
                    <View style={styles.notifactionActionHolder}>
                        <View style={styles.actionEmty}>

                        </View>
                        <View style={styles.actionFull}>
                            <TouchableOpacity onPress={() => { alert("press reject") }}>
                                <View style={styles.actionSingle}>
                                    <Text style={styles.rejectText}>Reject</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { global.collectBinCount= global.collectBinCount+1; global.directionList.push(tempPin); setSelectedObj(obj);  dispatch(collectBinInfo(selectOne)); alert("successfully added colleting list, please check on map") }}>
                                <View style={styles.actionSingle}>
                                    <Text style={styles.accpetText}>Accept</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}


const NotificationTab = () => {

    const [notificationList, setNotificationList] = useState([]);
    const [selectObj, setSelectedObj] = useState([]);

    const { bin } = useSelector(state => state.userReducer);


    const { collectingBin } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let binList = bin.filter((bins) => bins.binStatus == 'FULL');
        let notiList = [];
        collectingBin.map((collect)=>{

            binList.map((fullBin)=>{
                if(collect.binID == fullBin.binID){
                    if(collect.driverId == global.driverId){
                        
                    }
                }else{
                    notiList.push(fullBin);
                }
            });

        });
        
        if(collectingBin.length > 0){
            setNotificationList(notiList);
        }else{
            setNotificationList(binList);
        }
        
    }, []);

    useEffect(()=>{
       //dispatch(collectBinInfo(selectObj));
    },[selectObj]);

    return (
        <View style={styles.main}>
            <View style={styles.continer}>
                <View style={styles.notificationTileHolders}>
                    {
                        notificationList.map((collectBin) => {
                            //alert(collectBin.binAddress);
                            return (
                                <NotificationTile obj={collectBin} setSelectedObj={setSelectedObj} bintitel={collectBin.binName} binAddress={collectBin.binAddress} location={collectBin.binLocation} dispatch={dispatch} />
                            )
                        })
                    }
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
    continer: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    notificationHolder: {
        width: wp('94%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
    notificationContainer: {
        width: wp('94%'),
        height: hp('10%'),
        alignItems: 'center',
        flexDirection: 'row'
    },
    notificationIcon: {
        width: wp('20%'),
        height: hp('8%'),
        alignItems: 'center',
    },
    notificationInfo: {
        width: wp('70%'),
        height: hp('8%'),
        alignItems: 'center',
        //backgroundColor:'yellow'
    },
    notificationTitelHolder: {
        width: wp('68%'),
        height: hp('5%'),
        alignItems: 'center',
    },
    notificationDesciptionHolder: {
        width: wp('68%'),
        height: hp('3%'),
        alignItems: 'center',
    },
    notifactionActionHolder: {
        width: wp('62%'),
        height: hp('3%'),
        alignItems: 'center',
        flexDirection: 'row'
    },
    actionEmty: {
        width: wp('32%'),
        height: hp('3%'),
        alignItems: 'center',
    },
    actionFull: {
        width: wp('32%'),
        height: hp('3%'),
        alignItems: 'center',
        flexDirection: 'row'
    },
    actionSingle: {
        width: wp('15%'),
        height: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        flexDirection: 'row'
    },
    notificationTileHolders: {
        width: wp('100%'),
        height: hp('80%'),
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: hp('10%')
    },
    accpetText : {
        fontSize : 16,
        color : 'green',

    },
    rejectText : {
        fontSize : 16,
        color : 'red',
        
    },
    notificationTitelText : {
        fontSize : 16,
        color : '#000',
        fontWeight:'bold'
        
    },
    notificationSubTitelText : {
        fontSize : 12,
        color : '#000',
        
    }
});

export default NotificationTab;