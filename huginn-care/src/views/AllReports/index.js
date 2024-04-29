import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getAllReports } from '../../services/reportService';
import { getAllIncidents } from '../../services/incidentService';
import ReportList from '../../components/ReportList';
import styles from './styles';
import reportsJson from '../../resources/reports.json';
import incidentsJson from '../../resources/incidents.json';

const AllReports = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [reports, setReports] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        (async () => {
            const reportsData = await getAllReports();
            const incidentsData = await getAllIncidents();
            setReports(reportsData.length > 0 ? reportsData : reportsJson);
            setIncidents(incidentsData.length > 0 ? incidentsData : incidentsJson);
            setDepartments([...new Set(reportsData.concat(incidentsData).map(report => report.department.name))]);
            setUsers([...new Set(reportsData.concat(incidentsData).map(report => report.user.name))]);
            setClients([...new Set(reportsData.concat(incidentsData).map(report => report.client.name))]);
        })();
    }, [isFocused]);
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Yfirlit yfir eldri skýrslur</Text>
                <ReportList reports={reports} incidents={incidents} page={10} departments={departments} users={users} clients={clients}/>
            </ScrollView>
        </SafeAreaView>
    
    );
};

export default AllReports;