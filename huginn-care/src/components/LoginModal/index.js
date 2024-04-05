import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { login } from '../../services/authenticateService';
import styles from './styles';

const LoginModal = ({ submit }) => {
    const [username, setUsername] = useState('mollybrown');
    const [password, setPassword] = useState('NobodyWantsToSeeMeDownLikeIWantsToSeeMeUp');
    const [errors, setErrors] = useState({});
    const isEmpty = username.length === 0 || password.length === 0;

    const handleLogin = async () => {
        if (!isEmpty) {
            try {
                const { isLoggedIn, json } = await login(username, password);
                if (isLoggedIn) {
                    submit(true);
                } else {
                    // Handle cases where login credentials are not correct but the server responded without error
                    setErrors({ login: 'Login failed. Please check your username and password and try again.' });
                }
            } catch (error) {
                // Handle cases where there's an error in the login process (e.g., network error, server error)
                setErrors({ login: error.toString() });
            }
        } else {
            // Handle case where username or password fields are empty
            setErrors({ login: 'Please enter both username and password.' });
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <Text style={styles.title}>Innskráning</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Notendanafn"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="Lykilorð"
                    value={password}
                    onChangeText={setPassword}
                />
                {/* Display login errors if any */}
                {errors.login && (
                    <Text style={styles.errorText}>{errors.login}</Text>
                )}
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