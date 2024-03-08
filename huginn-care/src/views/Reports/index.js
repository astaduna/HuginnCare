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
    </View>
);

export default Reports;