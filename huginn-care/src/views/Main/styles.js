import { StyleSheet } from 'react-native';
import { grayCircle, greenIcon } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    icon: {
        width: 100,
        height: 100,
        top: 300
    },
    circle: {
        width: 900,
        height: 900,
        borderRadius: 750,
        top: 600,
        left: -150,
        backgroundColor: grayCircle,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        padding: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    button: {
        marginTop: 10,
        padding: 10,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});