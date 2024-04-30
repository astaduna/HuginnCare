import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';
import staffs from '../../resources/staffs.json';
import StaffList from '../../components/StaffList';

const Staffs = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.title}>Starfsmenn</Text>
                    <StaffList staffs={staffs}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Staffs;