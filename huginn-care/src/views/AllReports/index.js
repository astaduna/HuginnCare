import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { getAllReports } from '../../services/reportService';
import ReportList from '../../components/ReportList';
import styles from './styles';

const AllReports = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        (async () => {
            setReports(await getAllReports());
        })();
    }, [isFocused]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hér kemur listi yfir nýlegar skýrslur</Text>
            <ReportList reports={reports} pageValue={10}/>
        </View>
    
    );
};

export default AllReports;