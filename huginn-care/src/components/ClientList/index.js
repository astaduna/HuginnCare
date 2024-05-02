import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { getAllDepartments } from '../../services/departmentService';
import Client from '../Client';
import { departmentOptionsB, orderOptions, pageOptions, userOptionsB } from '../Options';
import departmentsJson from '../../resources/departments.json';

const ClientList = ({ clients }) => {
    const [departments, setDepartments] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [clientColors, setClientColors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const [pageValue, setPageValue] = useState(pageOptions[0].value);
    const [orderValue, setOrderValue] = useState(orderOptions[0].value);
    const [departmentValue, setDepartmentValue] = useState(departmentOptionsB(departments)[0].value);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilter, orderValue, departmentValue, pageValue]);

    useEffect(() => {
        (async () => {
            // setDepartments(await getAllDepartments() || []);
            setDepartments(departmentsJson);
        })();
    }, [departmentValue]);

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
                return a.name.localeCompare(b.name);
            } else if (orderValue === 'Nafn Ö-A') {
                return b.name.localeCompare(a.name);
            } else if (orderValue === 'Deild A-Ö') {
                return a.departments.name.localeCompare(b.departments.name);
            } else if (orderValue === 'Deild Ö-A') {
                return b.departments.name.localeCompare(a.departments.name);
            }
            return a.name.localeCompare(b.name);
        })
        .filter(client =>
            client.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            client.ssn.includes(searchFilter)
        )
        .filter(client =>
            departmentValue === '' || departmentValue === null || client.client_department_pivot.departmentId === departmentValue
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
                    items={departmentOptionsB(departments)}
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
                                    key={c.id}
                                    {...c}
                                    departments={departmentsJson.find(department => department.id === c.client_department_pivot.departmentId)}
                                    color={clientColors[c.name] || c.color}
                                    onColorChange={color => handleColorChange(c.name, color)}
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
