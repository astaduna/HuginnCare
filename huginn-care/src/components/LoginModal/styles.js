import { StyleSheet } from 'react-native';
import { grayCircle, greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        padding: 15
    },
    section: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        marginTop: 15,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
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
    },
    button: {
        padding: 20,
        top: 83,
        backgroundColor: greenBlue
    },
    disabledButton: {
        padding: 20,
        top: 83,
        backgroundColor: 'gainsboro'
    },
    buttonText: {
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        padding: 15,
        margin: 7,
        borderRadius: 5,
        borderColor: 'gainsboro',
        borderWidth: 2,
        fontSize: 13
    }
});