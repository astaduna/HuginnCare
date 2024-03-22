import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import styles from './styles';

const Clients = ({ navigation: { navigate } }) => {
    const [pageValue, setPageValue] = useState(null);
    const [orderValue, setOrderValue] = useState(null);
    const [departmentValue, setDepartmentValue] = useState(null);

    const pageOptions = [
        { label: '10', value: 10 },
        { label: '25', value: 25 },
        { label: '50', value: 50 },
        { label: '100', value: 100 }
    ];

    const orderOptions = [
        { label: 'Nafn A-Ö', value: '' },
        { label: 'Nafn Ö-A', value: '' },
        { label: 'Deild A-Ö', value: '' },
        { label: 'Deild Ö-A', value: '' }
    ];

    const departmentOptions = [
        { label: 'Fakedeild 1', value: '' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Þjónustuþegar</Text>
                    <View>
                        <Text style={styles.inputTitle}>Fjöldi á síðu</Text>
                        <RNPickerSelect
                            style={styles.dropdown}
                            items={pageOptions}
                            onValueChange={(value) => setPageValue(value)}
                            value={pageValue}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Raða eftir</Text>
                        <RNPickerSelect
                            style={styles.dropdown}
                            items={orderOptions}
                            onValueChange={(value) => setOrderValue(value)}
                            value={orderValue}
                        />
                        <RNPickerSelect
                            style={styles.dropdown}
                            items={departmentOptions}
                            onValueChange={(value) => setDepartmentValue(value)}
                            value={departmentValue}
                        />
                    </View>
                    <TextInput
                        style={styles.textInput}
                        autoFocus
                        placeholder='Leita eftir að nafni eða kennitölu'
                        label="leita"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Clients;