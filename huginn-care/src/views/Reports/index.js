import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import report from '../../resources/file.png';
import plus from '../../resources/plus.png';
import next from '../../resources/right-arrow.png';
import styles from './styles';
import ReportList from '../../components/ReportList';
import { getAllReports } from '../../services/reportService';

const Reports = ({ navigation: { navigate } }) => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        (async () => {
            setReports(await getAllReports());
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
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
                    onPress={() => { navigate('Reports'); }}>
                    <View style={styles.section}>
                        <View style={styles.yellowIcon}>
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
                    <ReportList reports={reports} pageValue={4}/>
                    <TouchableOpacity
                        style={styles.reportButton}
                        onPress={() => { navigate('AllReports'); }}>
                        <Text style={styles.oldReportTitle}>Skoða allar skýrslur</Text>
                    </TouchableOpacity>
                </View>
                <FloatingActionButton />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Reports;