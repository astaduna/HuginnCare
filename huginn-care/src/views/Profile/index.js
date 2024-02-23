import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import styles from './styles';

const Profile = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.paragraph}>Profile</Text>
        <TouchableHighlight
            style={styles.button}
            onPress={() => { navigate('Main') }}>
            <Text style={styles.buttonText}>Gallery</Text>
        </TouchableHighlight>
    </View>
);

export default Profile;