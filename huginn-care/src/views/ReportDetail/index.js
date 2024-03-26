import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { getReportById } from '../../services/reportService';
import styles from './styles';

const ReportDetail = ({ route }) => {
    const { id } = route.params;
    const isFocused = useIsFocused();
    const [report, setReport] = useState([]);

    useEffect(() => {
        (async () => {
            setReport(await getReportById(id));
        })();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Dagsetning</Text>
                    <Text style={styles.paragraph}>{report.date}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Deild</Text>
                    <Text style={styles.paragraph}>{report.department.name}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Þjónustuþegi</Text>
                    <Text style={styles.paragraph}>{report.client.name}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Notandi</Text>
                    <Text style={styles.paragraph}>{report.user.name}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Tegund vaktar</Text>
                    <Text style={styles.paragraph}>{report.shift}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Aðrir starfsmenn á vakt</Text>
                    <Text style={styles.paragraph}>{}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Lyf gefin?</Text>
                    <Text style={styles.paragraph}>{report.medicine ? 'Já, eða á ekki við' : 'Nei'}</Text>
                </View>
            </View>
        </View>
    );
};

export default ReportDetail;
