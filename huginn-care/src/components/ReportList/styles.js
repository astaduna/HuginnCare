import { StyleSheet } from 'react-native';
import { darkGray, greenBlue } from '../../styles/colors';

export default StyleSheet.create({
    container: {
        margin: 0
    },
    searchInput: {
        marginTop: 10,
        padding: 15,
        borderRadius: 5,
        borderColor: 'gainsboro',
        borderWidth: 2,
        fontSize: 16
    },
    paragraph: {
        margin: 10,
        fontSize: 16
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
        fontWeight: 'bold',
        color: 'gray'
    },
    inputTitle: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: darkGray
    },
    searchTitle: {
        marginTop: 30,
        fontSize: 16,
        fontWeight: 'bold',
        color: darkGray
    },
    calendar: {
        width: '70%'
    },
    select: {
        padding: 15,
        margin: 7,
        borderRadius: 5,
        color: 'red',
        borderWidth: 2,
        fontSize: 100
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
        textAlign: 'center'
    },
    calendarBorder: {
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'gainsboro',
        paddingVertical: 6
    },
    textInput: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'gainsboro',
        borderRadius: 4,
        paddingRight: 30,
        marginTop: 10
    },
    dropdown: {
        inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 2,
            borderColor: 'gainsboro',
            borderRadius: 4,
            paddingRight: 30,
            marginTop: 10
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 2,
            borderColor: 'gainsboro',
            borderRadius: 8,
            paddingRight: 30,
            marginTop: 10
        },
        iconContainer: {
            top: 30,
            right: 10
        }
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    paginationButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gainsboro',
        marginHorizontal: 5
    },
    paginationButtonActive: {
        backgroundColor: greenBlue
    },
    paginationText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
