import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import staffs from '../../resources/group.png';
import next from '../../resources/right-arrow.png';
import setting from '../../resources/setting.png';
import exit from '../../resources/exit.png';
import styles from './styles';

const Profile = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('Clients'); }}>
            <View style={styles.section}>
                <View style={styles.blueIcon}>
                    <Image source={staffs} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Þjónustuþegar</Text>
                    <Image source={next} style={styles.nextIcon} />
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('Staffs'); }}>
            <View style={styles.section}>
                <View style={styles.greenIcon}>
                    <Image source={staffs} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Starfsmenn</Text>
                    <Image source={next} style={styles.nextIcon} />
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('Settings'); }}>
            <View style={styles.section}>
                <View style={styles.yellowIcon}>
                    <Image source={setting} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Stillingar</Text>
                    <Image source={next} style={styles.nextIcon} />
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('Main'); }}>
            <View style={styles.section}>
                <View style={styles.redIcon}>
                    <Image source={exit} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Útskráning</Text>
                    <Image source={next} style={styles.nextIcon} />
                </View>
            </View>
        </TouchableOpacity>
        <FloatingActionButton />
    </View>
);

export default Profile;