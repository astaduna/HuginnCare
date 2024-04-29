import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import Report from '../Report';
import { greenBlue } from '../../styles/colors';

const ReportList = ({ 
    reports, 
    incidents,
    page, 
    departments = [],
    users = [],
    clients = []
}) => {
    console.log(reports[0]);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);

    const pageOptions = [
        { label: '10', value: '10' },
        { label: '25', value: '25' },
        { label: '50', value: '50' },
        { label: '100', value: '100' }
    ];

    const categoryOptions = [
        { label: 'Allar Tegundir', value: 'Allar Tegundir' },
        { label: 'Dagsskýrslur', value: 'Dagsskýrslur' },
        { label: 'Atvikaskýrslur', value: 'Atvikaskýrslur' }
    ];
    
    const departmentOptions = [{ 
        label: 'Allar Deildir', 
        value: 'Allar Deildir' 
    },
    ...departments.map(department => ({
        label: department,
        value: department
    })).sort((a, b) => a.label.localeCompare(b.label))];

    const userOptions = [{ 
        label: 'Allir Notendur', 
        value: 'Allir Notendur' 
    },
    ...users.map(user => ({
        label: user,
        value: user
    })).sort((a, b) => a.label.localeCompare(b.label))];

    const clientOptions = [{ 
        label: 'Allir Þjónustuþegar', 
        value: 'Allir Þjónustuþegar' 
    },
    ...clients.map(client => ({
        label: client,
        value: client
    })).sort((a, b) => a.label.localeCompare(b.label))];

    const [pageValue, setPageValue] = useState(page === 4 ? 4 : pageOptions[0].value);
    const [categoryValue, setCategoryValue] = useState(categoryOptions[0].value);
    const [departmentValue, setDepartmentValue] = useState(departmentOptions[0].value);
    const [userValue, setUserValue] = useState(userOptions[0].value);
    const [clientValue, setClientValue] = useState(clientOptions[0].value);

    useEffect(() => {
        setCurrentPage(1);
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
    if (categoryValue === 'Dagsskýrslur') {
        reportsTofilter = reports;
    } else if (categoryValue === 'Atvikaskýrslur') {
        reportsTofilter = incidents;
    } else {
        reportsTofilter = reports.concat(incidents);
    }

    const filteredReports = reportsTofilter
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .filter(report =>
            departmentValue === 'Allar Deildir' || departmentValue === null || report.department.name === departmentValue
        )
        .filter(report =>
            userValue === 'Allir Notendur' || userValue === null || report.user.name === userValue
        )
        .filter(report =>
            clientValue === 'Allir Þjónustuþegar' || clientValue === null || report.client.name === clientValue
        )
        .filter(report => {
            const reportDate = new Date(report.date);
            return reportDate >= start && reportDate <= end;
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
            {page !== 4
                ? (
                    <View>
                        <Text style={styles.inputTitle}>Raða eftir</Text>
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
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ label: '...', value: null }}
                            items={userOptions}
                            onValueChange={(value) => setUserValue(value)}
                            value={userValue}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={12} color='gray' />;
                            }}
                        />
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ label: '...', value: null }}
                            items={clientOptions}
                            onValueChange={(value) => setClientValue(value)}
                            value={clientValue}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={12} color='gray' />;
                            }}
                        />
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ label: '...', value: null }}
                            items={categoryOptions}
                            onValueChange={(value) => setCategoryValue(value)}
                            value={categoryValue}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={12} color='gray' />;
                            }}
                        />
                        <Text style={styles.paginationText}>Tímabil</Text>
                        <TouchableOpacity
                            onPress={showDatePicker}
                        >
                            <Text style={styles.paragraph}>
                                {start ? start.toLocaleDateString('en-GB') : ''} - {end ? end.toLocaleDateString('en-GB') : ''}
                            </Text>
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
                            {page !== 4
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
