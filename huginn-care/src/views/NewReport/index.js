import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const NewReport = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Ný skýrsla</Text>
        </View>
);

export default NewReport;