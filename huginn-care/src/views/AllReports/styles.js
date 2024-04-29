import { StyleSheet } from 'react-native';
import { blueIcon, greenGradient, greenIcon, yellowIcon } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    section: {
        paddingTop: 10
    },
    formFrame: {
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        margin: 15,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    title: {
        marginTop: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    paragraph: {
        textAlign: 'center',
        color: 'black'
    },
    button: {
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    reportButton: {
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: greenGradient
    },
    listSection: {
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    listTitle: {
        fontWeight: 'bold'
    },
    oldReportTitle: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    navText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        padding: 10,
        fontWeight: 'bold'
    },
    blueIcon: {
        width: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: blueIcon
    },
    greenIcon: {
        width: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: greenIcon
    },
    yellowIcon: {
        width: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: yellowIcon
    },
    icon: {
        width: 30,
        height: 30
    },
    nextIcon: {
        width: 15,
        height: 15
    }
});