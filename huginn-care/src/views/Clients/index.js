import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { getAllClients } from '../../services/clientService';
import styles from './styles';
import ClientList from '../../components/ClientList';

const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        (async () => {
            setClients(await getAllClients() || []);
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.title}>Þjónustuþegar</Text>
                    <ClientList clients={clients}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Clients;