import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { getAllClients } from '../../services/clientService';
import styles from './styles';
import clientsJson from '../../resources/clients.json';
import ClientList from '../../components/ClientList';

const Clients = ({ navigation: { navigate } }) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        (async () => {
            setClients(await getAllClients() || []);
            // console.log(clients)
            // setClients(clientsJson);
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