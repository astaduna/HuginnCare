import { StyleSheet } from 'react-native';
import { grayCircle, greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        backgroundColor: 'white'
    },
    section: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        marginTop: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 750,
        top: -25,
        left: -30,
        backgroundColor: grayCircle,
        alignItems: 'center',
        justifyContent: 'center'

    },
    previousIcon: {
        width: 20,
        height: 20
    }
});