import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    spinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: winWidth,
        height: winHeight,
        backgroundColor: 'black',
        opacity: 0.7, 
        zIndex: 1
    },
    text: {
        color: 'white',
        margin: 10
    }
});