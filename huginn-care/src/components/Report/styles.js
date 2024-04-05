import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        margin: 0
    },
    title: {
        color: 'gray'
    },
    tableRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'gainsboro'
    },
    tableCell: {
        flex: 1,
        padding: 10,
        fontSize: 12
    },
    colorIndicator: {
        margin: 0,
        width: 10,
        height: '100%'
    },
    icon: {
        position: 'relative',
        top: 100
    },
    dropdown: {
        inputIOS: {
            fontSize: 14,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gainsboro',
            borderRadius: 5,
            width: 60
        },
        inputAndroid: {
            fontSize: 14,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gainsboro',
            borderRadius: 5,
            width: 60
        },
        iconContainer: {
            top: 10,
            right: 0
        }
    }
});
