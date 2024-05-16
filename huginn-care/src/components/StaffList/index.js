import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../components/LoginModal/user';
import styles from './styles';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getAllDepartments } from '../../services/departmentService';
import Staff from '../Staff';
import { pageOptions, orderOptions, departmentOptionsB } from '../Options';

const StaffList = ({ staffs }) => {
    const currentUser = useRecoilValue(userState);
    const [departments, setDepartments] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [pageValue, setPageValue] = useState(pageOptions[0].value);
    const [orderValue, setOrderValue] = useState(orderOptions[0].value);
    const [departmentValue, setDepartmentValue] = useState(departmentOptionsB(departments)[0].value);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFilter, orderValue, departmentValue, pageValue]);

    useEffect(() => {
        (async () => {
            const departmentsData = await getAllDepartments();
            setDepartments(currentUser.thisUser.type === 'user' ? currentUser.thisUser.departments : departmentsData);
        })();
    }, []);

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
                return a.departments[0].name.localeCompare(b.departments[0].name);
            } else if (orderValue === 'Deild Ö-A') {
                return b.departments[0].name.localeCompare(a.departments[0].name);
            }
            return a.name.localeCompare(b.name);
        })
        .filter(staff =>
            staff.name.toLowerCase().includes(searchFilter.toLowerCase())
        )
        .filter(staff =>
            departmentValue === 'all' || departmentValue === '' || staff.departments.map(department => department.id).includes(departmentValue)
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
                    useNativeAndroidPickerStyle={false}
                    style={styles.dropdown}
                    placeholder={{ 
                        label: 'Veldu fjölda', 
                        value: '' 
                    }}
                    items={pageOptions}
                    onValueChange={(value) => setPageValue(value)}
                    value={pageValue}
                />
            </View>
            <View>
                <Text style={styles.inputTitle}>Raða eftir</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={styles.dropdown}
                    placeholder={{ 
                        label: 'Veldu röð', 
                        value: '' 
                    }}
                    items={orderOptions}
                    onValueChange={(value) => setOrderValue(value)}
                    value={orderValue}
                />
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={styles.dropdown}
                    placeholder={{ 
                        label: 'Veldu deild', 
                        value: '' 
                    }}
                    items={departmentOptionsB(departments)}
                    onValueChange={(value) => setDepartmentValue(value)}
                    value={departmentValue}
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
                                    key={s.id}
                                    {...s}
                                    departments={s.departments}
                                />
                            ))}
                            <View style={styles.pagination}>
                                <TouchableOpacity
                                    style={styles.paginationButton}
                                    onPress={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    <Text style={{ color: currentPage === 1 ? 'gainsboro' : 'black' }}>&#10094;</Text>
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
                                    <Text style={{ color: currentPage === 1 ? 'gainsboro' : 'black' }}>&#10095;</Text>
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
