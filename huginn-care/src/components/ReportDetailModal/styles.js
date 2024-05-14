import { StyleSheet } from 'react-native';
import { greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    detailsContainer: {
        marginTop: 20
    },
    formFrame: {
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 15,
        padding: 20,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    title: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#797979'
    },
    titleWrapper: {
        borderBottomWidth: 2,
        borderBottomColor: 'gainsboro'
    },
    inputTitle: {
        marginTop: 15,
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#797979'
    },
    paragraph: {
        marginTop: 15,
        marginLeft: 10,
        fontSize: 14,
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
    textInput: {
        padding: 15,
        margin: 7,
        borderRadius: 5,
        borderColor: 'gainsboro',
        borderWidth: 2,
        fontSize: 13,
        height: 100
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
        marginBottom: 435
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
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
        backgroundColor: 'white',
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gainsboro'
    },
    jumpLinkText: {
        color: 'gray',
        fontSize: 16
    },
    selectedJumpLinkButton: {
        borderBottomWidth: 3,
        marginBottom: -5,
        borderBottomColor: greenBlue
    },
    selectedJumpLinkText: {
        fontWeight: 'bold',
        color: 'black'
    },
    important: {
        flexDirection: 'row'
    },
    checkBox: {
        marginVertical: 15,
        marginLeft: 20,
        color: 'gainsboro'
    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 25,
        marginRight: 15,
        right: 0
    },
    editButton: {
        width: '20%',
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: 'gold',
        borderRadius: 5
    },
    deleteButton: {
        width: '20%',
        padding: 10,
        backgroundColor: 'crimson',
        borderRadius: 5
    },
    saveButton: {
        width: '20%',
        padding: 10,
        backgroundColor: greenBlue,
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
});