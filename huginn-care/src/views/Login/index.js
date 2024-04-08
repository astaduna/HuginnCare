import React, { useCallback, useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import LoginModal from '../../components/LoginModal';
import Spinner from '../../components/Spinner';
import previous from '../../resources/left-arrow.png';
import styles from './styles';

const Login = ({ navigation: { navigate } }) => {
    const [isLoading, setLoading] = useState(false);
    
    const submit = useCallback((isValid) => {
        setLoading(true);
        if (isValid) {
            setTimeout(() => {
                navigate('Home');
            }, 1000);
        }
    }, []);

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