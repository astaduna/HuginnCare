import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { greenBlue } from '../../styles/colors';
import styles from './styles';

const Spinner = () => (
    <View style={styles.spinner}>
        <ActivityIndicator size="large" color={greenBlue} />
        <Text style={styles.text}>Í vinnslu</Text>
    </View>
);

export default Spinner;