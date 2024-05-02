import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';
import { getAllUsers } from '../../services/userService';
import staffsJson from '../../resources/users.json';
import StaffList from '../../components/StaffList';
import { useIsFocused } from '@react-navigation/native';

const Staffs = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        (async () => {
            // setStaffs(await getAllUsers());
            setStaffs(staffsJson);
        })();
    }, [isFocused]);

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