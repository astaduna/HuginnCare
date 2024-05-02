import { Platform, StyleSheet } from 'react-native';
import { grayCircle, greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignContent: 'flex-start',
        backgroundColor: 'white'
    },
    title: {
        marginTop: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'flex-start'
    },
    circle: {
        width: 130,
        height: 130,
        borderRadius: 750,
        top: (Platform.OS === 'ios') ? -55 : -20,
        left: -20,
        backgroundColor: grayCircle,
        alignItems: 'center',
        justifyContent: 'center'

    },
    previousIcon: {
        width: 20,
        height: 20
    }
});