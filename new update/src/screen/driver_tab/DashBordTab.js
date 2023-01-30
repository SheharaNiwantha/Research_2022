import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign';

const PointBanner = ({DriverName, collectWeight}) => {

    return (
        <View style={styles.infoConatiner}>
            <View style={styles.infoholder}>
                <View style={styles.infoholder_row}>
                    <Text style={styles.infoTextLight}>Today</Text>
                    <Text style={styles.infoText}>{global.collectBinCount+" Bins"}</Text>
                </View>
                <View style={styles.infoholder_row}>
                    <Text style={styles.infoTextLight}>This Month</Text>
                    <Text style={styles.infoText}>{global.collectBinCount+" Bins"}</Text>
                </View>
                <View style={styles.infoholder_row}>
                    <Text style={styles.infoTextLight}>Most Proform Driver</Text>
                    <Text style={styles.infoText}>{(global.collectBinCount > 0) ? DriverName : "Not Calcute" }</Text>
                </View>
            </View>
        </View>
    )
}

const ChartView = ({weight}) => {
    const screenWidth = Dimensions.get("window").width;

    const Chartdata = {
        labels: ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov"],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, global.collectBinCount]
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
                yAxisLabel="Bins "
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

const DriverDashBordTab = () => {
    const [pointList, setPointList] = useState([]);
    const [collectTotal, setCollectTotal] = useState(0);
    const [DriverInfo, setDriverInfo] = useState(global.driverName);

    const { trash } = useSelector(state => state.userReducer);

    const { collectingBin } = useSelector(state => state.userReducer);
    const { drivers } = useSelector(state => state.userReducer);


    useEffect(() => {
        //alert("testing");
        //let pointList = trash.filter((trashs) => trashs.weight != "");
        //setPointList(pointList);
        //alert("dt "+JSON.stringify(collectingBin));
        console.log("dt " + JSON.stringify(collectingBin));
        //setCollectTotal
        var tot = 0;
        collectingBin.map((fillBuket) => {
            tot = tot + parseInt(fillBuket.maxLoad);
            drivers.map((singleDriver) => {
                if (singleDriver.id == fillBuket.driverId) {
                    //DriverInfo = singleDriver.name;
                    setDriverInfo(singleDriver.name);
                }
            });
        });
        setCollectTotal(tot);
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.mainHolder}>
                <PointBanner DriverName={DriverInfo} collectWeight={collectTotal} />
                <ChartView weight={collectTotal} />
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
        alignItems: 'flex-end',
        borderRadius: wp('5%'),
        backgroundColor: '#f5f5f5',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    infoConatiner: {
        width: wp('96%'),
        height: hp('40%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2%')
    },
    infoholder: {
        width: wp('94%'),
        height: hp('30%'),
        alignItems: 'center',
    },
    infoholder_row: {
        width: wp('94%'),
        height: hp('10%'),
        alignItems: 'center',
        margin: wp('2%'),
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
});

export default DriverDashBordTab;