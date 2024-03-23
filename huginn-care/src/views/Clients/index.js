import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';
import clients from '../../resources/clients.json';
import ClientList from '../../components/ClientList';

const Clients = ({ navigation: { navigate } }) => {
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