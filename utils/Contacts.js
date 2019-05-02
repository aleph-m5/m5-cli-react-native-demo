import Contacts from 'react-native-contacts';
import { CONST } from '../config';
import AndroidPermissions from './AndroidPermissions';

const appContacts = () => {
    if( CONST.isAndroid ){
        try {
            const READ_CONTACTS = AndroidPermissions("READ_CONTACTS")
            if( READ_CONTACTS.status){
                return Contacts
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    return Contacts
}
export default appContacts()
