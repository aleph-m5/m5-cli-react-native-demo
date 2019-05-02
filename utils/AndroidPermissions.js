import { PermissionsAndroid } from 'react-native';

const permissionLists = {
    "READ_CALENDAR": PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
    "WRITE_CALENDAR": PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
    "CAMERA": PermissionsAndroid.PERMISSIONS.CAMERA,
    "READ_CONTACTS": PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    "WRITE_CONTACTS": PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    "GET_ACCOUNTS": PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS,
    "ACCESS_FINE_LOCATION": PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    "ACCESS_COARSE_LOCATION": PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    "RECORD_AUDIO": PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    "READ_PHONE_STATE": PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    "CALL_PHONE": PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    "READ_CALL_LOG": PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    "WRITE_CALL_LOG": PermissionsAndroid.PERMISSIONS.WRITE_CALL_LOG,
    "USE_SIP": PermissionsAndroid.PERMISSIONS.USE_SIP,
    "PROCESS_OUTGOING_CALLS": PermissionsAndroid.PERMISSIONS.PROCESS_OUTGOING_CALLS,
    "BODY_SENSORS": PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
    "SEND_SMS": PermissionsAndroid.PERMISSIONS.SEND_SMS,
    "RECEIVE_SMS": PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    "READ_SMS": PermissionsAndroid.PERMISSIONS.READ_SMS,
    "RECEIVE_WAP_PUSH": PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH,
    "RECEIVE_MMS": PermissionsAndroid.PERMISSIONS.RECEIVE_MMS,
    "READ_EXTERNAL_STORAGE": PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    "WRITE_EXTERNAL_STORAGE": PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
}

export default async (name: string) => {
    if (name) {
        try {
            const granted = await PermissionsAndroid.request(permissionLists[name], {})
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return {
                    status: true,
                    granted: granted
                }
            } else {
                throw {
                    status: false,
                    granted: granted
                }
            }
        } catch (err) {
            throw err
        }
    } else {
        throw {
            status: false,
            msg: "missing name"
        }
    }
}
