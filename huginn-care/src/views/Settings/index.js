import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../components/LoginModal/user';
import { editSelfProfile } from '../../services/userService';
import styles from './styles';

const Settings = () => {
    const currentUser = useRecoilValue(userState);
    const setUser = useSetRecoilState(userState);
    const [userDetails, setUserDetails] = useState(currentUser?.thisUser || {});
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [postal, setPostal] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        // Update local state when the Recoil state updates
        setUserDetails(currentUser?.thisUser || {});
        setPhone(userDetails?.phone);
        setEmail(userDetails?.email);
        setAddress1(userDetails?.address1);
        setAddress2(userDetails?.address2);
        setPostal(userDetails?.postal);
        setCity(userDetails?.city);
    }, [currentUser]);

    const handleSave = async () => {
        try {
            const user = {
                password: userDetails?.password,
                email,
                phone,
                address1,
                address2,
                postal,
                city
            };
            await editSelfProfile(user);
            Alert.alert('Success', 'User data updated successfully.');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update user data.');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.title}>Mínar upplýsingar</Text>
                    <Text style={styles.inputTitle}>Nafn</Text>
                    <Text style={styles.textInput}>{userDetails.name || ''}</Text>
                    <Text style={styles.inputTitle}>Símanúmer</Text>
                    <TextInput
                        style={styles.textInput}
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        label="Símanúmer"
                    />
                    <Text style={styles.inputTitle}>Netfang</Text>
                    <TextInput
                        style={styles.textInput}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        label="Netfang"
                    />
                    <Text style={styles.inputTitle}>Lögheimili, lína 1</Text>
                    <TextInput
                        style={styles.textInput}
                        value={address1}
                        onChangeText={(text) => setAddress1(text)}
                        label="Lögheimili 1"
                    />
                    <Text style={styles.inputTitle}>Lögheimili, lína 2</Text>
                    <TextInput
                        style={styles.textInput}
                        value={address2}
                        onChangeText={(text) => setAddress2(text)}
                        label="Lögheimili 2"
                    />
                    <Text style={styles.inputTitle}>Póstnr.</Text>
                    <TextInput
                        style={styles.textInput}
                        value={postal}
                        onChangeText={(text) => setPostal(text)}
                        label="Post Nr"
                    />
                    <Text style={styles.inputTitle}>Bæjarfélag</Text>
                    <TextInput
                        style={styles.textInput}
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        label="Bæjarfélag"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSave}>
                        <View style={styles.buttonSection}>
                            <Text style={styles.buttonText}>Vista</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
