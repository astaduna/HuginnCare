import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { getAllReports } from '../../services/reportService';
import { getAllIncidents } from '../../services/incidentService';
import { getAllUsers } from '../../services/userService';
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
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        (async () => {
            const reportsData = await getAllReports();
            const incidentsData = await getAllIncidents();
            const usersData = await getAllUsers();
            const departmentsData = await getAllDepartments();
            const clientsData = await getAllClients();
            setReports(reportsData.length > 0 ? reportsData : reportsJson);
            setIncidents(incidentsData.length > 0 ? incidentsData : incidentsJson);
            setDepartments(departmentsData.map(department => department.name));
            setUsers(usersData.map(user => user.name));
            setClients(clientsData.map(client => client.name));
            setIsLoading(false);
        })();
    }, [isFocused]);
    
    return (
        <SafeAreaView style={styles.container}>
            { isLoading
                ? <Spinner /> 
                : <ScrollView>
                    <Text style={styles.title}>Yfirlit yfir eldri skýrslur</Text>
                    <ReportList reports={reports} incidents={incidents} 
                        page={10} isPaginated={true} isFiltered={true} 
                        departments={departments} users={users} clients={clients}/>
                </ScrollView>
            }
        </SafeAreaView>
    
    );
};

export default AllReports;