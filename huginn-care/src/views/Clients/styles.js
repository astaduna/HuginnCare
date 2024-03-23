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
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 10
    },
    title: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: darkGray
    },
    inputTitle: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: darkGray
    },
    paragraph: {
        textAlign: 'center',
        color: 'black'
    },
    modal: {
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    select: {
        padding: 15,
        margin: 7,
        borderRadius: 5,
        color: 'red',
        borderWidth: 2,
        fontSize: 100
    },
    button: {
        padding: 5,
        backgroundColor: greenBlue,
        width: '40%',
        marginLeft: 'auto',
        margin: 10,
        marginTop: 30
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'gainsboro',
        borderRadius: 4,
        paddingRight: 30, // to ensure the text is never behind the icon
        marginTop: 10
    },
    dropdown: {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 2,
            borderColor: 'gainsboro',
            borderRadius: 4,
            paddingRight: 30, // to ensure the text is never behind the icon
            marginTop: 10
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 2,
            borderColor: 'gainsboro',
            borderRadius: 8,
            paddingRight: 30, // to ensure the text is never behind the icon
            marginTop: 10
        }
    }
        
});