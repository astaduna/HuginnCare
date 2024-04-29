import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getDrafts } from '../../services/reportService';
import Spinner from '../../components/Spinner';
import ReportList from '../../components/ReportList';
import styles from './styles';

const Drafts = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        (async () => {
            const draftsData = await getDrafts();
            setReports(draftsData.reports);
            setIncidents(draftsData.incidents);
            setIsLoading(false);
        })();
    }, [isFocused]);
    return (
        <SafeAreaView style={styles.container}>
            { isLoading
                ? <Spinner /> 
                : <ScrollView>
                    <Text style={styles.title}>Skýrslur</Text>
                    <ReportList reports={reports} incidents={[]} page={10} isPaginated={true}/>
                    <Text style={styles.title}>Atvik</Text>
                    <ReportList reports={[]} incidents={incidents} page={10} isPaginated={true}/>
                </ScrollView>
            }
        </SafeAreaView>
    
    );
};

export default Drafts;