import { StyleSheet } from 'react-native';
import { blueIcon, greenBlue, greenIcon } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        padding: 15,
        marginTop: 30
    },
    formFrame: {
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    title: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#797979'
    },
    inputTitle: {
        marginTop: 15,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#797979'
    },
    input: {
        padding: 15,
        margin: 7,
        borderRadius: 5,
        borderColor: 'gainsboro',
        borderWidth: 2,
        fontSize: 13
    },
    radioInput: {
        padding: 15,
        margin: 7,
        borderRadius: 5,
        borderColor: 'gainsboro',
        borderWidth: 2,
        fontSize: 13,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioButtons: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-around'
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF'
    },
    greenBorder: {
        borderColor: greenBlue // Green border color
    },
    lastFormFrame: {
        marginBottom: 500
    },
    section: {
        height: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
        top: 0
    },
    jumpLinks: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: '#f6f6f6f',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        zIndex: 100,
        borderBottomWidth: 1,
        borderBottomColor: 'gainsboro'
    },
    activeLink: {
        borderBottomWidth: 10,
        borderBottomColor: 'red'
    }
});