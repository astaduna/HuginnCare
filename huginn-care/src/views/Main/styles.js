import { StyleSheet } from 'react-native';
import { whiteBackground } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: whiteBackground,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    paragraph: {
        textAlign: 'center',
        color: 'black'
    },
    button: {
        marginTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: 'white',
        borderWidth: 2
    },
    buttonText: {
        color: 'white'
    },
    logo: {
        width: 200,
        height: 200
    }
});