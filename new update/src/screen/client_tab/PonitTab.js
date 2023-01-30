import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import {Actions} from 'react-native-router-flux';


const PointView = ({ pointList }) => {
    var todyCount = pointList[pointList.length - 1];
    var total = 0;
    pointList.map((point) => {
        total = total + parseInt(point);
    });

    return (
        <View style={styles.infoConatiner}>
            <View style={styles.infoholder}>
                <View style={styles.infoholder_row}>
                    <Text style={styles.infoTextLight}>Today Ponits</Text>
                    <Text style={styles.infoText}>{todyCount + " Pts"}</Text>
                </View>
                <View style={styles.infoholder_row}>
                    <Text style={styles.infoTextLight}>This Month</Text>
                    <Text style={styles.infoText}>{total + " Pts"}</Text>
                </View>

                {
                    // (total > 100) ?
                        <View style={styles.spinRwo}>
                            <TouchableOpacity onPress={() => { Actions.spinner(); }}>
                                <View style={styles.spinRwoHolder}>
                                    <Text style={styles.spniTest}>Spin</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        // :

                        // null
                }

            </View>
        </View>
    );
}

const RowTile = ({ location, date, ponit }) => {
    return (
        <View style={styles.rowtitle}>
            <View style={styles.rowTileHolder}>
                <View style={styles.rowTileIcons}>
                    <Icon color={'blue'} name={'enviroment'} size={30} />
                </View>
                <View style={styles.rowTileInfo} >
                    <Text style={styles.infoTextR}>{location}</Text>
                    <Text style={styles.infoTextLightR}>{date}</Text>
                </View>
                <View style={styles.rowTilePoint}>
                    <Text style={styles.infoTextLightBlueR}>{`${ponit}` + ' Pts'}</Text>
                </View>
            </View>
        </View>
    );
}


const PointTab = () => {

    //get data from redux and update view
    const { trash } = useSelector(state => state.userReducer);
    const { bin } = useSelector(state => state.userReducer);
    const [ponitList, setPointList] = useState([]);
    const [addInfo, setAddInfo] = useState([]);


    useEffect(() => {
       // let pointListIn = trash.filter((trashs) => trashs.weight != "");
        let pointListIn = [];
        //pointListIn = trash;
        pointListIn = global.pointList;
        //setPointList(pointList);\
        console.log("set valuse "+JSON.stringify(pointListIn));
        var list = [];
        var addlist = [];
        pointListIn.map((ponit) => {
            var p = ponit.point;
            list.push(p);
            bin.map((bins) => {
                if (ponit.binId == bins.binID) {
                    var obj = {
                        "location": bins.binName,
                        "date": ponit.date,
                        "ponit": p
                    }
                    addlist.push(obj);
                }
            });

        });
        console.log("length " + list.length);
        setPointList(list);
        setAddInfo(addlist);
    }, [global.pointList]);

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.container_row_01}>
                    <PointView pointList={ponitList} />
                </View>

                <View style={styles.container_row_02}>
                    <View style={styles.rowTileHoldertest}>
                        <Text style={styles.infoTextR}>Recents Disposal Points</Text>
                    </View>
                    <ScrollView>
                    {
                        addInfo.map((info) => {
                            if(info.ponit != 0){
                                return (
                                    <RowTile location={info.location} date={info.date} ponit={info.ponit} />
                                )
                            }
                            
                        })
                    }
                    </ScrollView>

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
    },
    container_row_01: {
        width: wp('96%'),
        height: hp('50%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    container_row_02: {
        width: wp('96%'),
        height: hp('50%'),
        alignItems: 'center',
    },
    infoConatiner: {
        width: wp('96%'),
        height: hp('40%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoholder: {
        width: wp('94%'),
        height: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoholder_row: {
        width: wp('94%'),
        height: hp('10%'),
        alignItems: 'center',
        margin: wp('2%'),
    },
    spinRwo: {
        width: wp('94%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        margin: wp('2%'),
    },
    spinRwoHolder: {
        width: wp('40%'),
        height: hp('4%'),
        alignItems: 'center',
        justifyContent:'center',
        margin: wp('2%'),
        borderRadius: 20,
        backgroundColor: 'blue'
    },
    infoText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000'

    },
    infoTextLight: {
        fontSize: 22,
        fontWeight: '400',
        color: '#000'

    },
    rowtitle: {
        width: wp('96%'),
        height: hp('10%'),
        alignItems: 'center',
        margin: wp('2%')
    },
    rowTileHolder: {
        width: wp('94%'),
        height: hp('8%'),
        alignItems: 'center',
        flexDirection: 'row'
    },
    rowTileHoldertest: {
        width: wp('94%'),
        height: hp('4%'),
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    rowTileIcons: {
        width: wp('24%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowTileInfo: {
        width: wp('55%'),
        height: hp('6%'),
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    rowTilePoint: {
        width: wp('15%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoTextR: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'

    },
    infoTextLightR: {
        fontSize: 16,
        fontWeight: '400',

    },
    spniTest: {
        fontSize: 18,
        fontWeight: 'bold',
        color : '#fff'

    },
    infoTextLightBlueR: {
        fontSize: 18,
        fontWeight: '400',
        color: 'blue'

    },



});

export default PointTab;