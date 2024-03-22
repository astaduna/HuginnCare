import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

const NewReport = ({ navigation: { navigate } }) => (

    <View style={styles.container}>
        <View style={styles.formFrame}>
            <Text style={styles.title}>Almennar upplýsingar</Text>
            <Text>Deild</Text>
            <TextInput
                style={styles.input}
                placeholder="Veldu deild"
                keyboardType="default"
            />
            <Text>þjónustuþegi</Text>
            <TextInput // Breyta í drop-down menu
                style={styles.input}
                placeholder="Veldu þjónustuþega"
                keyboardType="default"
            />
            <Text>Tegund vaktar</Text>
            <TextInput // Breyta í drop-down menu
                style={styles.input}
                placeholder="Veldu tegund vaktar"
                keyboardType="default"
            />
            <Text>Starfsmenn á vakt</Text>
            <TextInput
                style={styles.input}
                placeholder="Skrifaðu inn nöfn starfsmanna"
                keyboardType="default"
            />
            <Text>Voru lyf gefin?</Text>     
        </View>

        <View style={styles.formFrame}>
            <Text style={styles.title}>Dagssamningar</Text>
        </View>
    </View>
);

export default NewReport;