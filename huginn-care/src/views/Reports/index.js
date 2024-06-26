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

const Reports = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState([]);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        (async () => {
            setReports(await getAllReports());
            setIncidents(await getAllIncidents());
            setIsLoading(false);
        })();
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            { isLoading
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