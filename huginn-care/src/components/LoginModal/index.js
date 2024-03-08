import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';

const LoginModal = ({
    submit
}) => {
    const [username, setUsername] = useState('bjorgvin@jokula.is');
    const [password, setPassword] = useState('123456');
    const [errors, setErrors] = useState({});
    const isEmpty = (username.length === 0 || password.length === 0);

    const isValid = (username, password) => {
        const errors = {};

        if (username !== 'bjorgvin@jokula.is') { errors.username = 'Rangt notendanafn. Vinsamlega reyndu aftur eða hafðu samband við...'; }
        if (password !== '123456') { errors.password = 'Rangt lykilorð. Vinsamlega reyndu aftur eða hafðu samband við...'; }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return false;
        }
        return true;    
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
                {Boolean(errors.username) && 
                    <Text style={styles.errorText}>{errors.username}</Text>}
                {Boolean(errors.password) && 
                    <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
            <TouchableOpacity
                style={isEmpty ? styles.disabledButton : styles.button}
                onPress={() => submit(isValid(username, password))}
                disabled={isEmpty}>
                <View style={styles.section}>
                    <Text style={styles.buttonText}>Innskráning</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default LoginModal;
