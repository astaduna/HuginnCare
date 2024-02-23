import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import styles from './styles';

const Main = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.paragraph}>Home</Text>
        <TouchableHighlight
            style={styles.button}
            onPress={() => { navigate('Reports') }}>
            <Text style={styles.buttonText}>Reports</Text>
        </TouchableHighlight>
    </View>
);

export default Main;