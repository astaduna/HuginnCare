import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../components/LoginModal/user';
import { editSelfProfile } from '../../services/userService';
import styles from './styles';

const Settings = ({ navigation }) => {
    const currentUser = useRecoilValue(userState);
    const setUser = useSetRecoilState(userState);
    const [userDetails, setUserDetails] = useState(currentUser?.thisUser || {});

    useEffect(() => {
        // Update local state when the Recoil state updates
        setUserDetails(currentUser?.thisUser || {});
    }, [currentUser]);

    const handleChange = (name, value) => {
        setUserDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedUser = await editSelfProfile(userDetails);
            setUser({ ...currentUser, thisUser: updatedUser }); // Update the global state if the server update was successful
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
                    <TextInput
                        style={styles.textInput}
                        value={userDetails.name || ''}
                        onChangeText={(text) => handleChange('name', text)}
                        label="Nafn"
                    />
                    <Text style={styles.inputTitle}>Símanúmer</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userDetails.phone || ''}
                        onChangeText={(text) => handleChange('phone', text)}
                        label="Símanúmer"
                    />
                    <Text style={styles.inputTitle}>Netfang</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userDetails.email || ''}
                        onChangeText={(text) => handleChange('email', text)}
                        label="Netfang"
                    />
                    <Text style={styles.inputTitle}>Lögheimili, lína 1</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userDetails.address1 || ''}
                        onChangeText={(text) => handleChange('address1', text)}
                        label="Lögheimili 1"
                    />
                    <Text style={styles.inputTitle}>Lögheimili, lína 2</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userDetails.address2 || ''}
                        onChangeText={(text) => handleChange('address2', text)}
                        label="Lögheimili 2"
                    />
                    <Text style={styles.inputTitle}>Póstnr.</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userDetails.postal || ''}
                        onChangeText={(text) => handleChange('postal', text)}
                        label="Post Nr"
                    />
                    <Text style={styles.inputTitle}>Bæjarfélag</Text>
                    <TextInput
                        style={styles.textInput}
                        value={userDetails.city || ''}
                        onChangeText={(text) => handleChange('city', text)}
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
