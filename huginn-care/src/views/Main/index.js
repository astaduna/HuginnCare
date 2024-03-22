import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, Image } from 'react-native';
import logo from '../../resources/huginn-care-logo.png';
import styles from './styles';

const Main = ({ navigation: { navigate } }) => {
    const position = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.timing(position, {
                toValue: -200,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image 
                source={logo} 
                style={{
                    ...styles.icon,
                    transform: [
                        { translateY: position }
                    ]
                }}>
            </Animated.Image>
            <Animated.View style={{
                ...styles.circle,
                transform: [
                    { translateY: position }
                ]
            }}>
            </Animated.View>
            <Animated.View style={{
                ...styles.section,
                opacity
            }}>
                <Text style={styles.title}>Velkomin í{'\n'}
                        Huginn care appið</Text>
                <Text style={styles.paragraph}>Hér getur þú fundið upplýsingar sem og skráð dagsskýrslur og fleira.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigate('Login'); }}>
                    <View style={styles.section}>
                        <Text style={styles.buttonText}>Innskráning</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            {/* <Text style={styles.title}>Main</Text>
             */}
        </View>
    );
};

export default Main;