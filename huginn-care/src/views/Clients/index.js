import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';
import clients from '../../resources/clients.json';
import ClientList from '../../components/ClientList';

const Clients = ({ navigation: { navigate } }) => {
    const pageOptions = [
        { label: '10', value: '10' },
        { label: '25', value: '25' },
        { label: '50', value: '50' },
        { label: '100', value: '100' }
    ];

    const orderOptions = [
        { label: 'Nafn A-Ö', value: 'Nafn A-Ö' },
        { label: 'Nafn Ö-A', value: 'Nafn Ö-A' },
        { label: 'Deild A-Ö', value: 'Deild A-Ö' },
        { label: 'Deild Ö-A', value: 'Deild Ö-A' }
    ];

    const departmentOptions = [
        { label: 'Allar Deildir', value: 'Allar Deildir' },
        { label: 'Fakedeild 1', value: 'Fakedeild 1' }
    ];

    const [pageValue, setPageValue] = useState(pageOptions[0].value);
    const [orderValue, setOrderValue] = useState(orderOptions[0].value);
    const [departmentValue, setDepartmentValue] = useState(departmentOptions[0].value);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Þjónustuþegar</Text>
                    <View>
                        <Text style={styles.inputTitle}>Fjöldi á síðu</Text>
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ label: '...', value: null }}
                            items={pageOptions}
                            onValueChange={(value) => setPageValue(value)}
                            value={pageValue}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputTitle}>Raða eftir</Text>
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ label: '...', value: null }}
                            items={orderOptions}
                            onValueChange={(value) => setOrderValue(value)}
                            value={orderValue}
                        />
                        <RNPickerSelect
                            style={styles.dropdown}
                            placeholder={{ label: '...', value: null }}
                            items={departmentOptions}
                            onValueChange={(value) => setDepartmentValue(value)}
                            value={departmentValue}
                        />
                    </View>
                    <ClientList clients={clients}/>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default Clients;