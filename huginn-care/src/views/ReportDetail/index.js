import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { getReportById } from '../../services/reportService';
import styles from './styles';
import report from '../../resources/report.json';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

const ReportDetail = ({ route }) => {
    const { id } = route.params;
    const isFocused = useIsFocused();
    console.log(report);
    // const [report, setReport] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         setReport(await getReportById(id));
    //     })();
    // }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            {report
                ? (<ScrollView style={styles.detailsContainer}>
                    <View style={styles.formFrame}>
                        <Text style={styles.title}>Almennar upplýsingar</Text>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Dagsetning</Text>
                            <Text style={styles.input}>{moment(new Date(report.date)).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Deild</Text>
                            <Text style={styles.input}>{report.department.name || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Þjónustuþegi</Text>
                            <Text style={styles.input}>{report.client.name || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Notandi</Text>
                            <Text style={styles.input}>{report.user.name || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Tegund vaktar</Text>
                            <Text style={styles.input}>{report.shift || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Aðrir starfsmenn á vakt</Text>
                            <Text style={styles.input}>{''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Lyf gefin?</Text>
                            <Text style={styles.input}>{report.medicine ? 'Já, eða á ekki við' : 'Nei' || ''}</Text>
                        </View>
                    </View>
                    <View style={styles.formFrame}>
                        <Text style={styles.title}>Dagssamningar</Text>
                    </View>
                </ScrollView>)
                : null }
        </SafeAreaView>
    );
};

export default ReportDetail;
