import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getAllIncidents } from '../../services/incidentService';
import { getAllReports } from '../../services/reportService';
import Spinner from '../../components/Spinner';
import ReportList from '../../components/ReportList';
import styles from './styles';
import reportsJson from '../../resources/reports.json';
import incidentsJson from '../../resources/incidents.json';

const AllReports = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        (async () => {
            setReports(await getAllReports());
            setIncidents(await getAllIncidents());
            // setReports(reportsJson);
            // setIncidents(incidentsJson);
            setIsLoading(false);
        })();
    }, [isFocused]);
    
    return (
        <SafeAreaView style={styles.container}>
            { isLoading
                ? <Spinner /> 
                : <ScrollView style={styles.section}>
                    <View style={styles.formFrame}>
                        <Text style={styles.title}>Yfirlit yfir eldri skýrslur</Text>
                        <ReportList reports={reports} incidents={incidents} 
                            page={10} isPaginated={true} isFiltered={true} />
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    
    );
};

export default AllReports;