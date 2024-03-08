import { StyleSheet } from 'react-native';
import { grayCircle, greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    section: {
        width: '100%',
        top: '-15%'
    },
    icon: {
        width: '50%',
        top: 350
    },
    circle: {
        width: 900,
        height: 900,
        borderRadius: 750,
        top: 600,
        left: -150,
        backgroundColor: grayCircle,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32
    },
    paragraph: {
        fontSize: 17,
        marginTop: 10,
        marginBottom: 40
    },
    buttonText: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    button: {
        marginTop: 10,
        paddingTop: 20,
        borderRadius: 7,
        backgroundColor: greenBlue
    }
});