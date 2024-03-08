import React from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import previous from '../../resources/left-arrow.png';
import styles from './styles';
import LoginModal from '../../components/LoginModal';

const Login = ({ navigation: { navigate } }) => {
    const submit = (username, password) => {
        if (username === 'Admin' && password === 'admin') {
            navigate('Home');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { navigate('Main'); }}>
                <View style={styles.circle}>
                    <View style={styles.navText}>
                        <Image source={previous} style={styles.previousIcon} />
                    </View>
                </View>
            </TouchableOpacity>
            <LoginModal submit={submit}/>
        </SafeAreaView>
    );
};

export default Login;