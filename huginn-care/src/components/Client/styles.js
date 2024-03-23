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
        padding: 10
    },
    colorIndicator: {
        margin: 0,
        width: 10,
        height: '100%'
    },
    dropdown: {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gainsboro',
            borderRadius: 5
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: 'gainsboro',
            borderRadius: 5
        },
        iconContainer: {
            top: 10,
            right: 12
        }
    }
});
