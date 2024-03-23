import { StyleSheet } from 'react-native';
import { darkGray, greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        padding: 15
    },
    section: {
        marginTop: 10,
        marginBottom: 40,
        padding: 20,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    title: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: darkGray
    },
    inputTitle: {
        marginTop: 15,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: darkGray
    },
    paragraph: {
        textAlign: 'center',
        color: 'black'
    },
    buttonSection: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10
    },
    textInput: {
        padding: 15,
        margin: 7,
        borderRadius: 5,
        borderColor: 'gainsboro',
        borderWidth: 2,
        fontSize: 13
    },
    button: {
        padding: 5,
        backgroundColor: greenBlue,
        width: '40%',
        marginLeft: 'auto',
        margin: 10,
        marginTop: 30,
        borderRadius: 5
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    }
});