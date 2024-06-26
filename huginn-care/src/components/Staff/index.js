import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Staff = ({ name, departments, phone, type }) => {
    return (
        <View key={name} style={styles.tableRow}>
            <Text style={styles.tableCell}>{name}</Text>
            <Text style={styles.tableCell}><Text style={styles.departments}>{departments.map(department => department.name).join(', ')}</Text></Text>
            <Text style={styles.tableCell}>{phone}</Text>
            <Text style={styles.tableCell}>{type === 'user' ? 'alm. notandi' : type === 'moderator' ? 'vaktstjóri' : 'Aðstandandi/fagaðili'}</Text>
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
