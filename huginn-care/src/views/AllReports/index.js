import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import report from '../../resources/file.png';
import plus from '../../resources/plus.png';
import next from '../../resources/right-arrow.png';
import styles from './styles';

const AllReports = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Yfirlit yfir eldri skýrslur</Text>
    </View>
);

export default AllReports;