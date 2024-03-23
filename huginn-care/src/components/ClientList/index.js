import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Client from '../Client';

const ClientList = ({ clients }) => {
    const [searchFilter, setSearchFilter] = useState('');
    const [clientColors, setClientColors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const pageOptions = [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '25', value: '25' },
        { label: '50', value: '50' },
        { label: '100', value: '100' }
    ];

    const orderOptions = [
        { label: 'Nafn A-Ö', value: 'Nafn A-Ö' },
        { label: 'Nafn Ö-A', value: 'Nafn Ö-A' },
        { label: 'Deild A-Ö', value: 'Deild A-Ö' },
        { label: 'Deild Ö-A', value: 'Deild Ö-A' }
    ];

    const departmentOptions = [
        { label: 'Allar Deildir', value: 'Allar Deildir' },
        { label: 'Fakedeild 1', value: 'Fakedeild 1' },
        { label: 'Fakedeild 2', value: 'Fakedeild 2' },
        { label: 'Fakedeild 3', value: 'Fakedeild 3' }
    ];

    const [pageValue, setPageValue] = useState(pageOptions[0].value);
    const [orderValue, setOrderValue] = useState(orderOptions[0].value);
    const [departmentValue, setDepartmentValue] = useState(departmentOptions[0].value);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilter, orderValue, departmentValue, pageValue]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredClients = clients
        .sort((a, b) => {
            if (orderValue === 'Nafn A-Ö') {
                return a.nafn.localeCompare(b.nafn);
            } else if (orderValue === 'Nafn Ö-A') {
                return b.nafn.localeCompare(a.nafn);
            } else if (orderValue === 'Deild A-Ö') {
                return a.deild.localeCompare(b.deild);
            } else if (orderValue === 'Deild Ö-A') {
                return b.deild.localeCompare(a.deild);
            }
            return a.nafn.localeCompare(b.nafn);
        })
        .filter(client =>
            client.nafn.toLowerCase().includes(searchFilter.toLowerCase()) ||
            client.kennitala.includes(searchFilter)
        )
        .filter(client =>
            departmentValue === 'Allar Deildir' || departmentValue === null || client.deild === departmentValue
        );

    const startIndex = (currentPage - 1) * parseInt(pageValue);
    const endIndex = startIndex + parseInt(pageValue);
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    const handleColorChange = (clientName, color) => {
        setClientColors({
            ...clientColors,
            [clientName]: color
        });
    };

    const totalPages = Math.ceil(filteredClients.length / pageValue);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.inputTitle}>Fjöldi á síðu</Text>
                <RNPickerSelect
                    style={styles.dropdown}
                    placeholder={{ label: '...', value: '2' }}
                    items={pageOptions}
                    onValueChange={(value) => setPageValue(value)}
                    value={pageValue}
                    Icon={() => {
                        return <FontAwesome name='chevron-down' size={12} color='gray' />;
                    }}
                />
            </View>
            <View>
                <Text style={styles.inputTitle}>Raða eftir</Text>
                <RNPickerSelect
                    style={styles.dropdown}
                    placeholder={{ label: '...', value: null }}
                    items={orderOptions}
                    onValueChange={(value) => setOrderValue(value)}
                    value={orderValue}
                    Icon={() => {
                        return <FontAwesome name='chevron-down' size={12} color='gray' />;
                    }}
                />
                <RNPickerSelect
                    style={styles.dropdown}
                    placeholder={{ label: '...', value: null }}
                    items={departmentOptions}
                    onValueChange={(value) => setDepartmentValue(value)}
                    value={departmentValue}
                    Icon={() => {
                        return <FontAwesome name='chevron-down' size={12} color='gray' />;
                    }}
                />
            </View>
            <Text style={styles.inputTitle}>Leita</Text>
            <TextInput
                style={styles.searchInput}
                placeholder='Leita eftir nafni eða kennitölu'
                value={searchFilter}
                onChangeText={text => setSearchFilter(text)}
            />
            {clients.length === 0
                ? (
                    <Text style={styles.paragraph}>...</Text>
                )
                : paginatedClients.length > 0
                    ? (
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.columnHeader, { flex: 0.5 }]}> </Text>
                                <Text style={styles.columnHeader}>Nafn</Text>
                                <Text style={styles.columnHeader}>Kennitala</Text>
                                <Text style={styles.columnHeader}>Deild/ir</Text>
                                <Text style={styles.columnHeader}>Litur</Text>
                                <Text style={[styles.columnHeader, { flex: 0.5 }]}> </Text>
                            </View>
                            {paginatedClients.map(c => (
                                <Client
                                    key={c.nafn}
                                    {...c}
                                    color={clientColors[c.nafn]}
                                    onColorChange={color => handleColorChange(c.nafn, color)}
                                />
                            ))}
                            <View style={styles.pagination}>
                                <TouchableOpacity
                                    style={styles.paginationButton}
                                    onPress={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    <FontAwesome name='chevron-left' size={18} color={currentPage === 1 ? 'gainsboro' : 'black'} />
                                </TouchableOpacity>
                                {pageNumbers.map((number) => (
                                    <TouchableOpacity
                                        key={number}
                                        style={[
                                            styles.paginationButton,
                                            currentPage === number && styles.paginationButtonActive
                                        ]}
                                        onPress={() => handlePageChange(number)}
                                    >
                                        <Text style={styles.paginationText}>{number}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity
                                    style={styles.paginationButton}
                                    onPress={handleNextPage}
                                    disabled={paginatedClients.length < pageValue || currentPage === totalPages}
                                >
                                    <FontAwesome name='chevron-right' size={18} color={currentPage === totalPages ? 'gainsboro' : 'black'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    : (
                        <Text style={styles.paragraph}>...</Text>
                    )}
        </View>
    );
};

export default ClientList;
