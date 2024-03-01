import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, Image } from 'react-native';
import staffs from '../../resources/group.png';
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
                duration: 2000,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image 
                source={staffs} 
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
                <Animated.Text style={{...styles.buttonText, opacity: opacity}}>blablablab</Animated.Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigate('Home'); }}>
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