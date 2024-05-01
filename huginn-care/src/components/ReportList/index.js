import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { getAllUsers } from '../../services/userService';
import Report from '../Report';
import { greenBlue } from '../../styles/colors';
import { categoryOptionsB, clientOptionsB, departmentOptionsB, pageOptions, userOptionsB } from '../Options';
import departmentsJson from '../../resources/departments.json';
import clientsJson from '../../resources/clients.json';
import usersJson from '../../resources/users.json';

const ReportList = ({ 
    reports, 
    incidents,
    page, 
    isPaginated = false,
    isFiltered = false
}) => {
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);

    const [pageValue, setPageValue] = useState(page === 4 ? 4 : pageOptions[0].value);
    const [categoryValue, setCategoryValue] = useState(categoryOptionsB[0].value);
    const [departmentValue, setDepartmentValue] = useState(departmentOptionsB(departments)[0].value);
    const [userValue, setUserValue] = useState(userOptionsB(users)[0].value);
    const [clientValue, setClientValue] = useState(clientOptionsB(clients)[0].value);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        (async () => {
            if (isFiltered) {
                // const usersData = await getAllUsers();
                // const clientsData = await getAllClients();
                // setDepartments(await getAllDepartments() || []);
                // setUsers(usersData.filter(user => user.user_department_pivot.departmentId === departmentValue));
                // setClients(clientsData.filter(client => client.client_department_pivot.departmentId === departmentValue));
                setDepartments(departmentsJson);
                setUsers(usersJson.filter(user => user.user_department_pivot.departmentId === departmentValue));
                setClients(clientsJson.filter(client => client.client_department_pivot.departmentId === departmentValue));
            }
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

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };
    
    const handleDate = (date, type) => {
        if (type === 'END_DATE') { 
            setEnd(date); 
        } else {
            setStart(date);
        }
    };

    let reportsTofilter;
    if (categoryValue === 'day') {
        reportsTofilter = reports;
    } else if (categoryValue === 'incident') {
        reportsTofilter = incidents;
    } else if (categoryValue === 'coercion') {
        reportsTofilter = incidents.filter(incident => incident.coercion != null);
    } else {
        reportsTofilter = reports.concat(incidents);
    }

    const filteredReports = reportsTofilter
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .filter(report =>
            departmentValue === '' || departmentValue === null || report.department.id === departmentValue
        )
        .filter(report =>
            userValue === '' || userValue === null || report.user.id === userValue
        )
        .filter(report =>
            clientValue === '' || clientValue === null || report.client.id === clientValue
        )
        .filter(report => {
            const reportDate = new Date(report.date);
            if (isFiltered) return reportDate >= start && reportDate <= end;
            return report;
        });
    
    const startIndex = (currentPage - 1) * parseInt(pageValue);
    const endIndex = startIndex + parseInt(pageValue);
    const paginatedReports = filteredReports.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredReports.length / pageValue);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <View style={styles.container}>
            {isFiltered
                ? (
                    <View>
                        <Text style={styles.inputTitle}>Raða eftir</Text>
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ 
                                label: 'Veldu deild', 
                                value: null
                            }}
                            items={departmentOptionsB(departments)}
                            onValueChange={(value) => setDepartmentValue(value)}
                            value={departmentValue}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={12} color='gray' />;
                            }}
                        />
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ 
                                label: 'Veldu notanda', 
                                value: null 
                            }}
                            items={userOptionsB(users)}
                            onValueChange={(value) => setUserValue(value)}
                            value={userValue}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={12} color='gray' />;
                            }}
                        />
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ 
                                label: 'Veldu þjónustuþega', 
                                value: null 
                            }}
                            items={clientOptionsB(clients)}
                            onValueChange={(value) => setClientValue(value)}
                            value={clientValue}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={12} color='gray' />;
                            }}
                        />
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ 
                                label: 'Veldu tegund skýrslu', 
                                value: null 
                            }}
                            items={categoryOptionsB}
                            onValueChange={(value) => setCategoryValue(value)}
                            value={categoryValue}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={12} color='gray' />;
                            }}
                        />
                        <Text style={styles.inputTitle}>Tímabil</Text>
                        <TouchableOpacity
                            onPress={showDatePicker}
                        >
                            <View style={styles.calendarBorder}>
                                <Text style={styles.paragraph}>
                                    {start ? start.toLocaleDateString('en-GB') : ''} - {end ? end.toLocaleDateString('en-GB') : ''}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {isDatePickerVisible 
                            ? <CalendarPicker 
                                startFromMonday={true}
                                allowRangeSelection={true}
                                todayBackgroundColor="#60d4d6"
                                selectedDayColor={greenBlue}
                                selectedDayTextColor="white"
                                onDateChange={handleDate} />
                            : null
                        }
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
                )
                : null }
            {filteredReports.length === 0
                ? (
                    <Text style={styles.paragraph}>...</Text>
                )
                : paginatedReports.length > 0
                    ? (
                        <View style={styles.table}>
                            {paginatedReports.map(r => (
                                <Report key={r.id} {...r} type={reports.includes(r) ? 'Dagsskýrsla' : 'Atvikaskýrsla'}/>
                            ))}
                            {isPaginated
                                ? (
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
                                            disabled={paginatedReports.length < pageValue || currentPage === totalPages}
                                        >
                                            <FontAwesome name='chevron-right' size={18} color={currentPage === totalPages ? 'gainsboro' : 'black'} />
                                        </TouchableOpacity>
                                    </View>
                                )
                                : null }
                        </View>
                    )
                    : (
                        <Text style={styles.paragraph}>...</Text>
                    )}
        </View>
    );
};

export default ReportList;
