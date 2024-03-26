import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import moment from 'moment';

const Report = ({ 
    client, clientId, clientReason, 
    createdAt, 
    date, 
    deletedAt, 
    department, departmentId, 
    draft, 
    entry, 
    id, 
    important, 
    medicine, medicineReason, 
    onShift, shift, 
    updatedAt, 
    user, userId 
}) => {
    const { navigate } = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigate('ReportDetail', { id })}>
            <View key={clientId} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>{moment(new Date(date)).format('DD/MM/YYYY HH:MM')}</Text>
                <Text style={[styles.tableCell, { flex: 1.1 }]}>Dagsskýrsla</Text>
                <Text style={styles.tableCell}>{(user.name).split(' ').map(n => n.charAt(0)).join('.')}</Text>
                <Text style={[styles.tableCell, { flex: 0.1, alignSelf: 'flex-end', fontWeight: 'bold' }]}>&gt;</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Report;
