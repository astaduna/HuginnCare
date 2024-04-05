import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, TextInput, ScrollView } from 'react-native';
import RadioButton from '../../components/RadioButton';
import styles from './styles';

const NewReport = ({ navigation: { navigate } }) => {
    const [checked, setChecked] = useState('yes'); //State for radio button

    return (
    <ScrollView style={styles.container}>
        <View style={styles.formFrame}>
            <Text style={styles.title}>Almennar upplýsingar</Text>
            <Text style={styles.inputTitle}>Deild</Text>
            <RNPickerSelect
            style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
            }}
            placeholder={{ 
                label: 'Veldu deild', 
                value: null 
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Deild 1', value: 'deild1' },
                { label: 'Deild 2', value: 'deild2' },
                { label: 'Deild 3', value: 'deild3' },
            ]}
            />
            <Text style={styles.inputTitle}>þjónustuþegi</Text>
            <RNPickerSelect
            style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
            }}
            placeholder={{ 
                label: 'Veldu þjónustuþega', 
                value: null 
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Þjónustuþegi 1', value: 'þjónustuþegi1' },
                { label: 'Þjónustuþegi 2', value: 'þjónustuþegi2' },
                { label: 'Þjónustuþegi 3', value: 'þjónustuþegi3' },
            ]}
            />
            <Text style={styles.inputTitle}>Tegund vaktar</Text>
            <RNPickerSelect
            style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
            }}
            placeholder={{ 
                label: 'Veldu tegund vaktar', 
                value: null 
            }}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Vakt 1', value: 'vakt1' },
                { label: 'Vakt 2', value: 'vakt2' },
                { label: 'Vakt 3', value: 'vakt3' },
            ]}
            />
            <Text style={styles.inputTitle}>Starfsmenn á vakt</Text>
            <TextInput
                style={styles.input}
                autoFocus
                placeholder="Skrifaðu inn nöfn starfsmanna"
                keyboardType="default"
            />
            {/* <Text style={styles.inputTitle}>Voru lyf gefin?</Text>
            <View style={styles.input}>
                    <RadioButton
                        value="yes"
                        status={checked === 'yes' }
                        onPress={() => setChecked('yes')}
                    />
                </View>
            <View style={styles.input}>
                    <RadioButton
                        value="no"
                        status={checked === 'no'}
                        onPress={() => setChecked('no')}
                    />
                    <Text>Nei</Text>
                </View>
            <View style={styles.input}>
                    <RadioButton
                        value="notRelevant"
                        status={checked === 'notReleveant'}
                        onPress={() => setChecked('notRelevant')}
                    />
                    <Text>Á ekki við</Text>
                </View>     */}
        </View>

        <View style={styles.formFrame}>
            <Text style={styles.title}>Dagssamningar</Text>
        </View>
    </ScrollView>
    );
        };

export default NewReport;