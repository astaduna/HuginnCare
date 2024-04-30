import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const Staff = ({ nafn, deild, simanumer, starfsheiti }) => {
    return (
        <View key={nafn} style={styles.tableRow}>
            <Text style={styles.tableCell}>{nafn}</Text>
            <Text style={styles.tableCell}><Text style={styles.departments}>{deild}</Text></Text>
            <Text style={styles.tableCell}>{simanumer}</Text>
            <Text style={styles.tableCell}>{starfsheiti}</Text>
            <View style={[styles.tableCell, { flex: 0.3 }]}>
                <View>
                    <Text onPress={() => {}}>👁️</Text>
                    <Text onPress={() => {}}>📂</Text>
                </View>
            </View>
        </View>
    );
};

export default Staff;
