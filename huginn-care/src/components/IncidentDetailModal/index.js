import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { editIncident, getIncidentById } from '../../services/incidentService';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';
import Checkbox from 'expo-checkbox';
import { greenBlue } from '../../styles/colors';
import { beforeOptions, typeOptions } from '../../components/Options';

const IncidentDetailModal = ({
    id,
    editMode,
    navigate,
    handleSection,
    handleEditMode,
    handleEditReportFunc
}) => {
    const [shift, setShift] = useState('');
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
    const isFocused = useIsFocused();
    const [incident, setIncident] = useState({});

    useEffect(() => {
        (async () => {
            const incidentData = await getIncidentById(id);
            setIncident(incidentData);
            setShift(incidentData.shift);
            setIncidentLocation(incidentData.location || '');
            setIncidentType(incidentData.type);
            setIncidentBefore(incidentData.before || '');
            setIncidentWhatHappened(incidentData.whatHappened || '');
            setIncidentResponse(incidentData.response || '');
            setIncidentAlternative(incidentData.alternative || '');
            setDamages(incidentData.damages ? 'yes' : 'no');
            setDamagesInfo(incidentData.damages || '');
            setIncidentOther(incidentData.other || '');
            setImportant(incidentData.important);
            setCoercion(incidentData.coercion ? 'yes' : 'no');
            setCoercionDescription(incidentData.coercion?.description || '');
        })();
    }, [isFocused, id]);

    const editIncidentDetail = async () => {
        const updatedIncident = {
            date: incident.date,
            incidentAlternative,
            incidentBefore,
            isCoercion: coercion ? 'true' : 'false', 
            coercionDescription, 
            incidentDamages: damages ? damagesInfo : '',
            important: important ? 'true' : 'false',
            incidentLocation,
            incidentOther,
            incidentResponse,
            incidentType,
            incidentWhatHappened,
            incidentShift: shift
        };
        const isEdited = await editIncident(id, updatedIncident);
        if (isEdited) {
            navigate('AllReports');
        }
        handleEditMode(false);
    };

    useEffect(() => {
        handleEditReportFunc(editIncidentDetail);
    }, [shift, incidentLocation, incidentType, incidentBefore, incidentWhatHappened, 
        incidentResponse, incidentAlternative, damages, damagesInfo, incidentOther,
        coercion, coercionDescription, important]);

    useEffect(() => {
        handleSection(section1, section2, section3);
    }, [section1, section2, section3]);

    return (
        <View>
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
                    <Text style={[styles.input, incident.department?.name ? styles.greenBorder : styles.input]}>{incident.department?.name || ''}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                    <Text style={[styles.input, incident.client?.name ? styles.greenBorder : styles.input]}>{incident.client?.name || ''}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Tegund vaktar</Text>
                    <Text style={[styles.input, incident.shift ? styles.greenBorder : styles.input]}>{shift === 'day' ? 'Dagvakt' : shift === 'evening' ? 'Kvöldvakt' : shift === 'night' ? 'Næturvakt' : ''}</Text>
                </View>
            </View>
            <View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); } } style={styles.formFrame}>
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
                                value='yes'
                                status={damages}
                                onPress={() => setDamages('yes')}
                            />
                            <Text>Já</Text>
                        </View>
                        <View style={[styles.radioInput, damages === 'no' && styles.greenBorder]}>
                            <RadioButton
                                value='no'
                                status={damages}
                                onPress={() => setDamages('no')}
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
                            : <><Text style={[styles.textInput, incident.damages ? styles.greenBorder : styles.textInput]}>{damagesInfo || ''}</Text></>}
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
            </View>
            <View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); } } style={[styles.formFrame, styles.lastFormFrame]}>
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
        </View>
    );
};

export default IncidentDetailModal;
