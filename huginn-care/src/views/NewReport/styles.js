import { StyleSheet } from 'react-native';
import { blueIcon, greenIcon } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
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
      backgroundColor: '#007AFF',
    },
});