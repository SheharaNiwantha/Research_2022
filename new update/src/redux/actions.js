export const SET_USER_INFO = "SET_USER_INFO";
export const SET_BIN_LOCATION = "SET_BIN_LOCATION";
export const ADD_TRASH_INFO = "ADD_TRASH_INFO";
export const TRASH_INFO = "TRASH_INFO";
export const ADD_COLLECTION_BIN = "ADD_COLLECTION_BIN";
export const CURRENT_BIN_INFOS = "CURRENT_BIN_INFOS";
export const SET_DRIVER_INFO = "SET_DRIVER_INFO";

export const setUserInfo = user => dispatch => {
    dispatch({
        type : SET_USER_INFO,
        payload : user,
    })
}

export const setBinLocation = bin => dispatch => {
    dispatch({
        type : SET_BIN_LOCATION,
        payload : bin
    })
}

export const addTrashInfo = trash => dispatch => {
    dispatch({
        type : ADD_TRASH_INFO,
        payload : trash
    })
}

export const setTrashInfo = trashInfo => dispatch => {
    dispatch({
        type : TRASH_INFO,
        payload : trashInfo
    })
}

export const collectBinInfo = collectingBin => dispatch => {
    dispatch({
        type : ADD_COLLECTION_BIN,
        payload : collectingBin
    })
}

export const setCurrentBinInfos = currentBinWeight => dispatch => {
    dispatch({
        type : CURRENT_BIN_INFOS,
        payload : currentBinWeight
    })
}

export const setDriverInfo = driver => dispatch => {
    dispatch({
        type : SET_DRIVER_INFO,
        payload : driver
    })
}