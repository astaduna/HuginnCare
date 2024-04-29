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
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

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
                    <Text style={styles.title}>Yfirlit yfir öll drög</Text>
                    <ReportList reports={reports} incidents={incidents} page={10}/>
                </ScrollView>
            }
        </SafeAreaView>
    
    );
};

export default Drafts;