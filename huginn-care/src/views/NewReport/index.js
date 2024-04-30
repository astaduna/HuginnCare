import React, { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, Keyboard } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import RadioButton from '../../components/RadioButton';
import styles from './styles';
import { getAllClients } from '../../services/clientService';
import { getAllDepartments } from '../../services/departmentService';
import { getAllUsers } from '../../services/userService';
import { greenBlue } from '../../styles/colors';
import { beforeOptions, categoryOptionsA, clientOptionsA, departmentOptionsA, pageOptions, shiftOptions, typeOptions, userOptions } from '../../components/Options';

const NewReport = ({ navigation: { navigate } }) => {
    const [reportType, setReportType] = useState('');
    const [department, setDepartment] = useState('');
    const [client, setClient] = useState('');
    const [shiftType, setShiftType] = useState('');
    const [staffOnShift, setStaffOnShift] = useState('');
    const [medicineChecked, setMedicineChecked] = useState('');
    const [walkChecked, setWalkChecked] = useState('');
    const [diary, setDiary] = useState('');
    const [location, setLocation] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [before, setBefore] = useState('');
    const [whatHappened, setWhatHappened] = useState('');
    const [response, setResponse] = useState('');
    const [alternative, setAlternative] = useState('');
    const [damages, setDamages] = useState('');
    const [other, setOther] = useState('');
    const [important, setImportant] = useState(false);
    const [physical, setPhysical] = useState('');
    const [physicalInfo, setPhysicalInfo] = useState('');
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const scrollViewRef = useRef();
    const [selectedSection, setSelectedSection] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const isDayReportEmpty = reportType === 'day' && (department === '' || client === '' || shiftType === '' || medicineChecked === '' || walkChecked === '');
    const isIncidentEmpty = reportType === 'incident' && (department === '' || client === '' || shiftType === '' || location === '' || incidentType === '' ||
    before === '' || whatHappened === '' || response === '' || alternative === '' || other === '');
    const isEmpty = reportType === '' || isDayReportEmpty || isIncidentEmpty;

    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        (async () => {
            const usersData = await getAllUsers();
            const clientsData = await getAllClients();
            setDepartments(await getAllDepartments() || []);
            setUsers(usersData.filter(user => user.user_department_pivot.departmentId === department));
            setClients(clientsData.filter(client => client.client_department_pivot.departmentId === department));
            setIsLoading(false);
        })();
    }, [isFocused, department]);

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
        setScrollPosition(currentPosition);

        if (currentPosition < section2 - 30) {
            setSelectedSection(section1);
        } else if (currentPosition < section3 - 35) {
            setSelectedSection(section2);
        } else {
            setSelectedSection(section3);
        }
    };

    const createReport = () => {
        console.log(department, client, shiftType);
    };

    useEffect(() => {
        // Reset state variables based on reportType change
        if (reportType === '' || reportType === 'day' || reportType === 'incident') {
            setDepartment('');
            setClient('');
            setShiftType('');
            setStaffOnShift('');
            setMedicineChecked('');
            setWalkChecked('');
            setDiary('');
            setLocation('');
            setBefore('');
            setIncidentType('');
            setWhatHappened('');
            setResponse('');
            setAlternative('');
            setOther('');
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
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Skýrslu tegund</Text>
                    </View>
                    <RNPickerSelect
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
                            style={{
                                inputIOS: [styles.input, department !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, department !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu deild', 
                                value: ''
                            }}
                            onValueChange={(value) => setDepartment(value)}
                            items={departmentOptionsA(departments)}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>þjónustuþegi</Text>
                        <RNPickerSelect
                            style={{
                                inputIOS: [styles.input, client !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, client !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu þjónustuþega', 
                                value: '' 
                            }}
                            onValueChange={(value) => setClient(value)}
                            items={clientOptionsA(clients)}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>Tegund vaktar</Text>
                        <RNPickerSelect
                            style={{
                                inputIOS: [styles.input, shiftType !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, shiftType !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu vakt', 
                                value: '' 
                            }}
                            onValueChange={(value) => setShiftType(value)}
                            items={shiftOptions}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>Starfsmenn á vakt</Text>
                        <TextInput
                            style={[styles.input, staffOnShift ? styles.greenBorder : styles.input]}
                            placeholder="Skrifaðu inn nöfn starfsmanna"
                            keyboardType="default"
                            value={staffOnShift}
                            onChangeText={setStaffOnShift}
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
                                style={[styles.textInput, diary ? styles.greenBorder : styles.textInput]}
                                keyboardType="default"
                                multiline={true}
                                onPress={() => Keyboard.dismiss()}
                                value={diary}
                                onChangeText={setDiary}
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
                            style={{
                                inputIOS: [styles.input, department !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, department !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu deild', 
                                value: ''
                            }}
                            onValueChange={(value) => setDepartment(value)}
                            items={departmentOptionsA(departments)}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>þjónustuþegi</Text>
                        <RNPickerSelect
                            style={{
                                inputIOS: [styles.input, client !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, client !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu þjónustuþega', 
                                value: '' 
                            }}
                            onValueChange={(value) => setClient(value)}
                            items={clientOptionsA(clients)}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>Tegund vaktar</Text>
                        <RNPickerSelect
                            style={{
                                inputIOS: [styles.input, shiftType !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, shiftType !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu tegund vaktar', 
                                value: '' 
                            }}
                            onValueChange={(value) => setShiftType(value)}
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
                            style={[styles.input, location ? styles.greenBorder : styles.input]}
                            placeholder=""
                            keyboardType="default"
                            value={location}
                            onChangeText={setLocation}
                        />
                        <Text style={styles.inputTitle}>Atvik sem um ræðir</Text>
                        <RNPickerSelect
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
                            style={{
                                inputIOS: [styles.input, before !== '' ? styles.greenBorder : styles.input],
                                inputAndroid: [styles.input, before !== '' ? styles.greenBorder : styles.input],
                                iconContainer: {
                                    top: 25,
                                    right: 20
                                }
                            }}
                            placeholder={{ 
                                label: 'Veldu aðdraganda', 
                                value: '' 
                            }}
                            onValueChange={(value) => setBefore(value)}
                            items={beforeOptions}
                            Icon={() => {
                                return <FontAwesome name='chevron-down' size={15} color={greenBlue} />;
                            }}
                        />
                        <Text style={styles.inputTitle}>Hvernig fór atvikið fram</Text>
                        <TextInput
                            style={[styles.textInput, whatHappened ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={whatHappened}
                            onChangeText={setWhatHappened}
                        />
                        <Text style={styles.inputTitle}>Hvernig var brugðist við atvikinu</Text>
                        <TextInput
                            style={[styles.textInput, response ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={response}
                            onChangeText={setResponse}
                        />
                        <Text style={styles.inputTitle}>Hvað væri hægt að gera öðruvísi</Text>
                        <TextInput
                            style={[styles.textInput, alternative ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={alternative}
                            onChangeText={setAlternative}
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
                                    style={[styles.textInput, damages ? styles.greenBorder : styles.textInput]}
                                    placeholder=""
                                    keyboardType="default"
                                    multiline={true}
                                    onPress={() => Keyboard.dismiss()}
                                    value={damages}
                                    onChangeText={setDamages} /></>
                            : <></> }
                        <Text style={styles.inputTitle}>Aðrar athugasemdir</Text>
                        <TextInput
                            style={[styles.textInput, other ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={other}
                            onChangeText={setOther}
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
                        <View style={[styles.radioInput, physical === 'yes' && styles.greenBorder]}>
                            <RadioButton
                                value="yes"
                                status={physical}
                                onPress={() => setPhysical('yes')}
                            />
                            <Text>Já</Text>
                        </View>
                        <View style={[styles.radioInput, physical === '' && styles.greenBorder]}>
                            <RadioButton
                                value=""
                                status={physical}
                                onPress={() => setPhysical('')}
                            />
                            <Text>Nei</Text>
                        </View>
                        { physical === 'yes'
                            ? <>
                                <Text style={styles.inputTitle}>Lýsing á eðli inngrips</Text><TextInput
                                    style={[styles.textInput, physicalInfo ? styles.greenBorder : styles.textInput]}
                                    placeholder=""
                                    keyboardType="default"
                                    multiline={true}
                                    onPress={() => Keyboard.dismiss()}
                                    value={physicalInfo}
                                    onChangeText={setPhysicalInfo} /></>
                            : <></> }
                    </View>
                    </>
                    : <></>
                }
            </ScrollView>
            <TouchableOpacity
                style={isEmpty ? styles.disabledButton : styles.button}
                onPress={createReport}
                disabled={isEmpty}>
                <Text style={styles.buttonText}>Stofna skýrslu  <Text style={styles.plus}>+</Text></Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default NewReport;