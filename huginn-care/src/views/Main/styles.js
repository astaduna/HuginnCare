import { StyleSheet } from 'react-native';
import { blueIcon, greenIcon } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'start'
    },
    section: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        marginTop: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    paragraph: {
        textAlign: 'center',
        color: 'white'
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
    icon: {
        width: 30,
        height: 30
    },
    nextIcon: {
        width: 15,
        height: 15
    }
});