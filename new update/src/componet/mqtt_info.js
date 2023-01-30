import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { useSelector, useDispatch } from 'react-redux';
import {setCurrentBinInfos} from '../redux/actions';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {
  }
});
const options = {
  host: 'broker.mqttdashboard.com', // broker.emqx.io //broker.mqttdashboard.com
  port: 8000, //1883 8000 8083
  path: '/mqtt', ///SMARTBIN/58:BF:25:DA:1B:A6/
  id: 'id_' + parseInt(Math.random() * 100000)
};

const client = new Paho.MQTT.Client(options.host, options.port,options.path);



const onConnect = () => {
  console.log('onConnect successful');
}

const onFailer = () => {
  console.log('onConnect failed');
}


const onConnectionLost =(responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}


const onMessageArrived = (message) => {
 // let dispatch = useDispatch();
  console.log("onMessageArrived:" + message.payloadString);
   var obj = JSON.parse(message.payloadString);
  // console.log("dispach value "+JSON.stringify(obj));
  // dispatch(setCurrentBinInfos(obj));
  global.curretbinInfos = obj;

}

const subcribeToTopic = () => {
  var respo = client.subscribe("/SMARTBIN/58:BF:25:DA:1B:A6/SUB", { qos: 0 });
  console.log("sub info " + respo);

}

const PublishMessage = (msg) => {
  //var message = new Paho.MQTT.Message(options.id + ':' + msg);
  //var pubInfo = client.publish("PUB",{qos: 0});
  console.log("command "+msg);
  console.log("data "+(msg == 'open'));
  if(msg == 'open'){
    var opne = {cmd:"open"};
    var pubInfo = client.publish('/SMARTBIN/58:BF:25:DA:1B:A6/PUB',JSON.stringify(opne));
  }else{
    var opne = {cmd:"close"};
    var pubInfo = client.publish('/SMARTBIN/58:BF:25:DA:1B:A6/PUB',JSON.stringify(opne));
  }
  
  //var pubInfo = client.send("/SMARTBIN/58:BF:25:DA:1B:A6/PUB", message, { qos: 0 }); /SMARTBIN/60:01:94:49:C3:98/PUB
  //console.log("publish info " + pubInfo);

}

const OnConnectClient = () => {

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  client.connect({
    onSuccess: onConnect,
    useSSL: false,
    timeout: 3,
    onFailure: onFailer
  });
}

// const OnConnectClient = () => {

//   function onConnect() {
//     console.log("onConnect");
//   }
  
//   function onConnectionLost(responseObject) {
//     if (responseObject.errorCode !== 0) {
//       console.log("onConnectionLost:" + responseObject.errorMessage);
//     }
//   }
  
//   function onMessageArrived(message) {
//     console.log("onMessageArrived:" + message.payloadString);
//   }

//   const client = new Paho.MQTT.Client('broker.emqx.io', 1883, "myclientid_" + parseInt(Math.random() * 100, 10));
//   client.onConnectionLost = onConnectionLost;
//   client.onMessageArrived = onMessageArrived;
//   client.connect({ onSuccess: onConnect, useSSL: false });

//   var openCmd = JSON.stringify({cmd : "open"});
//   client.publish("/SMARTBIN/58:BF:25:DA:1B:A6/PUB",openCmd);

// }


//export {OnConnectClient};
export { OnConnectClient, subcribeToTopic, PublishMessage };

