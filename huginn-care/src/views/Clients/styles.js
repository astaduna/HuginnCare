import { StyleSheet } from 'react-native';
import { darkGray } from '../../styles/colors';

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
    }   
});