
import { StyleSheet } from 'react-native';
import { paleCornflowerBlue, stTropaz } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'start'
    },
    detailsContainer: {
        marginTop: 20
    },
    detailItem: {
        marginBottom: 15
    },
    label: {
        fontSize: 18,
        color: paleCornflowerBlue
    },
    paragraph: {
        paddingTop: 5,
        fontSize: 22,
        fontWeight: 'bold',
        color: stTropaz
    },
    text: {
        padding: 15,
        fontSize: 20,
        color: stTropaz
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        fontSize: 20,
        color: stTropaz
    },
    image: {
        borderRadius: 75,
        borderColor: paleCornflowerBlue,
        borderWidth: 3,
        width: 150,
        height: 150
    },
    call: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 5,
        margin: 15,
        borderRadius: 15,
        width: 80
    },
    callPara: {
        color: 'white',
        padding: 5,
        fontSize: 22,
        fontWeight: 'bold'
    },
    callIcon: {
        color: 'white',
        fontSize: 20
    },
    formFrame: {
        borderBlockColor: 'lightgrey',
        borderWidth: 2,
        borderRadius: 5,
        padding: 20,
        width: '95%',
        margin: 10
    },
    title: {
        margin: 10,
        alignContent: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    input: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 2
    }
});
