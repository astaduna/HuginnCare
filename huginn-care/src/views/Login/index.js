import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Spinner from '../../components/Spinner';
import previous from '../../resources/left-arrow.png';
import styles from './styles';
import LoginModal from '../../components/LoginModal';

const Login = ({ navigation: { navigate } }) => {
    const [isLoading, setLoading] = useState(false);
    
    const submit = (isValid) => {
        setLoading(true);
        if (isValid) {
            setTimeout(() => {
                navigate('Home');
            }, 1000);
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
            { isLoading ? <Spinner /> : null }
        </SafeAreaView>
    );
};

export default Login;