import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Staff from '../Staff';
import departmentsJson from '../../resources/departments.json';
import { pageOptions, orderOptions, departmentOptionsB } from '../Options';

const StaffList = ({ staffs }) => {
    const [searchFilter, setSearchFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    const filteredStaffs = staffs
        .sort((a, b) => {
            if (orderValue === 'Nafn A-Ö') {
                return a.name.localeCompare(b.name);
            } else if (orderValue === 'Nafn Ö-A') {
                return b.name.localeCompare(a.name);
            } else if (orderValue === 'Deild A-Ö') {
                return a.deild.localeCompare(b.deild);
            } else if (orderValue === 'Deild Ö-A') {
                return b.deild.localeCompare(a.deild);
            }
            return a.name.localeCompare(b.name);
        })
        .filter(client =>
            client.name.toLowerCase().includes(searchFilter.toLowerCase())
        )
        .filter(client =>
            departmentValue === 'Allar Deildir' || departmentValue === null || client.deild === departmentValue
        );

    const startIndex = (currentPage - 1) * parseInt(pageValue);
    const endIndex = startIndex + parseInt(pageValue);
    const paginatedStaffs = filteredStaffs.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredStaffs.length / pageValue);

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
                placeholder='Leita eftir nafni'
                value={searchFilter}
                onChangeText={text => setSearchFilter(text)}
            />
            {staffs.length === 0
                ? (
                    <Text style={styles.paragraph}>...</Text>
                )
                : paginatedStaffs.length > 0
                    ? (
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.columnHeader}>Nafn</Text>
                                <Text style={styles.columnHeader}>Deild/ir</Text>
                                <Text style={styles.columnHeader}>Símanr.</Text>
                                <Text style={styles.columnHeader}>Starfsheiti</Text>
                                <Text style={[styles.columnHeader, { flex: 1.5 }]}> </Text>
                            </View>
                            {paginatedStaffs.map(s => (
                                <Staff
                                    key={s.name}
                                    {...s}
                                    departments={departmentsJson.find(department => department.id === s.user_department_pivot.departmentId)}
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
                                    disabled={paginatedStaffs.length < pageValue || currentPage === totalPages}
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

export default StaffList;
