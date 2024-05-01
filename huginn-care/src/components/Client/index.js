import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const Client = ({ name, ssn, departments, color, onColorChange }) => {
    const colorOptions = [
        { label: 'Hvítur', value: '#ffffff' },
        { label: 'Grænn', value: '#99ff99' },
        { label: 'Gulur', value: '#ffff66' },
        { label: 'Rauður', value: '#ff3300' }
    ];

    return (
        <View key={name} style={styles.tableRow}>
            <View style={[styles.colorIndicator, { backgroundColor: color || '#ffffff' }]}></View>
            <Text style={styles.tableCell}>{name}</Text>
            <Text style={styles.tableCell}>{ssn}</Text>
            <Text style={styles.tableCell}>{departments.name}</Text>
            <View style={styles.tableCell}>
                <RNPickerSelect
                    placeholder={{ label: '...', value: null }}
                    items={colorOptions}
                    value={color || '#ffffff'}
                    onValueChange={(value) => onColorChange(value)}
                    style={styles.dropdown}
                    Icon={() => {
                        return <FontAwesome name='chevron-down' size={10} color='gray' />;
                    }}
                />
            </View>
            <View style={[styles.tableCell, { flex: 0.35 }]}>
                <View>
                    <Text onPress={() => {}}>👁️</Text>
                    <Text onPress={() => {}}>📂</Text>
                </View>
            </View>
        </View>
    );
};

export default Client;
