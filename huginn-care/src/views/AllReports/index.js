import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import report from '../../resources/file.png';
import plus from '../../resources/plus.png';
import next from '../../resources/right-arrow.png';
import styles from './styles';

const AllReports = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Hér kemur listi yfir nýlegar skýrslur</Text>
         <TouchableOpacity
            style={styles.reportButton}
            onPress={() => { navigate('AllReports'); }}>
            <Text style={styles.oldReportTitle}>Skoða allar skýrslur</Text>
        </TouchableOpacity>
    </View>
    
);

export default AllReports;