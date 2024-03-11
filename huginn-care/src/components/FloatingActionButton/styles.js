import { StyleSheet } from 'react-native';
import { greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        bottom: 0, // Adjust based on your navigation bar height
        margin: 20,
        backgroundColor: greenBlue,
        boxShadow: 10,
        borderRadius: 28,
        elevation: 8,
        zIndex: 1 // Make sure the button is on top of other components
    },
    fabIcon: {
        fontSize: 24,
        color: 'white'
    }
});