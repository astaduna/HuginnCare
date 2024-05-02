import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { getReportById } from '../../services/reportService';
import Spinner from '../../components/Spinner';
import styles from './styles';
import report from '../../resources/report.json';
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
    const [isLoading, setIsLoading] = useState(true);
    const scrollViewRef = useRef();
    const [selectedSection, setSelectedSection] = useState('');
    
    const scrollToSection = (section) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: section, animated: true });
        }
    };

    const handleSectionSelection = (section) => {
        setSelectedSection(section);
        scrollToSection(section);
    };
    /* const [report, setReport] = useState(null);

    useEffect(() => {
        (async () => {
            setReport(await getReportById(id));
            setIsLoading(false);
        })();
    }, [isFocused]); */

    const handleScroll = (event) => {
        const currentPosition = event.nativeEvent.contentOffset.y;

        if (currentPosition < section2 - 30) {
            setSelectedSection(section1);
        } else if (currentPosition < section3 - 35) {
            setSelectedSection(section2);
        } else {
            setSelectedSection(section3);
        }
    };

    useEffect(() => {
        if (report && report.medicine) {
            setChecked('yes');
        } else {
            setChecked('no');
        }
    }, [report]);

    return (
        <SafeAreaView style={styles.container}>
            {report.length // isLoading
                ? <Spinner /> 
                : <>
                    <View style={styles.jumpLinks}>
                        <TouchableOpacity style={[styles.jumpLinkButton, selectedSection === section1 && styles.selectedJumpLinkButton]}
                            onPress={() => handleSectionSelection(section1)}>
                            <Text style={[styles.jumpLinkText, selectedSection === section1 && styles.selectedJumpLinkText]}>Almennar upplýsingar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.jumpLinkButton, selectedSection === section2 && styles.selectedJumpLinkButton]}
                            onPress={() => handleSectionSelection(section2)} >
                            <Text style={[styles.jumpLinkText, selectedSection === section2 && styles.selectedJumpLinkText]}>Dagssamningar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.jumpLinkButton, selectedSection === section3 && styles.selectedJumpLinkButton]} 
                            onPress={() => handleSectionSelection(section3)} >
                            <Text style={[styles.jumpLinkText, selectedSection === section3 && styles.selectedJumpLinkText]}>Dagbók</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView ref={scrollViewRef} style={styles.detailsContainer} onScroll={handleScroll} scrollEventThrottle={16}>
                        <View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>Almennar upplýsingar</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Dagsetning</Text>
                                <Text style={[styles.input, report.date ? styles.greenBorder : styles.input]}>{moment(new Date(report.date)).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Deild</Text>
                                <Text style={[styles.input, report.department.name ? styles.greenBorder : styles.input]}>{report.department.name || ''}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                                <Text style={[styles.input, report.client.name ? styles.greenBorder : styles.input]}>{report.client.name || ''}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Notandi</Text>
                                <Text style={[styles.input, report.user.name ? styles.greenBorder : styles.input]}>{report.user.name || ''}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Tegund vaktar</Text>
                                <Text style={[styles.input, report.shift ? styles.greenBorder : styles.input]}>{report.shift === 'day' ? 'Dagvakt' : report.shift === 'evening' ? 'Kvöldvakt' : report.shift === 'evening' ? 'Kvöldvakt' : 'Næturvakt'}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Aðrir starfsmenn á vakt</Text>
                                <Text style={[styles.input, report.onShift ? styles.greenBorder : styles.input]}>{report.onShift || ''}</Text>
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
                                    <Text style={[styles.textInput, report.medicineReason ? styles.greenBorder : styles.textInput]}>{report.medicineReason || ''}
                                    </Text></>
                                : <></>}
                        </View>
                        <View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>Dagssamningar</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Útskýring</Text>
                                <Text style={[styles.textInput, report.clientReason ? styles.greenBorder : styles.textInput]}>{report.clientReason || ''}</Text>
                            </View>
                        </View>
                        <View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); }} style={[styles.formFrame, styles.lastFormFrame]}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>Dagbók</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.paragraph}>ATH: Samkvæmt gildandi lögum um persónuvernd þá getur þjónustuþegi fengið afrit af öllum upplýsingum sem skrifaðar eru um hann.
                                    Starfsmenn skulu því vanda orðaval sitt. Ef þeir eru í vafa ber að hafa samband við deildarstjóra.</Text>
                                <Text style={[styles.textInput, report.entry ? styles.greenBorder : styles.textInput]}>{report.entry || ''}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </>
            }
        </SafeAreaView>
    );
};

export default ReportDetail;
