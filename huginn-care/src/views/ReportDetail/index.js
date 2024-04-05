import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { getReportById } from '../../services/reportService';
import styles from './styles';
import report from '../../resources/report.json';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';

const ReportDetail = ({ route }) => {
    const [checked, setChecked] = useState('yes'); // State for radio button
    const [shift, setShift] = useState('yes');
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const { id } = route.params;
    const isFocused = useIsFocused();

    const scrollViewRef = useRef();
    
    // Function to handle scrolling to a specific section
    const scrollToSection = (section) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: section, animated: true });
        }
    };
    // const [report, setReport] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         setReport(await getReportById(id));
    //     })();
    // }, [isFocused]);

    useEffect(() => {
        if (report && report.medicine) {
            setChecked('yes');
        } else {
            setChecked('no');
        }
    }, [report]);

    return (
        <SafeAreaView style={styles.container}>
            {report
                ? (<>
                    <View style={styles.jumpLinks}>
                        <TouchableOpacity onPress={() => scrollToSection(section1)}>
                            <Text>Almennar upplýsingar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => scrollToSection(section2)}>
                            <Text>Dagssamningar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => scrollToSection(section3)}>
                            <Text>Dagbók</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView ref={scrollViewRef} style={styles.detailsContainer}>
                        <View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                            <Text style={styles.title}>Almennar upplýsingar</Text>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Dagsetning</Text>
                                <Text style={styles.input}>{moment(new Date(report.date)).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Deild</Text>
                                <Text style={styles.input}>{report.department.name || ''}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                                <Text style={styles.input}>{report.client.name || ''}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Notandi</Text>
                                <Text style={styles.input}>{report.user.name || ''}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Tegund vaktar</Text>
                                <Text style={styles.input}>{report.shift === 'day' ? 'Dagvakt' : 'Næturvakt'}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Aðrir starfsmenn á vakt</Text>
                                <Text style={styles.input}>{report.onShift || ''}</Text>
                            </View>
                            <Text style={styles.inputTitle}>Lyf gefin?</Text>
                            <View style={[styles.radioInput, checked === 'yes' && styles.greenBorder]}>
                                <RadioButton
                                    value="yes"
                                    status={checked}
                                    onPress={() => setChecked('yes')} />
                                <Text>Já, eða á ekki við</Text>
                            </View>
                            <View style={[styles.radioInput, checked === 'no' && styles.greenBorder]}>
                                <RadioButton
                                    value="no"
                                    status={checked}
                                    onPress={() => setChecked('no')} />
                                <Text>Nei</Text>
                            </View>
                            {checked === 'no'
                                ? <>
                                    <Text style={styles.inputTitle}>*Ástæða</Text>
                                    <Text style={styles.textInput}>{report.medicineReason || ''}
                                    </Text></>
                                : <></>}
                        </View>
                        <View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                            <Text style={styles.title}>Dagssamningar</Text>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Útskýring</Text>
                                <Text style={styles.textInput}>{report.clientReason || ''}</Text>
                            </View>
                        </View>
                        <View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); }} style={[styles.formFrame, styles.lastFormFrame]}>
                            <Text style={styles.title}>Dagbók</Text>
                            <View style={styles.detailItem}>
                                <Text style={styles.paragraph}>ATH: Samkvæmt gildandi lögum um persónuvernd þá getur þjónustuþegi fengið afrit af öllum upplýsingum sem skrifaðar eru um hann.
                                    Starfsmenn skulu því vanda orðaval sitt. Ef þeir eru í vafa ber að hafa samband við deildarstjóra.</Text>
                                <Text style={styles.textInput}>{report.entry || ''}</Text>
                            </View>
                        </View>
                    </ScrollView></>)
                : null }
        </SafeAreaView>
    );
};

export default ReportDetail;
