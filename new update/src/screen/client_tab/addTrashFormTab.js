import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectList from 'react-native-dropdown-select-list';

import { useSelector, useDispatch } from 'react-redux';
import {addTrashInfo} from '../../redux/actions';

import { OnConnectClient, subcribeToTopic, PublishMessage } from '../../componet/mqtt_info';
//import { OnConnectClient } from '../../componet/mqtt_info';
import {AddTrashInfo} from '../../componet/localStorege';

const AddTrashFormTab = ({ ...props }) => {

    const [binID, setBinId] = useState();
    const [trashtype, setTrashType] = useState();
    const [trashList, setTrashList] = useState([]);
    const [binStatus, setBinStatus] = useState();
    const [currentWeight, setCurrentWeight] = useState(global.curretbinInfos.weight); /// device open weight
    const [myPonit, setMyPoint] = useState(0);
    const [currentBin, setCurrentBin] = useState(
        {
            "binID": "",
            "binName": "",
            "binLocation": [{ "logitute": "", "latitute": "" }],
            "binStatus": "",
            "binType": "",
            "maxLoad": "", //this on kg
            "currentLoad": "",
            "binAddress": ""
        }
    );
    const [myweight, setMyWeght] = useState(0);
    const { trashInfo } = useSelector(state => state.userReducer);
    const {trash} = useSelector(state => state.userReducer);
    const { bin } = useSelector(state => state.userReducer);
    const { setCurrentBinInfos } = useSelector(state => state.userReducer);
    

    const dispatch = useDispatch();

    useEffect(() => {

        //OnConnectClient();
        // ConnectToDeive();
        // PublishMessage("testing app");
        //closeBin();
        subcribeToDevice();
        openBin();
        setTimeout(()=>{
            openBin();
        }, 200);
        console.log(" current value after open "+JSON.stringify(global.curretbinInfos));
        var list = [];
        trashInfo.map((item) => {
            var obj = {
                "key": item.id,
                "value": item.name
            }
            list.push(obj);
        });
        setTrashList(list);
        var binId = JSON.parse(props.binID);
        //alert("props " + JSON.stringify(binId));
        console.log("props " + JSON.stringify(binId));
        bin.map((bins) => {
            console.log("bin info "+JSON.stringify(bins));
            if (bins.binID == binId.id) {
                setCurrentBin(bins);
            }
        });

    }, []);

    function openBin() {
       // var openmsg = {cmd:"open"};
        var opne = {cmd:"close"};
       // var openmsg = "open";
        PublishMessage("open");
    }

    function closeBin() {
        // var openmsg = {'cmd':'close'};
       // var openmsg = "close";
        var opne = {cmd:"close"};
        PublishMessage("close");
    }

    function subcribeToDevice() {
        subcribeToTopic();
    }


    function calculatePoint() {
        closeBin();
        console.log(" current value after colse "+JSON.stringify(global.curretbinInfos));
        setTimeout(()=>{
            closeBin();
        }, 200);
       // closeBin();
        // mywight muliply by drop down point 
        // its point show for per kg
        var trashName = "";
         trashList.map((trs)=>{
            if(trs.key == trashtype){
                trashName = trs.value;
            }
        });

        trashInfo.map((item) => {
            //alert("selectd trach" +trashtype);
            if (item.name == trashName) {
                //var itemWight = 10;
                //console.log("current bin "+JSON.stringify(currentBin.binID));
                if(currentWeight <= 0){
                    currentWeight = 0;
                }
                var diff =   global.curretbinInfos.weight - currentWeight;
                //alert("diff "+diff);
                setMyPoint(diff * parseInt(item.ponit));
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = yyyy + '/' + mm + '/' + dd;
                var bt = {
                    "binId": currentBin.binID,
                    "type": trashName,
                    "weight": diff,
                    "date": today,
                    "point": diff * parseInt(item.ponit),

                }
                //console.log("set data "+JSON.stringify(bt));
                //set update ponit - done
                //save local
                //var lt = trash;
                var lt = [];
                //lt = trash;
                lt = global.pointList;
                lt.push(bt);
                global.pointList = lt;
                dispatch(addTrashInfo(lt));
                AddTrashInfo(lt);
                alert("successfully calculate point");
            }
        });
    }

    return (
        <View style={style.main}>
            <View style={style.container}>
                <View style={style.holder}>
                    <View style={style.detailHolder}>
                        <Text style={style.infoLight}>Current Weight</Text>
                        <Text style={style.infoShow}>{currentWeight}</Text>
                    </View>
                    <View style={style.detailHolder}>
                        <Text style={style.infoLight}>Bin Status</Text>
                        <Text style={style.infoShow}>{global.curretbinInfos.status}</Text>
                    </View>
                    <View style={style.detailHolderempty}>
                        {/* <Text style={style.infoLight}>My weight</Text>
                        <Text style={style.infoShow}>{myweight}</Text> */}
                    </View>
                    <View >
                        <SelectList style={style.detailHolder} setSelected={setTrashType} data={trashList} onSelect={() => {}} />
                    </View>

                    <TouchableOpacity onPress={() => { calculatePoint(); }}>
                        <View style={style.scanBtnholder}>
                            <Text style={style.calText}>Calculate point</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={style.detailHolder}>
                        <Text style={style.ponitText}>{myPonit + " pt"}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    container: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    holder: {
        width: wp('96%'),
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('5%'),
    },
    detailHolder: {
        width: wp('94%'),
        height: hp('6%'),
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
    },
    detailHolderempty: {
        width: wp('94%'),
        height: hp('6%'),
        alignItems: 'center',
        marginBottom: 10,
        //borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
    },
    scanBtnholder: {
        width: wp('60%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('5%'),
        backgroundColor: 'blue',
        marginBottom: 30,
        marginTop : 30,
    },
    ponitText: {
        fontWeight: 'bold',
        fontSize: 25,
        color:'#000'

    },
    infoLight: {
        fontWeight: '400',
        fontSize: 16,
        color:'#000'
    },
    infoShow: {
        fontWeight: 'bold',
        fontSize: 20,
        color:'#000'
    },
    calText : {
        fontWeight: 'bold',
        fontSize: 18,
        color:'#fff'
    }
});

export default AddTrashFormTab;
