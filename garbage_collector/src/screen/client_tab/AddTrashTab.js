import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Modal from "react-native-modal";

import SelectList from 'react-native-dropdown-select-list';
import { useSelector, useDispatch } from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {OnConnectClient} from '../../componet/mqtt_info';

const SelectGrbageType = ({setTrashType,trashList}) => {

    return (
        <View style={styles.modelHolder}>
            <Modal isVisible={true}>
                <View style={style.holder}>
                    <View style={style.detailHolder}>
                        <Text>Current Weight</Text>
                    </View>
                    <View style={style.detailHolder}>
                        <Text>Bin Status</Text>
                    </View>
                    <View style={style.detailHolder}>
                        <Text>My weight</Text>
                    </View>
                    <View>
                        <SelectList setSelected={setTrashType} data={trashList} onSelect={() => alert(trashtype)} />
                    </View>

                    <View style={style.detailHolder}>
                        <Text>Calculate point</Text>
                    </View>
                    <View style={style.detailHolder}>
                        <Text>10 pt</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const AddTrashTab = () => {

    const [startScan, setStartScan] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [trashtype , setTrashType] = useState();

    const { trashInfo } = useSelector(state => state.userReducer);

    useEffect(()=>{
        //setTrashList(trashInfo);
    },[]);

    const ScanNow = () => {
        setStartScan(!startScan);
    }

    const BarcodeRecognize = ({ Barcode }) => {
        alert("methods " + Barcode);
        Barcode.forEach(barcode => console.warn(barcode.data));
    }

    function callingDeiveAPI (jsonValue) {
       // OnConnectClient();
        Actions.trashForm({binID : jsonValue});
    }

    return (
        <View style={styles.main}>
            <View style={styles.containers}>
                {
                    (startScan) ?
                        <View style={styles.camraView}>
                            {/* camra view */}
                            {/* <RNCamera
                               // ref={ref => { this.camara = ref }}
                                style={{ flex: 1, width: '100%' }}
                                onGoogleVisionBarcodesDetected={BarcodeRecognize}
                                
                            >

                            </RNCamera> */}
                            <QRCodeScanner
                                reactivate={true}
                                showMarker={true}
                                onRead ={(e)=>{
                                    const check = e.data;
                                    var dt = JSON.stringify(JSON.parse(e.data));
                                    callingDeiveAPI(dt);
                                    console.log("dats" +JSON.stringify(JSON.parse(e.data)));
                                    //alert("dta "+check);
                                }}
                                style={{ flex: 1, width: '100%' }}
                            />
                        </View>

                        :

                        <View style={styles.scanBtnView}>
                            <TouchableOpacity onPress={ScanNow}>
                                <View style={styles.scanBtnholder}>
                                    <Text style={styles.btnText}>Scan Now</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                }
            </View>

        </View >
    )

}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    containers: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    scanBtnView: {
        width: wp('96%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    scanBtnholder: {
        width: wp('60%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('5%'),
        backgroundColor: 'blue'
    },
    btnText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff'
    },
    camraView: {
        width: wp('96%'),
        height: hp('90%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modelHolder: {
        width: wp('96%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    holder: {
        width: wp('96%'),
        height: hp('28%'),
        alignItems: 'center',
        marginTop: hp('5%'),
    },
    detailHolder: {
        width: wp('94%'),
        height: hp('6%'),
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
    }

});

export default AddTrashTab;