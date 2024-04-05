import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getDrafts } from '../../services/reportService';
import ReportList from '../../components/ReportList';
import styles from './styles';

const Drafts = ({ navigation: { navigate } }) => {
    const isFocused = useIsFocused();
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        (async () => {
            setDrafts(await getDrafts());
        })();
    }, [isFocused]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Yfirlit yfir öll drög</Text>
                <ReportList reports={drafts} pageValue={10}/>
            </ScrollView>
        </SafeAreaView>
    
    );
};

export default Drafts;