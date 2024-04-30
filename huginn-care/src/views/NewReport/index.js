import React, { useEffect, useRef, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, Keyboard } from 'react-native';
import RadioButton from '../../components/RadioButton';
import styles from './styles';
import plus from '../../resources/plus.png';

const NewReport = ({ navigation: { navigate } }) => {
    const [department, setDepartment] = useState(null);
    const [client, setClient] = useState(null);
    const [shiftType, setShiftType] = useState(null);
    const [staffOnShift, setStaffOnShift] = useState('');
    const [medicineChecked, setMedicineChecked] = useState('');
    const [walkChecked, setWalkChecked] = useState('');
    const [diary, setDiary] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const scrollViewRef = useRef();
    const [selectedSection, setSelectedSection] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);

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

    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        const checkEmptyFields = () => {
            const isAnyEmpty = !department || !client || !shiftType || medicineChecked === '' || walkChecked === '';
            setIsEmpty(isAnyEmpty);
        };

        checkEmptyFields();
    }, [department, client, shiftType, staffOnShift]);

    const createReport = () => {
        console.log('ok');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.jumpLinks}>
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
            <ScrollView ref={scrollViewRef} style={styles.detailsContainer} onScroll={handleScroll} scrollEventThrottle={16}>
                <View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Almennar upplýsingar</Text>
                    </View>
                    <Text style={styles.inputTitle}>Deild</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: [styles.input, department ? styles.greenBorder : styles.input],
                            inputAndroid: [styles.input, department ? styles.greenBorder : styles.input]
                        }}
                        placeholder={{ 
                            label: 'Veldu deild', 
                            value: null 
                        }}
                        onValueChange={(value) => setDepartment(value)}
                        items={[
                            { label: 'Deild 1', value: 'deild1' },
                            { label: 'Deild 2', value: 'deild2' },
                            { label: 'Deild 3', value: 'deild3' }
                        ]}
                    />
                    <Text style={styles.inputTitle}>þjónustuþegi</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: [styles.input, client ? styles.greenBorder : styles.input],
                            inputAndroid: [styles.input, client ? styles.greenBorder : styles.input]
                        }}
                        placeholder={{ 
                            label: 'Veldu þjónustuþega', 
                            value: null 
                        }}
                        onValueChange={(value) => setClient(value)}
                        items={[
                            { label: 'Þjónustuþegi 1', value: 'þjónustuþegi1' },
                            { label: 'Þjónustuþegi 2', value: 'þjónustuþegi2' },
                            { label: 'Þjónustuþegi 3', value: 'þjónustuþegi3' }
                        ]}
                    />
                    <Text style={styles.inputTitle}>Tegund vaktar</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: [styles.input, shiftType ? styles.greenBorder : styles.input],
                            inputAndroid: [styles.input, shiftType ? styles.greenBorder : styles.input]
                        }}
                        placeholder={{ 
                            label: 'Veldu tegund vaktar', 
                            value: null 
                        }}
                        onValueChange={(value) => setShiftType(value)}
                        items={[
                            { label: 'Vakt 1', value: 'vakt1' },
                            { label: 'Vakt 2', value: 'vakt2' },
                            { label: 'Vakt 3', value: 'vakt3' }
                        ]}
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
                            style={[styles.diaryInput, diary ? styles.greenBorder : styles.diaryInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={diary}
                            onChangeText={setDiary}
                        />
                    </View>
                </View>
                
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