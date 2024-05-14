import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, Keyboard } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import RadioButton from '../../components/RadioButton';
import styles from './styles';
import { createReport } from '../../services/reportService';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { greenBlue } from '../../styles/colors';
import { clientOptionsA, departmentOptionsA, shiftOptions } from '../../components/Options';
import departmentsJson from '../../resources/departments.json';
import clientsJson from '../../resources/clients.json';
import usersJson from '../../resources/users.json';

const ReportModal = ({
    navigate,
    handleSection,
    handleIsReportEmpty,
    handleIsDeptOrClientEmpty,
    handleCreateNewReportFunc
}) => {
    const date = new Date();
    const [departmentID, setDepartmentID] = useState('');
    const [clientID, setClientID] = useState('');
    const [shift, setShift] = useState('');
    const [onShift, setOnShift] = useState('');
    const [medicineChecked, setMedicineChecked] = useState('');
    const [walkChecked, setWalkChecked] = useState('');
    const [entry, setEntry] = useState('');
    const [important, setImportant] = useState(false);
        
    const isDeptOrClientEmpty = departmentID === '' || clientID === '';
    const isEmpty = isDeptOrClientEmpty || shift === '' || medicineChecked === '' || walkChecked === '';

    const isFocused = useIsFocused();
    const [departments, setDepartments] = useState([]);
    const [clients, setClients] = useState([]);

    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();

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

    const createNewReport = async (isDraft) => {
        const report = {
            date,
            departmentID,
            clientID,
            draft: isDraft ? 'true' : 'false',
            medicine: medicineChecked === 'yes' ? 'true' : 'false',
            clientReason: walkChecked === 'yes' ? '' : 'no',
            entry,
            shift,
            onShift
        };
        const isCreated = await createReport(report);
        if (isCreated) {
            isDraft ? navigate('Drafts') : navigate('AllReports');
        }
    };

    const updateIsEmpty = () => {
        handleIsReportEmpty(isEmpty);
    };

    const updateIsDeptOrClientEmpty = () => {
        handleIsDeptOrClientEmpty(isDeptOrClientEmpty);
    };

    useEffect(() => {
        updateIsEmpty();
        handleCreateNewReportFunc(createNewReport);
    }, [departmentID, clientID, shift, medicineChecked, walkChecked]);

    useEffect(() => {
        updateIsDeptOrClientEmpty();
        handleCreateNewReportFunc(createNewReport);
    }, [departmentID, clientID]);

    useEffect(() => {
        handleSection(section1, section2, section3);
    }, []);

    return (
        <>
            <View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Almennar upplýsingar</Text>
                </View>
                <Text style={styles.inputTitle}>Deild</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{
                        inputIOS: [styles.input, departmentID !== '' ? styles.greenBorder : styles.input],
                        inputAndroid: [styles.input, departmentID !== '' ? styles.greenBorder : styles.input],
                        iconContainer: {
                            top: 25,
                            right: 20
                        }
                    }}
                    placeholder={{ 
                        label: 'Veldu deild', 
                        value: ''
                    }}
                    onValueChange={(value) => setDepartmentID(value)}
                    items={departmentOptionsA(departments)}
                    Icon={() => {
                        return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                    }}
                />
                <Text style={styles.inputTitle}>þjónustuþegi</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{
                        inputIOS: [styles.input, clientID !== '' ? styles.greenBorder : styles.input],
                        inputAndroid: [styles.input, clientID !== '' ? styles.greenBorder : styles.input],
                        iconContainer: {
                            top: 25,
                            right: 20
                        }
                    }}
                    placeholder={{ 
                        label: 'Veldu þjónustuþega', 
                        value: '' 
                    }}
                    onValueChange={(value) => setClientID(value)}
                    items={clientOptionsA(clients)}
                    Icon={() => {
                        return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                    }}
                />
                <Text style={styles.inputTitle}>Tegund vaktar</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={{
                        inputIOS: [styles.input, shift !== '' ? styles.greenBorder : styles.input],
                        inputAndroid: [styles.input, shift !== '' ? styles.greenBorder : styles.input],
                        iconContainer: {
                            top: 25,
                            right: 20
                        }
                    }}
                    placeholder={{ 
                        label: 'Veldu vakt', 
                        value: '' 
                    }}
                    onValueChange={(value) => setShift(value)}
                    items={shiftOptions}
                    Icon={() => {
                        return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                    }}
                />
                <Text style={styles.inputTitle}>Starfsmenn á vakt</Text>
                <TextInput
                    style={[styles.input, onShift ? styles.greenBorder : styles.input]}
                    placeholder="Skrifaðu inn nöfn starfsmanna"
                    keyboardType="default"
                    value={onShift}
                    onChangeText={setOnShift}
                />
                <Text style={styles.inputTitle}>Voru lyf gefin?</Text>
                <View style={[styles.radioInput, medicineChecked === 'yes' && styles.greenBorder]}>
                    <RadioButton
                        value="yes"
                        status={medicineChecked}
                        onPress={() => setMedicineChecked('yes')}
                    />
                    <Text>Já</Text>
                </View>
                <View style={[styles.radioInput, medicineChecked === 'no' && styles.greenBorder]}>
                    <RadioButton
                        value="no"
                        status={medicineChecked}
                        onPress={() => setMedicineChecked('no')}
                    />
                    <Text>Nei</Text>
                </View>
                <View style={[styles.radioInput, medicineChecked === 'notRelevant' && styles.greenBorder]}>
                    <RadioButton
                        value="notRelevant"
                        status={medicineChecked}
                        onPress={() => setMedicineChecked('notRelevant')}
                    />
                    <Text>Á ekki við</Text>
                </View>
            </View>

            <View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Dagssamningar</Text>
                </View>
                <Text style={styles.inputTitle}>Fór hann í göngutúr?</Text>
                <View style={[styles.radioInput, walkChecked === 'yes' && styles.greenBorder]}>
                    <RadioButton
                        value="yes"
                        status={walkChecked}
                        onPress={() => setWalkChecked('yes')}
                    />
                    <Text>Já</Text>
                </View>
                <View style={[styles.radioInput, walkChecked === 'no' && styles.greenBorder]}>
                    <RadioButton
                        value="no"
                        status={walkChecked}
                        onPress={() => setWalkChecked('no')}
                    />
                    <Text>Nei</Text>
                </View>
            </View>
            <View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); }} style={[styles.formFrame, styles.lastFormFrame]}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Dagbók</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.paragraph}>ATH: Samkvæmt gildandi lögum um persónuvernd þá getur þjónustuþegi fengið afrit af öllum upplýsingum sem skrifaðar eru um hann.
                                    Starfsmenn skulu því vanda orðaval sitt. Ef þeir eru í vafa ber að hafa samband við deildarstjóra.</Text>
                    <TextInput
                        style={[styles.textInput, entry ? styles.greenBorder : styles.textInput]}
                        keyboardType="default"
                        multiline={true}
                        onPress={() => Keyboard.dismiss()}
                        value={entry}
                        onChangeText={setEntry}
                        textAlignVertical='top'
                    />
                </View>
                <View style={styles.important}>
                    <Text style={styles.inputTitle}>Áríðandi upplýsingar</Text>
                    <><Checkbox
                        style={styles.checkBox}
                        value={important}  
                        onValueChange={setImportant}
                        color={important ? greenBlue : 'gainsboro'}
                    /></>
                </View>
            </View>
        </>
    );
};

export default ReportModal;