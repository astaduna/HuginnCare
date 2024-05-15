import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../components/LoginModal/user';
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, Keyboard } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import RadioButton from '../../components/RadioButton';
import styles from './styles';
import { createIncident } from '../../services/incidentService';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { greenBlue } from '../../styles/colors';
import { beforeOptions, clientOptionsA, departmentOptionsA, shiftOptions, typeOptions } from '../../components/Options';

const IncidentModal = ({
    navigate,
    handleSection,
    handleIsIncidentEmpty,
    handleIsDeptOrClientEmpty,
    handleCreateNewIncidentFunc
}) => {
    const currentUser = useRecoilValue(userState);
    const date = new Date();
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
    
    const isDeptOrClientEmpty = departmentID === '' || clientID === '';
    const isEmpty = isDeptOrClientEmpty || shift === '' || incidentLocation === '' || incidentType === '' ||
    incidentBefore === '' || incidentWhatHappened === '' || incidentResponse === '' || (damages === 'yes' && damagesInfo === '') || 
    incidentAlternative === '' || (coercion === 'yes' && coercionDescription === '');

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
            setDepartments(currentUser.thisUser.type === 'user' ? currentUser.thisUser.departments : departmentsData);
            setClients(clientsData.filter(clientID => clientID.client_department_pivot.departmentId === departmentID));
        })();
    }, [isFocused, departmentID]);

    const createNewIncident = async (isDraft) => {
        const incident = {
            date,
            departmentID,
            clientID,
            draft: isDraft ? 'true' : 'false',
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
        const isCreated = await createIncident(incident);
        if (isCreated) {
            isDraft ? navigate('Drafts') : navigate('AllReports');
        }
    };

    const updateIsEmpty = () => {
        handleIsIncidentEmpty(isEmpty);
    };

    const updateIsDeptOrClientEmpty = () => {
        handleIsDeptOrClientEmpty(isDeptOrClientEmpty);
    };

    useEffect(() => {
        updateIsEmpty();
        handleCreateNewIncidentFunc(createNewIncident);
    }, [departmentID, clientID, shift, incidentLocation, incidentType, incidentBefore, incidentWhatHappened, 
        incidentResponse, incidentAlternative, damages, damagesInfo, incidentOther,
        coercion, coercionDescription, important]);

    useEffect(() => {
        updateIsDeptOrClientEmpty();
        handleCreateNewIncidentFunc(createNewIncident);
    }, [departmentID, clientID]);

    useEffect(() => {
        handleSection(section1, section2, section3);
    }, [section1, section2, section3]);

    return (
        <View>
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
        </View>
    );
};

export default IncidentModal;