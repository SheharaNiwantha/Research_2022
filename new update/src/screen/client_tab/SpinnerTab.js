import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WheelOfFortune from '../../componet/WheelOfFortune';
import { useSelector, useDispatch } from 'react-redux';
import { addTrashInfo } from '../../redux/actions';

const SpinnerTab = () => {

    const ref = useRef();

    const { trash } = useSelector(state => state.userReducer);
    const [ponitList, setPointList] = useState([]);
    const dispatch = useDispatch();

    const Patitions = [
        '5% BILL',
        'NO GIFT',
        'SWEET TREAT',
        'NO GIFT',
        'SCHOOL MATE',
        'GO GREEN',
        'NO GIFT',
        'ICY TREAT',
        'BEAUTY CARE'];

    const options = {
        rewards: Patitions,
        knobSize: 30,
        borderWidth: 5,
        borderColor: '#fff',
        innerRadius: 30,
        duration: 4000,
        backgroundColor: 'transparent',
        textAngle: 'horizontal',
        onRef: ref => (this.child = ref),
        //onRef : ref.current,
        knobSource: require('../../assert/images/knob.png')
    }

    function reducePonit() {
        var list = trash;
        var total = 5000; //3
        var temTo = 0;
        var removelist = [];
        console.log("start array" + JSON.stringify(list));

        list.map((ele) => {
            if (total > temTo) {
                temTo = temTo + parseInt(ele.point);
                removelist.push(ele);
            } else {
                console.log("list " + JSON.stringify(list));
                console.log("remove list " + JSON.stringify(removelist));
                var filt = list.filter(itm => !removelist.includes(itm));
                var updat = temTo - total;
                var tt = {
                    "binId": ele.binId,
                    "type": ele.binId,
                    "weight": ele.weight,
                    "date": ele.date,
                    "point": updat,
                }
                filt.push(tt);
                console.log("filter list " + JSON.stringify(filt));
                list = filt;
            }
        });
        setPointList(list);
        global.pointList = list;
        console.log("dispatch list " + JSON.stringify(list));
        dispatch(addTrashInfo(list))

    }

    useEffect(() => {
        let pointListIn = trash.filter((trashs) => trashs.weight != "");
        var list = [];
        pointListIn.map((ponit) => {
            var p = ponit.point;
            list.push(p);
        });
        console.log("length " + list.length);
        console.log("set list "+JSON.stringify(list));
        setPointList(list);
    }, []);

    return (
        <View style={style.main}>
            <View style={style.mainHolder}>
                <View style={style.spinerHolder}>
                    <WheelOfFortune
                        wheelOptions={options}
                        getWinner={(value, index) => {
                            var message = "";
                            switch (value) {
                                case "NO GIFT":
                                    //alert("Sorry you have win anything, please try again later ")
                                    message = "Sorry you have win anything, please try again later";
                                    break;
                                case "5% BILL":
                                   // alert("Congratulations you win 5% discount on total bil")
                                    message = "Congratulations you win 5% discount on total bil";
                                    break;
                                case "SWEET TREAT":
                                    //alert("Congratulations you win (Rs 100) - chocolates & sweets ")
                                    message = "Congratulations you win (Rs 100) - chocolates & sweets ";
                                    break;
                                case "SCHOOL MATE":
                                   // alert("Congratulations you win (Rs 150) - stationary items ")
                                    message = "Congratulations you win (Rs 150) - stationary items ";
                                    break;
                                case "GO GREEN":
                                    //alert("Congratulations you win (Rs 300) - cleaning products and organic products ")
                                    message = "Congratulations you win (Rs 300) - cleaning products and organic products ";
                                    break;
                                case "ICY TREAT":
                                   // alert("Congratulations you win (Rs 250) - ice cream and dairy products ")
                                    message = "Congratulations you win (Rs 250) - ice cream and dairy products ";
                                    break;
                                case "BEAUTY CARE":
                                    //alert("Congratulations you win (Rs 200) - skin care and beauty products")
                                    message = "Congratulations you win (Rs 200) - skin care and beauty products";
                                    break;
                                default:
                                    break;
                            }
                            //alert("winning value " + value);
                            // Actions.clientAuthenticate();
                            //Actions.refresh("clientdashbordtab");
                            Actions.winning({price : message });
                        }}
                    />
                </View>
                <View style={style.spineBtnHolder}>
                    <TouchableOpacity  onPress={() => { 
                        if(global.spinCount == 0){
                            reducePonit(); 
                            this.child._onPress();
                            global.spinCount = 1;
                            //this.child._onPress();
                            //ref._onPress(); 
                            //ref.current._onPress(); 
                        }else{
                            alert("Sorry, Today spin chance alredy over, try again after 24 hours.")
                        }
                        
                        }}>
                        <View style={style.SPinerBtn}>
                            <Text style={style.spinerText}>Spin</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainHolder: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    spinerHolder: {
        width: wp('96%'),
        height: hp('60%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    spineBtnHolder: {
        width: wp('96%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    SPinerBtn: {
        width: wp('60%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderRadius: wp('5%'),

    },
    spinerText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff'
    }

});

export default SpinnerTab;