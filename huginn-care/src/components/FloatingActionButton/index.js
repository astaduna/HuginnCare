import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const FloatingActionButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('NewReport')}
        >
            <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
    );
};

export default FloatingActionButton;