import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { getReportById } from '../../services/reportService';
import styles from './styles';
import report from '../../resources/report.json';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';

const ReportDetail = ({ route }) => {
    const [checked, setChecked] = useState('yes'); // State for radio button
    const { id } = route.params;
    const isFocused = useIsFocused();
    console.log(report);
    // const [report, setReport] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         setReport(await getReportById(id));
    //     })();
    // }, [isFocused]);

    useEffect(() => {
        if (report && report.medicine) {
            setChecked('yes');
        } else {
            setChecked('no');
        }
    }, [report]);

    return (
        <SafeAreaView style={styles.container}>
            {report
                ? (<ScrollView style={styles.detailsContainer}>
                    <View style={styles.formFrame}>
                        <Text style={styles.title}>Almennar upplýsingar</Text>
                        <View style={styles.detailItem}>
                            <Text style={styles.inputTitle}>Dagsetning</Text>
                            <Text style={styles.input}>{moment(new Date(report.date)).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.inputTitle}>Deild</Text>
                            <Text style={styles.input}>{report.department.name || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                            <Text style={styles.input}>{report.client.name || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.inputTitle}>Notandi</Text>
                            <Text style={styles.input}>{report.user.name || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.inputTitle}>Tegund vaktar</Text>
                            <Text style={styles.input}>{report.shift || ''}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.inputTitle}>Aðrir starfsmenn á vakt</Text>
                            <Text style={styles.input}>{''}</Text>
                        </View>
                        <Text style={styles.inputTitle}>Lyf gefin?</Text>
                        <View style={[styles.radioInput, checked === 'yes' && styles.greenBorder]}>
                            <RadioButton
                                value="yes"
                                status={checked}
                                onPress={() => setChecked('yes')}
                            />
                            <Text>Já, eða á ekki við</Text>
                        </View>
                        <View style={[styles.radioInput, checked === 'no' && styles.greenBorder]}>
                            <RadioButton
                                value="no"
                                status={checked}
                                onPress={() => setChecked('no')}
                            />
                            <Text>Nei</Text>
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
