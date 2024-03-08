import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';

const LoginModal = ({
    submit
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isEmpty = (username.length === 0 || password.length === 0);

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
            </View>
            <TouchableOpacity
                style={isEmpty ? styles.disabledButton : styles.button}
                onPress={() => submit(username, password)}
                disabled={isEmpty}>
                <View style={styles.section}>
                    <Text style={styles.buttonText}>Innskráning</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default LoginModal;
