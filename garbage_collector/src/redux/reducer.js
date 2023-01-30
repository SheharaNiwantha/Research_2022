import { SET_BIN_LOCATION, SET_USER_INFO, ADD_TRASH_INFO, TRASH_INFO, ADD_COLLECTION_BIN, CURRENT_BIN_INFOS, SET_DRIVER_INFO } from './actions';

const initialState = {
    user: {
        "name": "",
        "email": "",
        "password": "",
        "mobile": "",
        "type": ""

    },
    drivers: [
        {
            "id" : 1,
            "name": "Shehara",
            "email": "abc@gmail.com",
            "password": "1234",
            "mobile": "",
            "type": "Driver"
    
        },
        {
            "id" : 2,
            "name": "Pawani",
            "email": "test@gmail.com",
            "password": "1234",
            "mobile": "",
            "type": "Driver"
    
        }
    ],
    bin: [
        {
            "binID": 1,
            "binName": "Mablabe Collotor bin",
            "binLocation": [{ "logitute": "6.9040", "latitute": "79.9550" }],
            "binStatus": "EMPTY",
            "binType": "",
            "maxLoad": "10", //this on kg
            "currentLoad": "0",
            "binAddress": ""
        },
        {
            "binID": 2,
            "binName": "Plawatte Collotor bin",
            "binLocation": [{ "logitute": "6.8906", "latitute": "79.9249" }],
            "binStatus": "FULL",
            "binType": "",
            "maxLoad": "5", //this on kg
            "currentLoad": "0",
            "binAddress": ""
        },
        {
            "binID": 3,
            "binName": "Baththaramulla Collotor bin",
            "binLocation": [{ "logitute": "6.347700", "latitute": "80.231130" }],
            "binStatus": "FULL",
            "binType": "",
            "maxLoad": "5", //this on kg
            "currentLoad": "0",
            "binAddress": ""
        },
        {
            "binID": 4,
            "binName": "Koswatte Collotor bin",
            "binLocation": [{ "logitute": "6.9079", "latitute": "79.9293" }],
            "binStatus": "FULL",
            "binType": "",
            "maxLoad": "5", //this on kg
            "currentLoad": "0",
            "binAddress": ""
        }
    ],
    collectingBin: [],
    trash: [
        {
            "binId": 1,
            "type": "Plastic",
            "weight": 10.4,
            "date": "2022/10/01",
            "point": 5,

        },
        {
            "binId": 1,
            "type": "Plastic",
            "weight": 10.4,
            "date": "2022/10/01",
            "point": 3,

        }
    ],
    trashInfo: [
        {
            "id": 1,
            "name": "CardBord",
            "ponit": "1",
        },
        {
            "id": 2,
            "name": "Plastic",
            "ponit": "2",
        },
        {
            "id": 3,
            "name": "Glass",
            "ponit": "3",
        },
        {
            "id": 4,
            "name": "Iron",
            "ponit": "5",
        },
        {
            "id": 5,
            "name": "Aluminum",
            "ponit": "4",
        },
        {
            "id": 6,
            "name": "Weast Material",
            "ponit": "0",
        },
    ],
    currentBinWeight : [
        {"weight":0,"level":0,"status":"FULL"}
    ]

}

function userReducer(state = initialState, actions) {
    switch (actions.type) {
        case SET_BIN_LOCATION:
            return { ...state, bin: actions.payload }
        case SET_USER_INFO:
            return { ...state, user: actions.payload }
        case ADD_TRASH_INFO:
            return { ...state, trash: actions.payload }
        case TRASH_INFO:
            return { ...state, trashInfo: actions.payload }
        case ADD_COLLECTION_BIN:
            return { ...state, collectingBin: actions.payload }
        case CURRENT_BIN_INFOS :
            return{...state, setCurrentBinInfos : actions.payload }
        default:
            return state;
    }
}

export default userReducer;