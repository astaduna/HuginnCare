import { StyleSheet } from 'react-native';
import { greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'gainsboro',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: greenBlue // Color when checked
    },
    radioButtonChecked: {
        borderColor: greenBlue // Border color when checked
    }
});
