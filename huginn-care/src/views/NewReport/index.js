import React, { useRef, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import RadioButton from '../../components/RadioButton';
import styles from './styles';

const NewReport = ({ navigation: { navigate } }) => {
    const [checked, setChecked] = useState('yes'); // State for radio button
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const scrollViewRef = useRef();
    
    // Function to handle scrolling to a specific section
    const scrollToSection = (section) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: section, animated: true });
            setActiveSection(section);
        }
    };

    const [activeSection, setActiveSection] = useState(null);

    return (
        <View>
            <View style={ styles.jumpLinks }>
                <TouchableOpacity onPress={() => scrollToSection(section1)} style={[activeSection === 0 && styles.activeLink]}>
                    <Text>Almennar upplýsingar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToSection(section2)}>
                    <Text>Dagssamningar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToSection(section3)}>
                    <Text>Dagbók</Text>
                </TouchableOpacity>
            </View>
        
            <ScrollView ref={scrollViewRef} style={styles.container}>
                <View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                    <Text style={styles.title}>Almennar upplýsingar</Text>
                    <Text style={styles.inputTitle}>Deild</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: styles.input,
                            inputAndroid: styles.input
                        }}
                        placeholder={{ 
                            label: 'Veldu deild', 
                            value: null 
                        }}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Deild 1', value: 'deild1' },
                            { label: 'Deild 2', value: 'deild2' },
                            { label: 'Deild 3', value: 'deild3' }
                        ]}
                    />
                    <Text style={styles.inputTitle}>þjónustuþegi</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: styles.input,
                            inputAndroid: styles.input
                        }}
                        placeholder={{ 
                            label: 'Veldu þjónustuþega', 
                            value: null 
                        }}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Þjónustuþegi 1', value: 'þjónustuþegi1' },
                            { label: 'Þjónustuþegi 2', value: 'þjónustuþegi2' },
                            { label: 'Þjónustuþegi 3', value: 'þjónustuþegi3' }
                        ]}
                    />
                    <Text style={styles.inputTitle}>Tegund vaktar</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: styles.input,
                            inputAndroid: styles.input
                        }}
                        placeholder={{ 
                            label: 'Veldu tegund vaktar', 
                            value: null 
                        }}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Vakt 1', value: 'vakt1' },
                            { label: 'Vakt 2', value: 'vakt2' },
                            { label: 'Vakt 3', value: 'vakt3' }
                        ]}
                    />
                    <Text style={styles.inputTitle}>Starfsmenn á vakt</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Skrifaðu inn nöfn starfsmanna"
                        keyboardType="default"
                    />
                    <Text style={styles.inputTitle}>Voru lyf gefin?</Text>
                    <View style={[styles.radioInput, checked === 'yes' && styles.greenBorder]}>
                        <RadioButton
                            value="yes"
                            status={checked}
                            onPress={() => setChecked('yes')}
                        />
                        <Text>Já</Text>
                    </View>
                    <View style={[styles.radioInput, checked === 'no' && styles.greenBorder]}>
                        <RadioButton
                            value="no"
                            status={checked}
                            onPress={() => setChecked('no')}
                        />
                        <Text>Nei</Text>
                    </View>
                    <View style={[styles.radioInput, checked === 'notRelevant' && styles.greenBorder]}>
                        <RadioButton
                            value="notRelevant"
                            status={checked}
                            onPress={() => setChecked('notRelevant')}
                        />
                        <Text>Á ekki við</Text>
                    </View>
    
                </View>

                <View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); }} style={styles.formFrame}>
                    <Text style={styles.title}>Dagssamningar</Text>
                </View>
                <View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); }} style={[styles.formFrame, styles.lastFormFrame]}>
                    <Text style={styles.title}>Dagbók</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default NewReport;