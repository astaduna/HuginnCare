import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Report from '../Report';

const ReportList = ({ reports, pageValue }) => {
    const [currentPage, setCurrentPage] = useState(1);

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

    const startIndex = (currentPage - 1) * parseInt(pageValue);
    const endIndex = startIndex + parseInt(pageValue);
    const paginatedReports = reports.slice(startIndex, endIndex);

    const totalPages = Math.ceil(reports.length / pageValue);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <View style={styles.container}>
            {reports.length === 0
                ? (
                    <Text style={styles.paragraph}>...</Text>
                )
                : paginatedReports.length > 0
                    ? (
                        <View style={styles.table}>
                            {paginatedReports.map(r => (
                                <Report key={r.id} {...r} />
                            ))}
                            {pageValue === 10
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
