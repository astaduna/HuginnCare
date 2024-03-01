import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const Main = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Main</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('Home'); }}>
            <View style={styles.section}>
                <Text style={styles.buttonText}>Innskráning</Text>
            </View>
        </TouchableOpacity>
    </View>
);

export default Main;