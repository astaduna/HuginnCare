import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { getReportById } from '../../services/reportService';
import Spinner from '../../components/Spinner';
import styles from './styles';
import report from '../../resources/report.json';
import incident from '../../resources/incident.json';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';
import Checkbox from 'expo-checkbox';
import { greenBlue } from '../../styles/colors';
import { getIncidentById } from '../../services/incidentService';

const ReportDetail = ({ route }) => {
    const [medicineChecked, setMedicineChecked] = useState('');
    const [walkChecked, setWalkChecked] = useState('');
    const [damages, setDamages] = useState('');
    const [coercion, setCoercion] = useState('');
    const [shift, setShift] = useState('yes');
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const { id, type } = route.params;
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
    const [report, setReport] = useState({});
    const [incident, setIncident] = useState({});

    useEffect(() => {
        (async () => {
            if (type === 'Dagsskýrsla') {
                setReport(await getReportById(id));
                setIsLoading(false);
            } else if (type === 'Atvikaskýrsla') {
                setIncident(await getIncidentById(id));
                setIsLoading(false);
            }
        })();
    }, [isFocused]);

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
            setMedicineChecked('yes');
        } else {
            setMedicineChecked('no');
        }

        if (report && report.clientReason) {
            setWalkChecked('yes');
        } else {
            setWalkChecked('no');
        }

        if (incident && incident.damages) {
            setDamages('yes');
        } else {
            setDamages('no');
        }

        if (incident && incident.coercion) {
            setCoercion('yes');
        } else {
            setCoercion('no');
        }
    }, [incident, report]);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading // !report
                ? <Spinner /> 
                : <>
                    { report && type === 'Dagsskýrsla'
                        ? <View style={styles.jumpLinks}>
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
                        : <></>
                    }
                    { incident && type === 'Atvikaskýrsla'
                        ? <View style={styles.jumpLinks}>
                            <TouchableOpacity style={[styles.jumpLinkButton, selectedSection === section1 && styles.selectedJumpLinkButton]}
                                onPress={() => handleSectionSelection(section1)}>
                                <Text style={[styles.jumpLinkText, selectedSection === section1 && styles.selectedJumpLinkText]}>Almennar upplýsingar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.jumpLinkButton, selectedSection === section2 && styles.selectedJumpLinkButton]}
                                onPress={() => handleSectionSelection(section2)} >
                                <Text style={[styles.jumpLinkText, selectedSection === section2 && styles.selectedJumpLinkText]}>Atvik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.jumpLinkButton, selectedSection === section3 && styles.selectedJumpLinkButton]} 
                                onPress={() => handleSectionSelection(section3)} >
                                <Text style={[styles.jumpLinkText, selectedSection === section3 && styles.selectedJumpLinkText]}>Líkamlegt inngrip</Text>
                            </TouchableOpacity>
                        </View>
                        : <></>
                    }
                    <ScrollView ref={scrollViewRef} style={styles.detailsContainer} onScroll={handleScroll} scrollEventThrottle={16}>
                        { report && type === 'Dagsskýrsla'
                            ? <><View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Almennar upplýsingar</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Dagsetning</Text>
                                    <Text style={[styles.input, report.date ? styles.greenBorder : styles.input]}>{moment(new Date(report.date)).format('DD/MM/YYYY') || ''}</Text>
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
                                    <Text style={[styles.input, report.shift ? styles.greenBorder : styles.input]}>{report.shift === 'day' ? 'Dagvakt' : report.shift === 'evening' ? 'Kvöldvakt' : report.shift === 'night' ? 'Næturvakt' : ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Aðrir starfsmenn á vakt</Text>
                                    <Text style={[styles.input, report.onShift ? styles.greenBorder : styles.input]}>{report.onShift || ''}</Text>
                                </View>
                                <Text style={styles.inputTitle}>Lyf gefin?</Text>
                                <View style={[styles.radioInput, medicineChecked === 'yes' && styles.greenBorder]}>
                                    <RadioButton
                                        value="yes"
                                        status={medicineChecked} />
                                    <Text>Já, eða á ekki við</Text>
                                </View>
                                <View style={[styles.radioInput, medicineChecked === 'no' && styles.greenBorder]}>
                                    <RadioButton
                                        value="no"
                                        status={medicineChecked} />
                                    <Text>Nei</Text>
                                </View>
                            </View><View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Dagssamningar</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Fór hann í göngutúr</Text>
                                    <View style={[styles.radioInput, walkChecked === 'yes' && styles.greenBorder]}>
                                        <RadioButton
                                            value="yes"
                                            status={walkChecked} />
                                        <Text>Já</Text>
                                    </View>
                                    <View style={[styles.radioInput, walkChecked === 'no' && styles.greenBorder]}>
                                        <RadioButton
                                            value="no"
                                            status={walkChecked} />
                                        <Text>Nei</Text>
                                    </View>
                                </View>

                            </View><View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); } } style={[styles.formFrame, styles.lastFormFrame]}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Dagbók</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.paragraph}>ATH: Samkvæmt gildandi lögum um persónuvernd þá getur þjónustuþegi fengið afrit af öllum upplýsingum sem skrifaðar eru um hann.
                                            Starfsmenn skulu því vanda orðaval sitt. Ef þeir eru í vafa ber að hafa samband við deildarstjóra.</Text>
                                    <Text style={[styles.textInput, report.entry ? styles.greenBorder : styles.textInput]}>{report.entry || ''}</Text>
                                </View>
                                <Text style={styles.inputTitle}>Áríðandi upplýsingar</Text>
                                <><Checkbox
                                    style={styles.checkBox}
                                    value={incident.important }
                                    color={incident.important ? greenBlue : 'gainsboro'}
                                /></>
                            </View></>
                            : <></>
                        }
                        { incident && type === 'Atvikaskýrsla'
                            ? <><View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Almennar upplýsingar</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Dagsetning</Text>
                                    <Text style={[styles.input, incident.date ? styles.greenBorder : styles.input]}>{moment(new Date(incident.date)).format('DD/MM/YYYY')}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Deild</Text>
                                    <Text style={[styles.input, incident.department.name ? styles.greenBorder : styles.input]}>{incident.department.name || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                                    <Text style={[styles.input, incident.client.name ? styles.greenBorder : styles.input]}>{incident.client.name || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Notandi</Text>
                                    <Text style={[styles.input, incident.user.name ? styles.greenBorder : styles.input]}>{incident.user.name || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Tegund vaktar</Text>
                                    <Text style={[styles.input, incident.shift ? styles.greenBorder : styles.input]}>{incident.shift === 'day' ? 'Dagvakt' : incident.shift === 'evening' ? 'Kvöldvakt' : incident.shift === 'evening' ? 'Kvöldvakt' : 'Næturvakt'}</Text>
                                </View>
                            </View><View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Atvik</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Staðsetning atviks</Text>
                                    <Text style={[styles.input, incident.location ? styles.greenBorder : styles.input]}>{incident.location || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Atvik sem um ræðir</Text>
                                    <Text style={[styles.input, incident.type ? styles.greenBorder : styles.input]}>{incident.type || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Aðdragandi atviks</Text>
                                    <Text style={[styles.input, incident.before ? styles.greenBorder : styles.input]}>{incident.before || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Hvernig fór atvikið fram</Text>
                                    <Text style={[styles.textInput, incident.whatHappened ? styles.greenBorder : styles.textInput]}>{incident.whatHappened || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Hvernig var brugðist við atvikinu</Text>
                                    <Text style={[styles.textInput, incident.response ? styles.greenBorder : styles.textInput]}>{incident.response || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Hvað væri hægt að gera öðruvísi</Text>
                                    <Text style={[styles.textInput, incident.alternative ? styles.greenBorder : styles.textInput]}>{incident.alternative || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Meiddist einhver eða skemmdist eitthvað</Text>
                                    <View style={[styles.radioInput, damages === 'yes' && styles.greenBorder]}>
                                        <RadioButton
                                            value='yes'
                                            status={damages} />
                                        <Text>Já</Text>
                                    </View>
                                    <View style={[styles.radioInput, damages === 'no' && styles.greenBorder]}>
                                        <RadioButton
                                            value='no'
                                            status={damages} />
                                        <Text>Nei</Text>
                                    </View>
                                </View>
                                { damages === 'yes'
                                    ? <>
                                        <Text style={styles.inputTitle}>Lýsing á meiðslum eða skemdum</Text>
                                        <Text style={[styles.textInput, incident.damages ? styles.greenBorder : styles.textInput]}>{incident.damages || ''}</Text>
                                    </>
                                    : <></> }
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Aðrar athugasemdir</Text>
                                    <Text style={[styles.textInput, incident.other ? styles.greenBorder : styles.textInput]}>{incident.other || ''}</Text>
                                </View>
                                <Text style={styles.inputTitle}>Áríðandi upplýsingar</Text>
                                <><Checkbox
                                    style={styles.checkBox}
                                    value={incident.important }
                                    color={incident.important ? greenBlue : 'gainsboro'}
                                /></>

                            </View><View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); } } style={[styles.formFrame, styles.lastFormFrame]}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Líkamlegt unngrip</Text>
                                </View>
                                <Text style={styles.inputTitle}>Þurfti líkamlegt inngrip?</Text>
                                <View style={[styles.radioInput, coercion === 'yes' && styles.greenBorder]}>
                                    <RadioButton
                                        value="yes"
                                        status={coercion} />
                                    <Text>Já</Text>
                                </View>
                                <View style={[styles.radioInput, coercion === 'no' && styles.greenBorder]}>
                                    <RadioButton
                                        value="no"
                                        status={coercion} />
                                    <Text>Nei</Text>
                                </View>
                                { coercion === 'yes'
                                    ? <>
                                        <Text style={styles.inputTitle}>Lýsing á eðli inngrips</Text>
                                        <Text style={[styles.textInput, incident.coercion.description ? styles.greenBorder : styles.textInput]}>{incident.coercion.description || ''}</Text>
                                    </>
                                    : <></> }
                            </View></> 
                            : <></> }
                    </ScrollView>
                </>
            }
        </SafeAreaView>
    );
};

export default ReportDetail;
