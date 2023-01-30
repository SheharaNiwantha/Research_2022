import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign';
import { subcribeToTopic } from '../../componet/mqtt_info';

const PonitTile = () => {
    return (
        <View style={styles.pointHolder}>
            <View style={styles.pointRowContainer}>
                <View style={styles.pointIconHolder}>
                    {/* icon view */}
                    <Icon color={'blue'} name={'delete'} size={30} />
                </View>
                <View style={styles.ponitDetailsHodler}>
                    {/* location and date */}
                    <View>
                        <Text>Colombo</Text>
                    </View>
                    <View>
                        <Text>2022/09/29</Text>
                    </View>
                </View>
                <View style={styles.ponitMarksHodler}>
                    {/* point view */}
                    <Text>4.5 pt</Text>
                </View>
            </View>
        </View>
    )
}

const ChartView = ({pointLists}) => {
    const screenWidth = Dimensions.get("window").width;
    const Chartdata = {
        labels: ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov"],
        datasets: [
            {
                // data: [20, 45, 28, 80, 99, 43, 50, 34, 12, 5]
                data : pointLists
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        barPercentage: 0.7,
        fillShadowGradient: `rgba(1, 122, 205, 1)`,
        fillShadowGradientOpacity: 1,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
        propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: "#e3e3e3",
            strokeDasharray: "0",
        },
    };

    return (
        <View style={styles.chartView}>
            <BarChart
                data={Chartdata}
                width={wp('96%')}
                height={300}
                yAxisLabel="Pts "
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}

            />
        </View>
    )
}


const PointBanner = ({pointList}) => {
    var todyCount = global.pointList[global.pointList.length - 1];
    var total = 0;
    global.pointList.map((point)=>{
     total = total + parseInt(point.point);
    });

    useEffect(()=>{
        //alert("update");
    },[global.pointList]);

    return (
        <View style={styles.infoConatiner}>
            <View style={styles.infoholder}>
                <View style={styles.infoholder_row}>
                    <Text style={styles.infoTextLight}>Today</Text>
                    <Text style={styles.infoText}>{todyCount.point+" Pts"}</Text>
                </View>
                <View style={styles.infoholder_row}>
                    <Text style={styles.infoTextLight}>This Month</Text>
                    <Text style={styles.infoText}>{total+" Pts"}</Text>
                </View>
            </View>
        </View>
    )
}

const ClientDashbordTab = () => {

    const [pointList, setPointList] = useState([]);

    const { trash } = useSelector(state => state.userReducer);
    const { trashInfo } = useSelector(state => state.userReducer);

    useEffect(() => {
        console.log("info "+JSON.stringify(trash));
        //let pointListIn = trash.filter((trashs) => trashs.weight != "");
        let pointListIn = global.pointList.filter((trashs) => trashs.weight != "");
        //setPointList(pointList);
        var list = [];
        pointListIn.map((ponit)=>{
            var p = ponit.point;
            list.push(p);
        });
        console.log("length "+list.length);
        setPointList(list);
       // subcribeToTopic();
    },[]);

    return (
        <View style={styles.main}>
            <View style={styles.mainHolder}>
                <PointBanner pointList={pointList}/>
                <ChartView pointLists={pointList} />
                {/* <PonitTile /> */}
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
    mainHolder: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    pointHolder: {
        width: wp('96%'),
        height: hp('10%'),
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000',
        marginBottom: 5,
    },
    pointRowContainer: {
        width: wp('96%'),
        height: hp('8%'),
        alignItems: 'center',
        flexDirection: 'row',
    },
    pointIconHolder: {
        width: wp('26%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    ponitDetailsHodler: {
        width: wp('50%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    ponitMarksHodler: {
        width: wp('20%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    chartView: {
        width: wp('96%'),
        height: hp('40%'),
        alignItems: 'center',
        borderRadius: wp('5%'),
        backgroundColor: '#f5f5f5',
        marginTop:hp('2%'),
        marginBottom:hp('2%'),
    },
    infoConatiner : {
        width: wp('96%'),
        height: hp('40%'),
        alignItems: 'center',
        justifyContent : 'center',
        marginTop:hp('2%')
    },
    infoholder : {
        width: wp('94%'),
        height: hp('30%'),
        alignItems: 'center',
    },
    infoholder_row : {
        width: wp('94%'),
        height: hp('10%'),
        alignItems: 'center',
        margin : wp('2%'),
    },
    infoText : {
        fontSize:35,
        fontWeight:'bold',
        color : '#000'

    },
    infoTextLight : {
        fontSize:22,
        fontWeight:'400',
        color : '#000'
        
    },
});

export default ClientDashbordTab;