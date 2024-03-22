import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import report from '../../resources/file.png';
import staffs from '../../resources/group.png';
import next from '../../resources/right-arrow.png';
import styles from './styles';
import FloatingActionButton from '../../components/FloatingActionButton';

const Settings = ({ navigation: { navigate } }) => (
    <ScrollView style={styles.container}>
        <View style={styles.modal}>
            <Text style={styles.title}>Mínar upplýsingar</Text>
            <Text style={styles.inputTitle}>Nafn</Text>
            <TextInput
                style={styles.textInput}
                autoFocus
                label="Nafn"
            />
            <Text style={styles.inputTitle}>Símanúmer</Text>
            <TextInput
                style={styles.textInput}
                autoFocus
                label="Símanúmer"
            />
            <Text style={styles.inputTitle}>Netfang</Text>
            <TextInput
                style={styles.textInput}
                autoFocus
                label="Netfang"
            />
            <Text style={styles.inputTitle}>Lögheimili, lína 1</Text>
            <TextInput
                style={styles.textInput}
                autoFocus
                label="Lögheimili 1"
            />
            <Text style={styles.inputTitle}>Lögheimili, lína 2</Text>
            <TextInput
                style={styles.textInput}
                autoFocus
                label="Lögheimili 2"
            />
            <Text style={styles.inputTitle}>Póstnr.</Text>
            <TextInput
                style={styles.textInput}
                autoFocus
                label="Post Nr"
            />
            <Text style={styles.inputTitle}>Bæjarfélag</Text>
            <TextInput
                style={styles.textInput}
                autoFocus
                label="Bæjarfélag"
            />
            <Text style={styles.inputTitle}>Nýtt lykilorð</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                autoFocus
                label="Lykilorð"
            />
            <Text style={styles.inputTitle}>Endurtekið lykilorð</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                autoFocus
                label="Lykilorð2"
            />
            <TouchableOpacity
                style={styles.button}>
                <View style={styles.section}>
                    <Text style={styles.buttonText}>Vista</Text>
                </View>
            </TouchableOpacity>
        </View>
    </ScrollView>
);

export default Settings;