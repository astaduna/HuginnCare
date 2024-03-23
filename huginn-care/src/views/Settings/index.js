import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles';

const Settings = ({ navigation: { navigate } }) => (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.section}>
                <Text style={styles.title}>Mínar upplýsingar</Text>
                <Text style={styles.inputTitle}>Nafn</Text>
                <TextInput
                    style={styles.textInput}
                    label="Nafn"
                />
                <Text style={styles.inputTitle}>Símanúmer</Text>
                <TextInput
                    style={styles.textInput}
                    label="Símanúmer"
                />
                <Text style={styles.inputTitle}>Netfang</Text>
                <TextInput
                    style={styles.textInput}
                    label="Netfang"
                />
                <Text style={styles.inputTitle}>Lögheimili, lína 1</Text>
                <TextInput
                    style={styles.textInput}
                    label="Lögheimili 1"
                />
                <Text style={styles.inputTitle}>Lögheimili, lína 2</Text>
                <TextInput
                    style={styles.textInput}
                    label="Lögheimili 2"
                />
                <Text style={styles.inputTitle}>Póstnr.</Text>
                <TextInput
                    style={styles.textInput}
                    label="Post Nr"
                />
                <Text style={styles.inputTitle}>Bæjarfélag</Text>
                <TextInput
                    style={styles.textInput}
                    label="Bæjarfélag"
                />
                <Text style={styles.inputTitle}>Nýtt lykilorð</Text>
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    label="Lykilorð"
                />
                <Text style={styles.inputTitle}>Endurtekið lykilorð</Text>
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    label="Lykilorð2"
                />
                <TouchableOpacity
                    style={styles.button}>
                    <View style={styles.buttonSection}>
                        <Text style={styles.buttonText}>Vista</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
);

export default Settings;