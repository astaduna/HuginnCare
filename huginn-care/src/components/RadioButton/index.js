import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native'; 
import styles from './styles';

const RadioButton = ({ value, status, onPress, styles }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.radioButton}>
            {status === 'checked' && <View style={styles.radioButtonInner} />}
        </View>
        <Text>{value}</Text>
    </TouchableOpacity>
);

export default RadioButton;
