import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View, ScrollView, TextInput, Keyboard } from 'react-native';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { editIncident, getIncidentById } from '../../services/incidentService';
import { editReport, getReportById } from '../../services/reportService';
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
import { beforeOptions, clientOptionsA, departmentOptionsA, shiftOptions, typeOptions } from '../../components/Options';

const ReportDetail = ({ 
    route,
    handleSection
}) => {
    const [departmentID, setDepartmentID] = useState('');
    const [clientID, setClientID] = useState('');
    const [shift, setShift] = useState('');
    const [onShift, setOnShift] = useState('');
    const [medicineChecked, setMedicineChecked] = useState('');
    const [walkChecked, setWalkChecked] = useState('');
    const [entry, setEntry] = useState('');
    const [important, setImportant] = useState(false);
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
    
    const [report, setReport] = useState({});

    useEffect(() => {
        (async () => {
            const departmentsData = await getAllDepartments();
            const clientsData = await getAllClients();
            setDepartments(departmentsData || []);
            setClients(clientsData.filter(client => client.client_department_pivot.departmentId === departmentID));
            // setDepartments(departmentsJson);
            // setClients(clientsJson);
        })();
    }, [isFocused, departmentID]);

    useEffect(() => {
        (async () => {
            setReport(await getReportById(id));
            // setReport(reportJson);
            setDepartmentID(report.department?.id);
            setClientID(report.client?.id);
            setShift(report.shift);
            setOnShift(report.onShift || '');
            setMedicineChecked(report.medicine ? 'yes' : 'no');
            setWalkChecked(!report.clientReason ? 'yes' : 'no');
            setEntry(report.entry || '');
            setImportant(report.important);
            setIsLoading(false);
        })();
    }, [isFocused]);

    const handleEditButtonClick = () => {
        setEditMode(true);
    };

    const handleCancelButtonClick = () => {
        // console.log('cancelled');
        setEditMode(false);
    };

    const handleSaveButtonClick = async () => {
        console.log('edited');
        const updatedReport = {
            date: report.date,
            departmentID,
            clientID,
            medicine: medicineChecked === 'yes' ? 'true' : 'false',
            clientReason: walkChecked === 'yes' ? '' : 'no',
            entry,
            shift,
            onShift
        };
        await editReport(id, updatedReport);
        setEditMode(false);
    };

    useEffect(() => {
        handleSection(section1, section2, section3);
    }, []);

    return (
        <>
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
                    </View>
                )}
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
                                value: report.department?.id
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
                                inputIOS: [styles.input, clientID !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, clientID !== '' ? styles.greenBorder : styles.input],
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
                                value: report.client?.id
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
                                label: shift === 'day' ? 'Dagvakt' : shift === 'evening' ? 'Kvöldvakt' : shift === 'night' ? 'Næturvakt' : '', 
                                value: shift
                            }}
                            onValueChange={(value) => setShift(value)}
                            items={shiftOptions}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        /></> 
                        : <><Text style={[styles.input, report.shift ? styles.greenBorder : styles.input]}>{shift === 'day' ? 'Dagvakt' : shift === 'evening' ? 'Kvöldvakt' : shift === 'night' ? 'Næturvakt' : ''}</Text></>}
                                    
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Starfsmenn á vakt</Text>
                    { editMode 
                        ? <><TextInput
                            style={[styles.input, onShift ? styles.greenBorder : styles.input]}
                            placeholder={onShift}
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
        </>
    );
};

export default ReportDetail;
