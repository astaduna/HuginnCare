import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import FloatingActionButton from '../../components/FloatingActionButton';
import report from '../../resources/file.png';
import plus from '../../resources/plus.png';
import next from '../../resources/right-arrow.png';
import styles from './styles';
import Spinner from '../../components/Spinner';
import ReportList from '../../components/ReportList';
import { getAllReports } from '../../services/reportService';
import { getAllIncidents } from '../../services/incidentService';
import reportsJson from '../../resources/reports.json';
import incidentsJson from '../../resources/incidents.json';

const Reports = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        (async () => {
            const reportsData = await getAllReports();
            const incidentsData = await getAllIncidents();
            // setReports(reportsData.length > 0 ? reportsData : reportsJson);
            // setIncidents(incidentsData.length > 0 ? incidentsData : incidentsJson);
            setReports(reportsJson);
            setIncidents(incidentsJson);
            setIsLoading(false);
        })();
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            { reports.length <= 0 // isLoading
                ? <Spinner /> 
                : <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.title}>Yfirlit</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigate('NewReport'); }}>
                        <View style={styles.section}>
                            <View style={styles.blueIcon}>
                                <Image source={report} style={styles.icon} />
                            </View>
                            <View style={styles.navText}>
                                <Text style={styles.buttonText}>Skrá skýrslu</Text>
                                <Image source={plus} style={styles.nextIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigate('AllReports'); }}>
                        <View style={styles.section}>
                            <View style={styles.greenIcon}>
                                <Image source={report} style={styles.icon} />
                            </View>
                            <View style={styles.navText}>
                                <Text style={styles.buttonText}>Sjá allar skýrslur</Text>
                                <Image source={next} style={styles.nextIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigate('Drafts'); }}>
                        <View style={styles.section}>
                            <View style={styles.yellowIcon}>
                                <Image source={report} style={styles.icon} />
                            </View>
                            <View style={styles.navText}>
                                <Text style={styles.buttonText}>Sjá öll drög</Text>
                                <Image source={next} style={styles.nextIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigate('Reports'); }}>
                        <View style={styles.section}>
                            <View style={styles.redIcon}>
                                <Image source={report} style={styles.icon} />
                            </View>
                            <View style={styles.navText}>
                                <Text style={styles.buttonText}>Samantekt</Text>
                                <Image source={next} style={styles.nextIcon} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.reports}>
                        <Text style={styles.subtitle}>Sjá eldri skýrslur</Text>
                        {reports.length > 0 || incidents.length > 0
                            ? (<ReportList reports={reports} incidents={incidents} page={4}/>)
                            : null}
                    </View>
                    <TouchableOpacity
                        style={styles.reportButton}
                        onPress={() => { navigate('AllReports'); }}>
                        <Text style={styles.oldReportTitle}>Skoða allar skýrslur</Text>
                    </TouchableOpacity>
                </ScrollView>
            }
            <FloatingActionButton />
        </SafeAreaView>
    );
};

export default Reports;