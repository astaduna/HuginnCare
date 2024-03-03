import { StyleSheet } from 'react-native';
import { grayCircle, greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    section: {
        width: '100%',
        top: '-20%'
    },
    icon: {
        width: '50%',
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
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: greenBlue
    }
});