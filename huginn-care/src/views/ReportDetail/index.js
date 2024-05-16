import React, { useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import styles from './styles';
import ReportDetailModal from '../../components/ReportDetailModal';
import IncidentDetailModal from '../../components/IncidentDetailModal';

const ReportDetail = ({ route, navigation: { navigate } }) => {
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const { id, type } = route.params;
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);
    const scrollViewRef = useRef();
    const [selectedSection, setSelectedSection] = useState('');
    const [editMode, setEditMode] = useState(false);

    const [departments, setDepartments] = useState([]);
    const [clients, setClients] = useState([]);
    const [editReportFunc, setEditReportFunc] = useState(() => () => {});
    const [report, setReport] = useState({});
    const [incident, setIncident] = useState({});

    const handleEditButtonClick = () => {
        setEditMode(true);
    };

    const handleCancelButtonClick = () => {
        setEditMode(false);
    };

    const handleEditReportFunc = async (func) => {
        setEditReportFunc(() => func);
    };

    const handleEditMode = (value) => {
        setEditMode(value);
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
        <SafeAreaView style={styles.container}>
            { type === 'Dagsskýrsla'
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
            { type === 'Atvikaskýrsla'
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
                            <TouchableOpacity style={styles.saveButton} onPress={() => editReportFunc(type)}>
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
                { type === 'Dagsskýrsla'
                    ? (
                        <ReportDetailModal 
                            id={id} 
                            editMode={editMode}
                            navigate={navigate} 
                            handleSection={handleSection} 
                            handleEditMode={handleEditMode}
                            handleEditReportFunc={handleEditReportFunc}
                        />
                    )
                    : <></>
                }
                { type === 'Atvikaskýrsla'
                    ? (
                        <IncidentDetailModal 
                            id={id} 
                            editMode={editMode}
                            navigate={navigate} 
                            handleSection={handleSection} 
                            handleEditMode={handleEditMode}
                            handleEditReportFunc={handleEditReportFunc}/>
                    )
                    : <></> 
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReportDetail;
