import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View, ScrollView, TextInput, Keyboard } from 'react-native';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { getIncidentById } from '../../services/incidentService';
import { getReportById } from '../../services/reportService';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from '../../components/Spinner';
import styles from './styles';
import reportJson from '../../resources/report.json';
import incidentJson from '../../resources/incident.json';
import departmentsJson from '../../resources/departments.json';
import clientsJson from '../../resources/clients.json';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';
import Checkbox from 'expo-checkbox';
import { greenBlue } from '../../styles/colors';
import { clientOptionsA, departmentOptionsA, shiftOptions } from '../../components/Options';

const ReportDetail = ({ route }) => {
    const [departmentID, setDepartmentID] = useState('');
    const [clientID, setClientID] = useState('');
    const [shift, setShift] = useState('');
    const [onShift, setOnShift] = useState('');
    const [medicineChecked, setMedicineChecked] = useState('');
    const [walkChecked, setWalkChecked] = useState('');
    const [entry, setEntry] = useState('');
    const [incidentLocation, setIncidentLocation] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [incidentBefore, setIncidentBefore] = useState('');
    const [incidentWhatHappened, setIncidentWhatHappened] = useState('');
    const [incidentResponse, setIncidentResponse] = useState('');
    const [incidentAlternative, setIncidentAlternative] = useState('');
    const [damages, setDamages] = useState('');
    const [damagesInfo, setDamagesInfo] = useState('');
    const [incidentOther, setIncidentOther] = useState('');
    const [important, setImportant] = useState(false);
    const [coercion, setCoercion] = useState('');
    const [coercionDescription, setCoercionDescription] = useState('');
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const { id, type } = route.params;
    // const [type, setType] = useState('Atvikaskýrsla');
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const scrollViewRef = useRef();
    const [selectedSection, setSelectedSection] = useState('');
    const [editMode, setEditMode] = useState(false);

    const [departments, setDepartments] = useState([]);
    const [clients, setClients] = useState([]);
    
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
            const clientsData = await getAllClients();
            setDepartments(await getAllDepartments() || []);
            setClients(clientsData.filter(clientID => clientID.client_department_pivot.departmentId === departmentID));
            // setDepartments(departmentsJson);
            // setClients(clientsJson);
            if (type === 'Dagsskýrsla') {
                setReport(await getReportById(id));
                // setReport(reportJson);
                setDepartmentID(report.department?.name);
                setClientID(report.client?.name);
                setShift(report.shift === 'day' ? 'Dagvakt' : report.shift === 'evening' ? 'Kvöldvakt' : report.shift === 'night' ? 'Næturvakt' : '');
                setOnShift(report.onShift);
                setMedicineChecked(report.medicine ? 'yes' : 'no');
                setWalkChecked(report.clientReason ? 'yes' : 'no');
                setEntry(report.entry);
                setImportant(report.important);
                setIsLoading(false);
            } else if (type === 'Atvikaskýrsla') {
                setIncident(await getIncidentById(id));
                // setIncident(incidentJson);
                setDepartmentID(incident.department?.name);
                setClientID(incident.client?.name);
                setShift(incident.shift === 'day' ? 'Dagvakt' : incident.shift === 'evening' ? 'Kvöldvakt' : incident.shift === 'night' ? 'Næturvakt' : '');
                setOnShift(incident.onShift);
                setDamages(incident.damages ? 'yes' : 'no');
                setCoercion(incident.coercion ? 'yes' : 'no');
                setImportant(incident.important);
                setIsLoading(false);
            }
        })();
    }, [isFocused, report, incident]);

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

    const handleEditButtonClick = () => {
        setEditMode(true);
    };

    const handleDeleteButtonClick = () => {
        // console.log('deleted');
    };

    const handleCancelButtonClick = () => {
        // console.log('cancelled');
        setEditMode(false);
    };

    const handleSaveButtonClick = () => {
        // console.log('edited');
        setEditMode(false);
    };

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
                        {editMode
                            ? (
                                <View style={styles.buttons}>
                                    <TouchableOpacity style={styles.editButton} onPress={handleCancelButtonClick}>
                                        <Text style={styles.buttonText}>Hætta</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveButtonClick}>
                                        <Text style={styles.buttonText}>Vista</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            : (
                                <View style={styles.buttons}>
                                    <TouchableOpacity style={styles.editButton} onPress={handleEditButtonClick}>
                                        <Text style={styles.buttonText}>Breyta</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton}>
                                        <Text style={styles.buttonText}>Eyða</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
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
                                    { editMode
                                        ? <><RNPickerSelect
                                            useNativeAndroidPickerStyle={false}
                                            style={{
                                                inputIOS: [styles.input, departmentID !== '' ? styles.greenBorder : styles.input],
                                                inputAndroid: [styles.input, departmentID !== '' ? styles.greenBorder : styles.input],
                                                iconContainer: {
                                                    top: 25,
                                                    right: 20
                                                },
                                                placeholder: {
                                                    color: 'black'
                                                }
                                            }}
                                            placeholder={{ 
                                                label: report.department?.name, 
                                                value: report.department?.name
                                            }}
                                            onValueChange={(value) => setDepartmentID(value)}
                                            items={departmentOptionsA(departments)}
                                            Icon={() => {
                                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                                            }}
                                        /></>
                                        : <><Text style={[styles.input, report.department?.name ? styles.greenBorder : styles.input]}>{report.department?.name || ''}</Text></>}
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                                    { editMode 
                                        ? <><RNPickerSelect
                                            useNativeAndroidPickerStyle={false}
                                            style={{
                                                inputIOS: [styles.input, departmentID !== '' ? styles.greenBorder : styles.input],
                                                inputAndroid: [styles.input, departmentID !== '' ? styles.greenBorder : styles.input],
                                                iconContainer: {
                                                    top: 25,
                                                    right: 20
                                                },
                                                placeholder: {
                                                    color: 'black'
                                                }
                                            }}
                                            placeholder={{ 
                                                label: report.client?.name, 
                                                value: report.client?.name
                                            }}
                                            onValueChange={(value) => setClientID(value)}
                                            items={clientOptionsA(clients)}
                                            Icon={() => {
                                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                                            }}
                                        /></> 
                                        : <><Text style={[styles.input, report.client?.name ? styles.greenBorder : styles.input]}>{report.client?.name || ''}</Text></>}
                                    
                                </View>
                                { editMode 
                                    ? <></> 
                                    : <><View style={styles.detailItem}>
                                        <Text style={styles.inputTitle}>Notandi</Text>
                                        <Text style={[styles.input, report.user?.name ? styles.greenBorder : styles.input]}>{report.user?.name || ''}</Text>
                                    </View></> }
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Tegund vaktar</Text>
                                    { editMode 
                                        ? <><RNPickerSelect
                                            useNativeAndroidPickerStyle={false}
                                            style={{
                                                inputIOS: [styles.input, shift !== '' ? styles.greenBorder : styles.input],
                                                inputAndroid: [styles.input, shift !== '' ? styles.greenBorder : styles.input],
                                                iconContainer: {
                                                    top: 25,
                                                    right: 20
                                                },
                                                placeholder: {
                                                    color: 'black'
                                                }
                                            }}
                                            placeholder={{ 
                                                label: shift, 
                                                value: shift
                                            }}
                                            onValueChange={(value) => setShift(value)}
                                            items={shiftOptions}
                                            Icon={() => {
                                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                                            }}
                                        /></> 
                                        : <><Text style={[styles.input, report.shift ? styles.greenBorder : styles.input]}>{shift}</Text></>}
                                    
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Starfsmenn á vakt</Text>
                                    { editMode 
                                        ? <><TextInput
                                            style={[styles.input, onShift ? styles.greenBorder : styles.input]}
                                            placeholder={shift}
                                            keyboardType="default"
                                            value={onShift}
                                            onChangeText={setOnShift}
                                        /></>
                                        : <><Text style={[styles.input, report.onShift ? styles.greenBorder : styles.input]}>{report.onShift || ''}</Text></>}
                                </View>
                                <Text style={styles.inputTitle}>Lyf gefin?</Text>
                                { editMode 
                                    ? <><View style={[styles.radioInput, medicineChecked === 'yes' && styles.greenBorder]}>
                                        <RadioButton
                                            value="yes"
                                            status={medicineChecked}
                                            onPress={() => setMedicineChecked('yes')} />
                                        <Text>Já, eða á ekki við</Text>
                                    </View>
                                    <View style={[styles.radioInput, medicineChecked === 'no' && styles.greenBorder]}>
                                        <RadioButton
                                            value="no"
                                            status={medicineChecked}
                                            onPress={() => setMedicineChecked('no')} />
                                        <Text>Nei</Text>
                                    </View></> 
                                    : <><View style={[styles.radioInput, medicineChecked === 'yes' && styles.greenBorder]}>
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
                                    </View></>}
                            </View><View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Dagssamningar</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Fór hann í göngutúr</Text>
                                    { editMode
                                        ? <><View style={[styles.radioInput, walkChecked === 'yes' && styles.greenBorder]}>
                                            <RadioButton
                                                value="yes"
                                                status={walkChecked}
                                                onPress={() => setWalkChecked('yes')} />
                                            <Text>Já</Text>
                                        </View>
                                        <View style={[styles.radioInput, walkChecked === 'no' && styles.greenBorder]}>
                                            <RadioButton
                                                value="no"
                                                status={walkChecked}
                                                onPress={() => setWalkChecked('no')} />
                                            <Text>Nei</Text>
                                        </View></>
                                        : <><View style={[styles.radioInput, walkChecked === 'yes' && styles.greenBorder]}>
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
                                        </View></>}
                                    
                                </View>

                            </View><View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); } } style={[styles.formFrame, styles.lastFormFrame]}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Dagbók</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.paragraph}>ATH: Samkvæmt gildandi lögum um persónuvernd þá getur þjónustuþegi fengið afrit af öllum upplýsingum sem skrifaðar eru um hann.
                                            Starfsmenn skulu því vanda orðaval sitt. Ef þeir eru í vafa ber að hafa samband við deildarstjóra.</Text>
                                    { editMode 
                                        ? <><TextInput
                                            style={[styles.textInput, entry ? styles.greenBorder : styles.textInput]}
                                            keyboardType="default"
                                            multiline={true}
                                            onPress={() => Keyboard.dismiss()}
                                            value={entry}
                                            onChangeText={setEntry}
                                            textAlignVertical='top'
                                        /></> 
                                        : <><Text style={[styles.textInput, report.entry ? styles.greenBorder : styles.textInput]}>{report.entry || ''}</Text></>}
                                </View>
                                <View style={styles.important}>
                                    <Text style={styles.inputTitle}>Áríðandi upplýsingar</Text>
                                    { editMode
                                        ? <><Checkbox
                                            style={styles.checkBox}
                                            value={important}  
                                            onValueChange={setImportant}
                                            color={important ? greenBlue : 'gainsboro'}
                                        /></>
                                        : <><Checkbox
                                            style={styles.checkBox}
                                            value={report.important}
                                            color={report.important ? greenBlue : 'gainsboro'}
                                        /></>}
                                </View>
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
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.input, incident.department?.name ? styles.greenBorder : styles.input]}>{incident.department?.name || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.input, incident.client?.name ? styles.greenBorder : styles.input]}>{incident.client?.name || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Notandi</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.input, incident.user?.name ? styles.greenBorder : styles.input]}>{incident.user?.name || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Tegund vaktar</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.input, incident.shift ? styles.greenBorder : styles.input]}>{shift}</Text>
                                </View>
                            </View><View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Atvik</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Staðsetning atviks</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.input, incident.location ? styles.greenBorder : styles.input]}>{incident.location || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Atvik sem um ræðir</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.input, incident.type ? styles.greenBorder : styles.input]}>{incident.type || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Aðdragandi atviks</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.input, incident.before ? styles.greenBorder : styles.input]}>{incident.before || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Hvernig fór atvikið fram</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.textInput, incident.whatHappened ? styles.greenBorder : styles.textInput]}>{incident.whatHappened || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Hvernig var brugðist við atvikinu</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.textInput, incident.response ? styles.greenBorder : styles.textInput]}>{incident.response || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Hvað væri hægt að gera öðruvísi</Text>
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.textInput, incident.alternative ? styles.greenBorder : styles.textInput]}>{incident.alternative || ''}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Meiddist einhver eða skemmdist eitthvað</Text>
                                    { editMode ? <></> : <></>}
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
                                    { editMode ? <></> : <></>}
                                    <Text style={[styles.textInput, incident.other ? styles.greenBorder : styles.textInput]}>{incident.other || ''}</Text>
                                </View>
                                <View style={styles.important}>
                                    <Text style={styles.inputTitle}>Áríðandi upplýsingar</Text>
                                    { editMode ? <></> : <></>}
                                    <><Checkbox
                                        style={styles.checkBox}
                                        value={incident.important}
                                        color={incident.important ? greenBlue : 'gainsboro'}
                                    /></>
                                </View>

                            </View><View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); } } style={[styles.formFrame, styles.lastFormFrame]}>
                                <View style={styles.titleWrapper}>
                                    <Text style={styles.title}>Líkamlegt inngrip</Text>
                                </View>
                                <Text style={styles.inputTitle}>Þurfti líkamlegt inngrip?</Text>
                                { editMode ? <></> : <></>}
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
                                        <Text style={[styles.textInput, incident.coercion?.description ? styles.greenBorder : styles.textInput]}>{incident?.coercion?.description || ''}</Text>
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
