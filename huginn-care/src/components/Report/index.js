import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import moment from 'moment';

const Report = ({ 
    date, 
    id,  
    user,
    type
}) => {
    const { navigate } = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigate('ReportDetail', { id, type })}>
            <View key={id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.2 }]}>{moment(new Date(date)).format('DD/MM/YYYY HH:mm')}</Text>
                <Text style={[styles.tableCell, { flex: 1.1 }]}>{type}</Text>
                <Text style={styles.tableCell}>{(user.name).split(' ').map(n => n.charAt(0)).join('.')}</Text>
                <Text style={[styles.tableCell, { flex: 0.1, alignSelf: 'flex-end', fontWeight: 'bold' }]}>&gt;</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Report;
