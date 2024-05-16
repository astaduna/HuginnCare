import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../components/LoginModal/user';
import styles from './styles';
import { Text, View, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { getAllUsers } from '../../services/userService';
import Report from '../Report';
import { greenBlue } from '../../styles/colors';
import { categoryOptionsB, clientOptionsB, departmentOptionsB, pageOptions, userOptionsB } from '../Options';

const ReportList = ({ 
    reports, 
    incidents,
    page, 
    isPaginated = false,
    isFiltered = false
}) => {
    const currentUser = useRecoilValue(userState);
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

    const [pageValue, setPageValue] = useState(page);
    const [categoryValue, setCategoryValue] = useState('');
    const [departmentValue, setDepartmentValue] = useState('');
    const [userValue, setUserValue] = useState('');
    const [clientValue, setClientValue] = useState('');

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        (async () => {
            if (isFiltered) {
                const departmentsData = await getAllDepartments();
                const usersData = await getAllUsers();
                const clientsData = await getAllClients();
                setDepartments(currentUser.thisUser.type === 'user' ? currentUser.thisUser.departments : departmentsData || []);
                setUsers(usersData.filter(user => user.user_department_pivot.departmentId === departmentValue));
                setClients(clientsData.filter(client => client.client_department_pivot.departmentId === departmentValue));
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

    let reportsTofilter = [];
    if (categoryValue === 'day' && reports) {
        reportsTofilter = reports;
    } else if (categoryValue === 'incident' && incidents) {
        reportsTofilter = incidents;
    } else if (categoryValue === 'coercion' && incidents) {
        reportsTofilter = incidents.filter(incident => incident.coercion != null);
    } else if ((categoryValue === 'all' || categoryValue === '') && (reports || incidents)) {
        reportsTofilter = reports?.concat(incidents);
    }

    const filteredReports = reportsTofilter
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(report =>
            departmentValue === 'all' || departmentValue === '' || report.department.id === departmentValue
        )
        .filter(report =>
            userValue === 'all' || userValue === '' || report.user.id === userValue
        )
        .filter(report =>
            clientValue === 'all' || clientValue === '' || report.client.id === clientValue
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
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            style={styles.dropdown}
                            placeholder={{ 
                                label: 'Veldu notanda', 
                                value: '' 
                            }}
                            items={userOptionsB(users)}
                            onValueChange={(value) => setUserValue(value)}
                            value={userValue}
                        />
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            style={styles.dropdown}
                            placeholder={{ 
                                label: 'Veldu þjónustuþega', 
                                value: '' 
                            }}
                            items={clientOptionsB(clients)}
                            onValueChange={(value) => setClientValue(value)}
                            value={clientValue}
                        />
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            style={styles.dropdown}
                            placeholder={{ 
                                label: 'Veldu tegund skýrslu', 
                                value: '' 
                            }}
                            items={categoryOptionsB}
                            onValueChange={(value) => setCategoryValue(value)}
                            value={categoryValue}
                        />
                        <Text style={styles.inputTitle}>Tímabil</Text>
                        <TouchableOpacity
                            onPress={showDatePicker}
                        >
                            <View style={styles.calendarBorder}>
                                <Text style={styles.paragraph}>
                                    {start?.toLocaleDateString('en-GB')} - {end?.toLocaleDateString('en-GB')}
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
                                onDateChange={handleDate}
                                width={350} />
                            : null
                        }
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
                                            disabled={paginatedReports.length < pageValue || currentPage === totalPages}
                                        >
                                            <Text style={{ color: currentPage === 1 ? 'gainsboro' : 'black' }}>&#10095;</Text>
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
