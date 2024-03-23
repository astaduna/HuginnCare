import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        margin: 0
    },
    searchInput: {
        marginTop: 20,
        padding: 15,
        borderRadius: 5,
        borderColor: 'gainsboro',
        borderWidth: 2,
        fontSize: 16
    },
    paragraph: {
        margin: 10,
        fontSize: 20,
        color: 'gray'
    },
    table: {
        marginTop: 20
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        padding: 10
    },
    columnHeader: {
        flex: 5,
        fontWeight: 'bold'
    }
});
