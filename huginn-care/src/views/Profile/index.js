import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import styles from './styles';

const Profile = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.paragraph}>Profile</Text>
    </View>
);

export default Profile;