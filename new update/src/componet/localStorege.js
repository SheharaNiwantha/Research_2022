import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreUserInfo = async (userInfo) => {
    try {
        const jsonValue = JSON.stringify(userInfo)
        await AsyncStorage.setItem('UserInfo', jsonValue);
    } catch (error) {
        console.log("error happen save userinfo " + error);
    }
}

const AddTrashInfo = async (trashInfo) => {
    try {
        const jsonValue = JSON.stringify(trashInfo)
        await AsyncStorage.setItem('TrashInfo', jsonValue);
    } catch (error) {
        console.log("error happen save trash Info " + error);
    }
}

export {StoreUserInfo};
export {AddTrashInfo};