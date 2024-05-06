import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, Keyboard } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import RadioButton from '../../components/RadioButton';
import styles from './styles';
import { createIncident } from '../../services/incidentService';
import { createReport } from '../../services/reportService';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { getAllUsers } from '../../services/userService';
import { greenBlue } from '../../styles/colors';
import { beforeOptions, categoryOptionsA, clientOptionsA, departmentOptionsA, pageOptions, shiftOptions, typeOptions, userOptions } from '../../components/Options';
import departmentsJson from '../../resources/departments.json';
import clientsJson from '../../resources/clients.json';
import usersJson from '../../resources/users.json';

const NewReport = ({ navigation: { navigate } }) => {
    const date = new Date();
    const [reportType, setReportType] = useState('');
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
    const scrollViewRef = useRef();
    const [selectedSection, setSelectedSection] = useState('');
    const isDeptOrClientEmpty = departmentID === '' || clientID === '';
    const isDayReportEmpty = reportType === 'day' && (isDeptOrClientEmpty || shift === '' || medicineChecked === '' || walkChecked === '');
    const isIncidentEmpty = reportType === 'incident' && (isDeptOrClientEmpty || shift === '' || incidentLocation === '' || incidentType === '' ||
    incidentBefore === '' || incidentWhatHappened === '' || incidentResponse === '' || (damages === 'yes' && damagesInfo === '') || incidentAlternative === '' || incidentOther === '' || (coercion === 'yes' && coercionDescription === ''));
    const isEmpty = reportType === '' || isDayReportEmpty || isIncidentEmpty;

    const isFocused = useIsFocused();
    const [departments, setDepartments] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        (async () => {
            // const clientsData = await getAllClients();
            // setDepartments(await getAllDepartments() || []);
            // setClients(clientsData.filter(clientID => clientID.client_department_pivot.departmentId === departmentID));
            setDepartments(departmentsJson);
            setClients(clientsJson);
        })();
    }, [isFocused, departmentID]);

    const scrollToSection = (section) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: section, animated: true });
        }
    };

    const handleSectionSelection = (section) => {
        setSelectedSection(section);
        scrollToSection(section);
    };

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

    const createNewReport = async (isDraft) => {
        const report = {
            date,
            departmentID,
            clientID,
            draft: isDraft ? 'true' : 'false'
        };
        if (reportType === 'day') {
            const day = {
                ...report,
                medicine: medicineChecked ? 'true' : 'false',
                clientReason: walkChecked ? '' : '',
                entry,
                shift,
                onShift
            };
            const isCreated = await createReport(day);
            if (isCreated) {
                isDraft ? navigate('Drafts') : navigate('AllReports');
            }
        } if (reportType === 'incident') {
            const incident = {
                ...report,
                incidentAlternative,
                incidentBefore,
                isCoercion: coercion ? 'true' : 'false', 
                coercionDescription, 
                incidentDamages: damages ? damagesInfo : '',
                date,
                important,
                incidentLocation,
                incidentOther,
                incidentResponse,
                incidentType,
                incidentWhatHappened,
                incidentShift: shift
            };
            const isCreated = await createIncident(incident);
            if (isCreated) {
                isDraft ? navigate('Drafts') : navigate('AllReports');
            }
        }
    };

    useEffect(() => {
        // Reset state variables based on reportType change
        if (reportType === '' || reportType === 'day' || reportType === 'incident') {
            setDepartmentID('');
            setClientID('');
            setShift('');
            setOnShift('');
            setMedicineChecked('');
            setWalkChecked('');
            setEntry('');
            setIncidentLocation('');
            setIncidentBefore('');
            setIncidentType('');
            setIncidentWhatHappened('');
            setIncidentResponse('');
            setIncidentAlternative('');
            setIncidentOther('');
            setImportant(false);
        }
    }, [reportType]);

    return (
        <SafeAreaView style={styles.container}>
            { reportType === 'day'
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
            { reportType === 'incident'
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
                <View style={styles.formFrame}>
                    <Text style={styles.input}>{ date.toLocaleDateString('en-GB') }</Text>
                </View>
                <View style={styles.formFrame}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={{
                            inputIOS: [styles.input, reportType !== '' ? styles.greenBorder : styles.input],
                            inputAndroid: [styles.input, reportType !== '' ? styles.greenBorder : styles.input],
                            iconContainer: {
                                top: 25,
                                right: 20
                            }
                        }}
                        placeholder={{ 
                            label: 'Veldu tegund skýrslu', 
                            value: '' 
                        }}
                        onValueChange={(value) => setReportType(value)}
                        items={categoryOptionsA}
                        Icon={() => {
                            return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                        }}
                    />
                </View>
                { reportType === 'day'
                    ? <><View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                        
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
                    </View>
                    </>
                    : <></>
                }
                { reportType === 'incident'
                    ? <><View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); }} style={styles.formFrame}>
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
                                label: 'Veldu tegund vaktar', 
                                value: '' 
                            }}
                            onValueChange={(value) => setShift(value)}
                            items={shiftOptions}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                    </View>

                    <View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Atvik</Text>
                        </View>
                        <Text style={styles.inputTitle}>Staðsetning atviks</Text>
                        <TextInput
                            style={[styles.input, incidentLocation ? styles.greenBorder : styles.input]}
                            placeholder=""
                            keyboardType="default"
                            value={incidentLocation}
                            onChangeText={setIncidentLocation}
                        />
                        <Text style={styles.inputTitle}>Atvik sem um ræðir</Text>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            style={{
                                inputIOS: [styles.input, incidentType !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, incidentType !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu tegund', 
                                value: '' 
                            }}
                            onValueChange={(value) => setIncidentType(value)}
                            items={typeOptions}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>Aðdragandi atviks</Text>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            style={{
                                inputIOS: [styles.input, incidentBefore !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, incidentBefore !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu aðdraganda', 
                                value: '' 
                            }}
                            onValueChange={(value) => setIncidentBefore(value)}
                            items={beforeOptions}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>Hvernig fór atvikið fram</Text>
                        <TextInput
                            style={[styles.textInput, incidentWhatHappened ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={incidentWhatHappened}
                            onChangeText={setIncidentWhatHappened}
                            textAlignVertical='top'
                        />
                        <Text style={styles.inputTitle}>Hvernig var brugðist við atvikinu</Text>
                        <TextInput
                            style={[styles.textInput, incidentResponse ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={incidentResponse}
                            onChangeText={setIncidentResponse}
                            textAlignVertical='top'
                        />
                        <Text style={styles.inputTitle}>Hvað væri hægt að gera öðruvísi</Text>
                        <TextInput
                            style={[styles.textInput, incidentAlternative ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={incidentAlternative}
                            onChangeText={setIncidentAlternative}
                            textAlignVertical='top'
                        />
                        <Text style={styles.inputTitle}>Meiddist einhver eða skemmdist eitthvað</Text>
                        <View style={[styles.radioInput, damages === 'yes' && styles.greenBorder]}>
                            <RadioButton
                                value="yes"
                                status={damages}
                                onPress={() => setDamages('yes')}
                            />
                            <Text>Já</Text>
                        </View>
                        <View style={[styles.radioInput, damages === '' && styles.greenBorder]}>
                            <RadioButton
                                value=""
                                status={damages}
                                onPress={() => setDamages('')}
                            />
                            <Text>Nei</Text>
                        </View>
                        { damages === 'yes'
                            ? <>
                                <Text style={styles.inputTitle}>Lýsing á meiðslum eða skemdum</Text><TextInput
                                    style={[styles.textInput, damagesInfo ? styles.greenBorder : styles.textInput]}
                                    placeholder=""
                                    keyboardType="default"
                                    multiline={true}
                                    onPress={() => Keyboard.dismiss()}
                                    value={damagesInfo}
                                    onChangeText={setDamagesInfo} /></>
                            : <></> }
                        <Text style={styles.inputTitle}>Aðrar athugasemdir</Text>
                        <TextInput
                            style={[styles.textInput, incidentOther ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={incidentOther}
                            onChangeText={setIncidentOther}
                            textAlignVertical='top'
                        />
                        <Text style={styles.inputTitle}>Áríðandi upplýsingar</Text>
                        <><Checkbox
                            style={styles.checkBox}
                            value={important}  
                            onValueChange={setImportant}
                            color={important ? greenBlue : 'gainsboro'}
                        /></>
                    </View>
                    <View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); }} style={[styles.formFrame, styles.lastFormFrame]}>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>Líkamlegt inngrip</Text>
                        </View>
                        <Text style={styles.inputTitle}>Þurfti líkamlegt inngrip?</Text>
                        <View style={[styles.radioInput, coercion === 'yes' && styles.greenBorder]}>
                            <RadioButton
                                value="yes"
                                status={coercion}
                                onPress={() => setCoercion('yes')}
                            />
                            <Text>Já</Text>
                        </View>
                        <View style={[styles.radioInput, coercion === '' && styles.greenBorder]}>
                            <RadioButton
                                value=""
                                status={coercion}
                                onPress={() => setCoercion('')}
                            />
                            <Text>Nei</Text>
                        </View>
                        { coercion === 'yes'
                            ? <>
                                <Text style={styles.inputTitle}>Lýsing á eðli inngrips</Text><TextInput
                                    style={[styles.textInput, coercionDescription ? styles.greenBorder : styles.textInput]}
                                    placeholder=""
                                    keyboardType="default"
                                    multiline={true}
                                    onPress={() => Keyboard.dismiss()}
                                    value={coercionDescription}
                                    onChangeText={setCoercionDescription} /></>
                            : <></> }
                    </View>
                    </>
                    : <></>
                }
            </ScrollView>
            <TouchableOpacity
                style={isDeptOrClientEmpty ? styles.disabledButton2 : styles.button2}
                onPress={() => createNewReport(true)}
                disabled={isDeptOrClientEmpty}>
                <Text style={styles.buttonText}>Vista sem drög</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={isEmpty ? styles.disabledButton : styles.button}
                onPress={() => createNewReport(false)}
                disabled={isEmpty}>
                <Text style={styles.buttonText}>Stofna skýrslu  <Text style={styles.plus}>+</Text></Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default NewReport;