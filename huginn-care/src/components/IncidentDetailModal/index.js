import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, TouchableOpacity, View, ScrollView, TextInput, Keyboard } from 'react-native';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { editIncident, getIncidentById } from '../../services/incidentService';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from '../../components/Spinner';
import styles from './styles';
import incidentJson from '../../resources/incident.json';
import departmentsJson from '../../resources/departments.json';
import clientsJson from '../../resources/clients.json';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';
import Checkbox from 'expo-checkbox';
import { greenBlue } from '../../styles/colors';
import { beforeOptions, clientOptionsA, departmentOptionsA, shiftOptions, typeOptions } from '../../components/Options';

const ReportDetail = ({ route }) => {
    const [departmentID, setDepartmentID] = useState('');
    const [clientID, setClientID] = useState('');
    const [shift, setShift] = useState('');
    const [onShift, setOnShift] = useState('');
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
            setIncident(await getIncidentById(id));
            // setIncident(incidentJson);
            setDepartmentID(incident.department?.id);
            setClientID(incident.client?.id);
            setShift(incident.shift);
            setIncidentLocation(incident.location || '');
            setIncidentType(incident.type);
            setIncidentBefore(incident.before || '');
            setIncidentWhatHappened(incident.whatHappened || '');
            setIncidentResponse(incident.response || '');
            setIncidentAlternative(incident.alternative || '');
            setDamages(incident.damages ? 'yes' : 'no');
            setDamagesInfo(incident?.damages);
            setIncidentOther(incident.other || '');
            setImportant(incident.important);
            setCoercion(incident.coercion ? 'yes' : 'no');
            setCoercionDescription(incident.coercion?.description || '');
            setIsLoading(false);
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

    const handleEditButtonClick = () => {
        setEditMode(true);
    };

    const handleCancelButtonClick = () => {
        // console.log('cancelled');
        setEditMode(false);
    };

    const handleSaveButtonClick = async () => {
        const updatedIncident = {
            date: incident.date,
            incidentDepartmentID: departmentID,
            clientID,
            incidentAlternative,
            incidentBefore,
            isCoercion: coercion ? 'true' : 'false', 
            coercionDescription, 
            incidentDamages: damages ? damagesInfo : '',
            important,
            incidentLocation,
            incidentOther,
            incidentResponse,
            incidentType,
            incidentWhatHappened,
            incidentShift: shift
        };
        await editIncident(id, updatedIncident);
        setEditMode(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading // !report
                ? <Spinner /> 
                : <>
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
                                </View>
                            )}
                        <View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>Almennar upplýsingar</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Dagsetning</Text>
                                <Text style={[styles.input, incident.date ? styles.greenBorder : styles.input]}>{moment(new Date(incident.date)).format('DD/MM/YYYY')}</Text>
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
                                            label: incident.department?.name, 
                                            value: incident.department?.id
                                        }}
                                        onValueChange={(value) => setDepartmentID(value)}
                                        items={departmentOptionsA(departments)}
                                        Icon={() => {
                                            return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                                        }}
                                    /></> 
                                    : <><Text style={[styles.input, incident.department?.name ? styles.greenBorder : styles.input]}>{incident.department?.name || ''}</Text></>}
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
                                            label: incident.client?.name, 
                                            value: incident.client?.id
                                        }}
                                        onValueChange={(value) => setClientID(value)}
                                        items={clientOptionsA(clients)}
                                        Icon={() => {
                                            return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                                        }}
                                    /></>  
                                    : <><Text style={[styles.input, incident.client?.name ? styles.greenBorder : styles.input]}>{incident.client?.name || ''}</Text></>}
                            </View>
                            { editMode 
                                ? <></> 
                                : <><View style={styles.detailItem}>
                                    <Text style={styles.inputTitle}>Notandi</Text>
                                    <Text style={[styles.input, incident.user?.name ? styles.greenBorder : styles.input]}>{incident.user?.name || ''}</Text>
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
                                    : <><Text style={[styles.input, incident.shift ? styles.greenBorder : styles.input]}>{shift === 'day' ? 'Dagvakt' : shift === 'evening' ? 'Kvöldvakt' : shift === 'night' ? 'Næturvakt' : ''}</Text></>}
                            </View>
                        </View><View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>Atvik</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Staðsetning atviks</Text>
                                { editMode 
                                    ? <><TextInput
                                        style={[styles.input, incidentLocation ? styles.greenBorder : styles.input]}
                                        placeholder={incidentLocation}
                                        keyboardType="default"
                                        value={incidentLocation}
                                        onChangeText={setIncidentLocation}
                                    /></>
                                    : <><Text style={[styles.input, incident.location ? styles.greenBorder : styles.input]}>{incident.location || ''}</Text></>}
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Atvik sem um ræðir</Text>
                                { editMode 
                                    ? <><RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        style={{
                                            inputIOS: [styles.input, incidentType !== '' ? styles.greenBorder : styles.input],
                                            inputAndroid: [styles.input, incidentType !== '' ? styles.greenBorder : styles.input],
                                            iconContainer: {
                                                top: 25,
                                                right: 20
                                            },
                                            placeholder: {
                                                color: 'black'
                                            }
                                        }}
                                        placeholder={{ 
                                            label: incident.type, 
                                            value: incident.type 
                                        }}
                                        onValueChange={(value) => setIncidentType(value)}
                                        items={typeOptions}
                                        Icon={() => {
                                            return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                                        }}
                                    /></> 
                                    : <><Text style={[styles.input, incident.type ? styles.greenBorder : styles.input]}>{incident.type || ''}</Text></>}
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Aðdragandi atviks</Text>
                                { editMode 
                                    ? <><RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        style={{
                                            inputIOS: [styles.input, incidentBefore !== '' ? styles.greenBorder : styles.input],
                                            inputAndroid: [styles.input, incidentBefore !== '' ? styles.greenBorder : styles.input],
                                            iconContainer: {
                                                top: 25,
                                                right: 20
                                            },
                                            placeholder: {
                                                color: 'black'
                                            }
                                        }}
                                        placeholder={{ 
                                            label: incident.before, 
                                            value: incident.before 
                                        }}
                                        onValueChange={(value) => setIncidentBefore(value)}
                                        items={beforeOptions}
                                        Icon={() => {
                                            return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                                        }}
                                    /></> 
                                    : <><Text style={[styles.input, incident.before ? styles.greenBorder : styles.input]}>{incident.before || ''}</Text></>}
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Hvernig fór atvikið fram</Text>
                                { editMode 
                                    ? <><TextInput
                                        style={[styles.textInput, incidentWhatHappened ? styles.greenBorder : styles.textInput]}
                                        keyboardType="default"
                                        multiline={true}
                                        onPress={() => Keyboard.dismiss()}
                                        value={incidentWhatHappened}
                                        onChangeText={setIncidentWhatHappened}
                                        textAlignVertical='top'
                                    /></> 
                                    : <><Text style={[styles.textInput, incident.whatHappened ? styles.greenBorder : styles.textInput]}>{incident.whatHappened || ''}</Text></>}
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Hvernig var brugðist við atvikinu</Text>
                                { editMode 
                                    ? <><TextInput
                                        style={[styles.textInput, incidentResponse ? styles.greenBorder : styles.textInput]}
                                        keyboardType="default"
                                        multiline={true}
                                        onPress={() => Keyboard.dismiss()}
                                        value={incidentResponse}
                                        onChangeText={setIncidentResponse}
                                        textAlignVertical='top'
                                    /></> 
                                    : <><Text style={[styles.textInput, incident.response ? styles.greenBorder : styles.textInput]}>{incident.response || ''}</Text></>}
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Hvað væri hægt að gera öðruvísi</Text>
                                { editMode 
                                    ? <><TextInput
                                        style={[styles.textInput, incidentAlternative ? styles.greenBorder : styles.textInput]}
                                        keyboardType="default"
                                        multiline={true}
                                        onPress={() => Keyboard.dismiss()}
                                        value={incidentAlternative}
                                        onChangeText={setIncidentAlternative}
                                        textAlignVertical='top'
                                    /></> 
                                    : <><Text style={[styles.textInput, incident.alternative ? styles.greenBorder : styles.textInput]}>{incident.alternative || ''}</Text></>}
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Meiddist einhver eða skemmdist eitthvað</Text>
                                { editMode 
                                    ? <><View style={[styles.radioInput, damages === 'yes' && styles.greenBorder]}>
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
                                    </View></> 
                                    : <><View style={[styles.radioInput, damages === 'yes' && styles.greenBorder]}>
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
                                    </View></>}
                            </View>
                            { damages === 'yes'
                                ? <> 
                                    <Text style={styles.inputTitle}>Lýsing á meiðslum eða skemdum</Text>
                                    { editMode 
                                        ? <><TextInput
                                            style={[styles.textInput, damagesInfo ? styles.greenBorder : styles.textInput]}
                                            placeholder=""
                                            keyboardType="default"
                                            multiline={true}
                                            onPress={() => Keyboard.dismiss()}
                                            value={damagesInfo}
                                            onChangeText={setDamagesInfo} /></> 
                                        : <><Text style={[styles.textInput, incident.damages ? styles.greenBorder : styles.textInput]}>{incident.damages || ''}</Text></>}
                                </>
                                : <></> }
                            <View style={styles.detailItem}>
                                <Text style={styles.inputTitle}>Aðrar athugasemdir</Text>
                                { editMode 
                                    ? <><TextInput
                                        style={[styles.textInput, incidentOther ? styles.greenBorder : styles.textInput]}
                                        keyboardType="default"
                                        multiline={true}
                                        onPress={() => Keyboard.dismiss()}
                                        value={incidentOther}
                                        onChangeText={setIncidentOther}
                                        textAlignVertical='top'
                                    /></> 
                                    : <><Text style={[styles.textInput, incident.other ? styles.greenBorder : styles.textInput]}>{incident.other || ''}</Text></>}
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
                                        value={incident.important}
                                        color={incident.important ? greenBlue : 'gainsboro'}
                                    /></>}
                            </View>

                        </View><View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); } } style={[styles.formFrame, styles.lastFormFrame]}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>Líkamlegt inngrip</Text>
                            </View>
                            <Text style={styles.inputTitle}>Þurfti líkamlegt inngrip?</Text>
                            { editMode 
                                ? <><View style={[styles.radioInput, coercion === 'yes' && styles.greenBorder]}>
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
                                </View></> 
                                : <><View style={[styles.radioInput, coercion === 'yes' && styles.greenBorder]}>
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
                                </View></>}
                                
                            { coercion === 'yes'
                                ? <> 
                                    { editMode 
                                        ? <><Text style={styles.inputTitle}>Lýsing á eðli inngrips</Text><TextInput
                                            style={[styles.textInput, coercionDescription ? styles.greenBorder : styles.textInput]}
                                            placeholder=""
                                            keyboardType="default"
                                            multiline={true}
                                            onPress={() => Keyboard.dismiss()}
                                            value={coercionDescription}
                                            onChangeText={setCoercionDescription} /></> 
                                        : <><Text style={styles.inputTitle}>Lýsing á eðli inngrips</Text>
                                            <Text style={[styles.textInput, incident.coercion?.description ? styles.greenBorder : styles.textInput]}>{incident?.coercion?.description || ''}</Text></> }
                                </>
                                : <></> }
                        </View>
                    </ScrollView>
                </>
            }
        </SafeAreaView>
    );
};

export default ReportDetail;