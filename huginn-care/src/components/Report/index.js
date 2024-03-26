import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

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
                <Text style={styles.tableCell}>{date}</Text>
                <Text style={styles.tableCell}>{user.name}</Text>
                <Text style={styles.tableCell}>{client.name}</Text>
                <Text style={styles.tableCell}>{department.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Report;
