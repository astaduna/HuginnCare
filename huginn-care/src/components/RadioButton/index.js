import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const RadioButton = ({ value, status, onPress }) => {
    const radioButtonStyles = [
        styles.radioButton,
        status === value && styles.radioButtonChecked
    ];
      
    return (
    
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={[radioButtonStyles]}>
                {status === value && <View style={styles.radioButtonInner} />}
            </View>
        </TouchableOpacity>
    ); 
};

export default RadioButton;
