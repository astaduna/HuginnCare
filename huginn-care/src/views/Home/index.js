import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import report from '../../resources/file.png';
import staffs from '../../resources/group.png';
import next from '../../resources/right-arrow.png';
import plus from '../../resources/plus.png';
import styles from './styles';
import FloatingActionButton from '../../components/FloatingActionButton';

const Home = ({ navigation: { navigate } }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Flýtileiðir</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('NewReport'); }}>
            <View style={styles.section}>
                <View style={styles.blueIcon}>
                    <Image source={report} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Skrá skýrslu</Text>
                    <Image source={plus} style={styles.nextIcon} />
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { navigate('Reports'); }}>
            <View style={styles.section}>
                <View style={styles.blueIcon}>
                    <Image source={report} style={styles.icon} />
                </View>
                <View style={styles.navText}>
                    <Text style={styles.buttonText}>Skoða eldri skýrslur</Text>
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
                    <Text style={styles.buttonText}>Skoða Starfsmenn</Text>
                    <Image source={next} style={styles.nextIcon} />
                </View>
            </View>
        </TouchableOpacity>
        <FloatingActionButton />
    </View>
);

export default Home;