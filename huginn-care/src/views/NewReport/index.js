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
import ReportModal from '../../components/ReportModal';
import IncidentModal from '../../components/IncidentModal';

const NewReport = ({ navigation: { navigate } }) => {
    const date = new Date();
    const [reportType, setReportType] = useState('');
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const scrollViewRef = useRef();
    const [selectedSection, setSelectedSection] = useState('');
    const [isReportEmpty, setIsReportEmpty] = useState(false);
    const [isIncidentEmpty, setIsIncidentEmpty] = useState(false);
    const [isDeptOrClientEmpty, setIsDeptOrClientEmpty] = useState(false);
    const [createNewReportFunc, setCreateNewReportFunc] = useState(() => () => {});
    const [createNewIncidentFunc, setCreateNewIncidentFunc] = useState(() => () => {});

    const handleIsReportEmpty = (value) => {
        setIsReportEmpty(value);
    };

    const handleIsIncidentEmpty = (value) => {
        setIsIncidentEmpty(value);
    };

    const handleIsDeptOrClientEmpty = (value) => {
        setIsDeptOrClientEmpty(value);
    };

    const handleCreateNewReportFunc = (func) => {
        setCreateNewReportFunc(() => func);
    };

    const handleCreateNewIncidentFunc = (func) => {
        setCreateNewIncidentFunc(() => func);
    };

    const scrollToSection = (section) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: section, animated: true });
        }
    };

    const handleSectionSelection = (section) => {
        setSelectedSection(section);
        scrollToSection(section);
    };

    const handleSection = (section1, section2, section3) => {
        setSection1(section1);
        setSection2(section2);
        setSection3(section3);
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
    
    return (
        <SafeAreaView style={styles.container} stickyHeaderIndices={[2]}>
            {reportType === 'day' || reportType === 'incident'
                ? (
                    <View style={styles.jumpLinks}>
                        <TouchableOpacity
                            style={[
                                styles.jumpLinkButton,
                                selectedSection === section1 && styles.selectedJumpLinkButton
                            ]}
                            onPress={() => handleSectionSelection(section1)}>
                            <Text
                                style={[
                                    styles.jumpLinkText,
                                    selectedSection === section1 && styles.selectedJumpLinkText
                                ]}>
                            Almennar upplýsingar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.jumpLinkButton,
                                selectedSection === section2 && styles.selectedJumpLinkButton
                            ]}
                            onPress={() => handleSectionSelection(section2)}>
                            <Text
                                style={[
                                    styles.jumpLinkText,
                                    selectedSection === section2 && styles.selectedJumpLinkText
                                ]}>
                                {reportType === 'day' ? 'Dagssamningar' : 'Atvik'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.jumpLinkButton,
                                selectedSection === section3 && styles.selectedJumpLinkButton
                            ]}
                            onPress={() => handleSectionSelection(section3)}>
                            <Text
                                style={[
                                    styles.jumpLinkText,
                                    selectedSection === section3 && styles.selectedJumpLinkText
                                ]}>
                                {reportType === 'day' ? 'Dagbók' : 'Líkamlegt inngrip'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
                : null}
            <ScrollView
                ref={scrollViewRef}
                style={styles.detailsContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}>
                <View style={styles.formFrame}>
                    <Text style={styles.input}>{date.toLocaleDateString('en-GB')}</Text>
                </View>
                <View style={styles.formFrame}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        style={{
                            inputIOS: [
                                styles.input,
                                reportType !== '' ? styles.greenBorder : styles.input
                            ],
                            inputAndroid: [
                                styles.input,
                                reportType !== '' ? styles.greenBorder : styles.input
                            ],
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
                            return (
                                <FontAwesome
                                    name='chevron-down'
                                    size={15}
                                    color={greenBlue}
                                />
                            );
                        }}
                    />
                </View>
                {reportType === 'day'
                    ? (
                        <ReportModal
                            navigate={navigate}
                            handleSection={handleSection}
                            handleIsReportEmpty={handleIsReportEmpty}
                            handleIsDeptOrClientEmpty={handleIsDeptOrClientEmpty}
                            handleCreateNewReportFunc={handleCreateNewReportFunc}
                        />
                    )
                    : reportType === 'incident'
                        ? (
                            <IncidentModal
                                navigate={navigate}
                                handleSection={handleSection}
                                handleIsIncidentEmpty={handleIsIncidentEmpty}
                                handleIsDeptOrClientEmpty={handleIsDeptOrClientEmpty}
                                handleCreateNewIncidentFunc={handleCreateNewIncidentFunc}
                            />
                        )
                        : null}
            </ScrollView>
            {reportType === 'day'
                ? (
                    <><TouchableOpacity
                        style={isDeptOrClientEmpty ? styles.disabledButton2 : styles.button2}
                        onPress={() => createNewReportFunc(true)}
                        disabled={isDeptOrClientEmpty}>
                        <Text style={styles.buttonText}>Vista sem drög</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={isReportEmpty ? styles.disabledButton : styles.button}
                        onPress={() => createNewReportFunc(false)}
                        disabled={isReportEmpty}>
                        <Text style={styles.buttonText}>Stofna skýrslu <Text style={styles.plus}>+</Text></Text>
                    </TouchableOpacity></>
                )
                : reportType === 'incident'
                    ? (
                        <><TouchableOpacity
                            style={isDeptOrClientEmpty ? styles.disabledButton2 : styles.button2}
                            onPress={() => createNewIncidentFunc(true)}
                            disabled={isDeptOrClientEmpty}>
                            <Text style={styles.buttonText}>Vista sem drög</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={isIncidentEmpty ? styles.disabledButton : styles.button}
                            onPress={() => createNewIncidentFunc(false)}
                            disabled={isIncidentEmpty}>
                            <Text style={styles.buttonText}>Stofna skýrslu <Text style={styles.plus}>+</Text></Text>
        
                        </TouchableOpacity></>
                    )
                    : null}
            
        </SafeAreaView>
    );
};

export default NewReport;
