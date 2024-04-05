import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getAllReports } from '../../services/reportService';
import ReportList from '../../components/ReportList';
import styles from './styles';
import reports from '../../resources/reports.json';

const AllReports = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    // const [reports, setReports] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         setReports(await getAllReports());
    //     })();
    // }, [isFocused]);
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Yfirlit yfir eldri skýrslur</Text>
                <ReportList reports={reports} pageValue={10}/>
            </ScrollView>
        </SafeAreaView>
    
    );
};

export default AllReports;