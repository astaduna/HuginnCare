import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login } from '../../services/apiService';
import styles from './styles';

const LoginModal = ({ submit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const isEmpty = username.length === 0 || password.length === 0;

    const handleLogin = async () => {
        const { isLoggedIn, json } = await login(username, password);
        if (isLoggedIn) {
            submit(true);
        } else {
            setErrors({ login: 'Login failed. Please check your username and password and try again.' });
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <Text style={styles.title}> Innskráning </Text>
                <TextInput
                    style={styles.textInput}
                    autoFocus
                    label="Notendanafn"
                    placeholder="Notendanafn"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    autoFocus
                    label="Lykilorð"
                    placeholder="Lykilorð"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                {Boolean(errors.login) && 
                    <Text style={styles.errorText}>{errors.login}</Text>}
            </View>
            <TouchableOpacity
                style={isEmpty ? styles.disabledButton : styles.button}
                onPress={handleLogin}
                disabled={isEmpty}>
                <View style={styles.section}>
                    <Text style={styles.buttonText}>Innskráning</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default LoginModal;