import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import report from '../../resources/file.png';
import plus from '../../resources/plus.png';
import next from '../../resources/right-arrow.png';
import styles from './styles';

const Reports = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Yfirlit</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('Reports'); }}>
            <View style={styles.section}>
                <View style={styles.greenIcon}>
                    <Image source={report} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Skrá atvik</Text>
                    <Image source={plus} style={styles.nextIcon} />
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('NewReport'); }}>
            <View style={styles.section}>
                <View style={styles.blueIcon}>
                    <Image source={report} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Skrá dagskýrslu</Text>
                    <Image source={plus} style={styles.nextIcon} />
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
        <View style={styles.listSection}>
            <Text style={styles.listTitle}>Sjá eldri skýrslur</Text>
        </View>
        <TouchableOpacity
            style={styles.reportButton}
            onPress={() => { navigate('AllReports'); }}>
            <Text style={styles.oldReportTitle}>Skoða allar skýrslur</Text>
        </TouchableOpacity>
    </View>
);

export default Reports;