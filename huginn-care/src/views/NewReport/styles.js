import { StyleSheet } from 'react-native';
import { blueIcon, greenIcon } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'start',
    },
    formFrame: {
        borderBlockColor: 'lightgrey',
        borderWidth: 2,
        borderRadius: 5,
        padding: 20,
        width: '95%',
        margin: 10,
    },
    title: {
        margin: 10,
        alignContent: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    input: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 2,
    },
});