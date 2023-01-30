
// //import * as mqtt from 'mqtt/dist/mqtt';
// const mqqt = require('mqtt'); //mqtt/dist/mqtt

// const SUBCRIBETOPIC = () => {
//     client.subscribe("/SMARTBIN/58:BF:25:DA:1B:A6/SUB");

// }

// const ClientConnect = () => {
//     const client = mqqt.connect({ port: 1883, host: 'broker.emqx.io' });
//     console.log("call connection");
//     client.publish('/SMARTBIN/58:BF:25:DA:1B:A6/PUB', 'testing');
//     client.on('connect', function () {
//         console.log("connection okey");
        
//         // client.subscribe('/SMARTBIN/58:BF:25:DA:1B:A6/SUB', function (err) {
//         //     if (!err) {
//         //         client.publish('/SMARTBIN/58:BF:25:DA:1B:A6/PUB', 'testing');
//         //     }
//         // })
//     });
// }

// export {ClientConnect};

import { Client, Message } from 'react-native-paho-mqtt';

const myStorage = {
    setItem: (key, item) => {
      myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
      delete myStorage[key];
    },
  };

const client = new Client({uri : 'ws://broker.emqx.io:1883/', clientId:"abc",storage:myStorage});

client.on('connectionLost',(responseObj)=>{
    if (responseObj.errorCode !== 0) {
        console.log(responseObj.errorMessage);
      }
});

client.on('messageReceived',(msg)=>{
    alert("messge "+msg);
    //console.log(msg.payloadString);
});


const ConnectToDeive = () => {

    client.connect().then(()=>{
        console.log('onConnect');
    }).catch((responseObject)=>{
        if (responseObject.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObject.errorMessage);
          }
    });
    
}

const subcribeToDevice = () => {
    client.subscribe('/SMARTBIN/58:BF:25:DA:1B:A6/SUB',{qos : 0}).then((result)=>{
        console.log("result sub "+result);
    }).catch((responseObj)=>{
        if (responseObj.errorCode !== 0) {
            console.log('onConnectionLost:' + responseObj.errorMessage);
          }
    })
}

const publishToDevice = ({messagebody}) => {
    var commnd = {
        "cmd" : "open"
    }
    const _message = new Message(JSON.stringify(commnd));
    //const message = new Message(messagebody);
    _message.destinationName = "/SMARTBIN/58:BF:25:DA:1B:A6/PUB";
    client.send(_message);
}


export {ConnectToDeive};
export {subcribeToDevice};
export {publishToDevice};