import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Text, View, TextInput, Keyboard } from 'react-native';
import { editReport, getReportById } from '../../services/reportService';
import styles from './styles';
import moment from 'moment';
import RadioButton from '../../components/RadioButton';
import Checkbox from 'expo-checkbox';
import { greenBlue } from '../../styles/colors';

const ReportDetailModal = ({
    id,
    editMode,
    navigate,
    handleSection,
    handleEditMode,
    handleEditReportFunc
}) => {
    const [shift, setShift] = useState('');
    const [shiftType, setShiftType] = useState('');
    const [onShift, setOnShift] = useState('');
    const [medicineChecked, setMedicineChecked] = useState('');
    const [walkChecked, setWalkChecked] = useState('');
    const [entry, setEntry] = useState('');
    const [important, setImportant] = useState(false);
    const [section1, setSection1] = useState();
    const [section2, setSection2] = useState();
    const [section3, setSection3] = useState();
    const isFocused = useIsFocused();
    
    const [report, setReport] = useState({});

    useEffect(() => {
        (async () => {
            const reportData = await getReportById(id);
            setReport(reportData || {});
            setShift(reportData.shift || '');
            setShiftType(reportData.shift === 'day' ? 'Dagvakt' : reportData.shift === 'evening' ? 'Kvöldvakt' : reportData.shift === 'night' ? 'Næturvakt' : '');
            setOnShift(reportData.onShift || '');
            setMedicineChecked(reportData.medicine ? 'yes' : 'no');
            setWalkChecked(!reportData.clientReason ? 'yes' : 'no');
            setEntry(reportData.entry || '');
            setImportant(reportData.important);
        })();
    }, [isFocused, id]);

    const editReportDetail = async (type) => {
        if (type === 'Dagsskýrsla') {
            const updatedReport = {
                date: report.date,
                medicine: medicineChecked === 'yes' ? 'true' : 'false',
                clientReason: walkChecked === 'yes' ? '' : 'no',
                entry,
                shift,
                onShift,
                important: important ? 'true' : 'false'
            };
            const isEdited = await editReport(id, updatedReport);
            if (isEdited) {
                navigate('AllReports');
            }
            handleEditMode(false);
        }
    };

    useEffect(() => {
        handleEditReportFunc(editReportDetail);
    }, [shift, onShift, medicineChecked, walkChecked, entry, important]);

    useEffect(() => {
        handleSection(section1, section2, section3);
    }, [section1, section2, section3]);

    return (
        <>
            <View onLayout={(event) => { setSection1(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Almennar upplýsingar</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Dagsetning</Text>
                    <Text style={[styles.input, report.date ? styles.greenBorder : styles.input]}>{moment(new Date(report.date)).format('DD/MM/YYYY') || ''}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Deild</Text>
                    <Text style={[styles.input, report.department?.name ? styles.greenBorder : styles.input]}>{report.department?.name || ''}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Þjónustuþegi</Text>
                    <Text style={[styles.input, report.client?.name ? styles.greenBorder : styles.input]}>{report.client?.name || ''}</Text>
                                    
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Tegund vaktar</Text>
                    <Text style={[styles.input, report.shift ? styles.greenBorder : styles.input]}>{shiftType}</Text>
                                    
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Starfsmenn á vakt</Text>
                    { editMode 
                        ? <><TextInput
                            style={[styles.input, onShift ? styles.greenBorder : styles.input]}
                            placeholder={onShift}
                            keyboardType="default"
                            value={onShift}
                            onChangeText={setOnShift}
                        /></>
                        : <><Text style={[styles.input, onShift ? styles.greenBorder : styles.input]}>{onShift || ''}</Text></>}
                </View>
                <Text style={styles.inputTitle}>Lyf gefin?</Text>
                { editMode 
                    ? <><View style={[styles.radioInput, medicineChecked === 'yes' && styles.greenBorder]}>
                        <RadioButton
                            value="yes"
                            status={medicineChecked}
                            onPress={() => setMedicineChecked('yes')} />
                        <Text>Já, eða á ekki við</Text>
                    </View>
                    <View style={[styles.radioInput, medicineChecked === 'no' && styles.greenBorder]}>
                        <RadioButton
                            value="no"
                            status={medicineChecked}
                            onPress={() => setMedicineChecked('no')} />
                        <Text>Nei</Text>
                    </View></> 
                    : <><View style={[styles.radioInput, medicineChecked === 'yes' && styles.greenBorder]}>
                        <RadioButton
                            value="yes"
                            status={medicineChecked} />
                        <Text>Já, eða á ekki við</Text>
                    </View>
                    <View style={[styles.radioInput, medicineChecked === 'no' && styles.greenBorder]}>
                        <RadioButton
                            value="no"
                            status={medicineChecked} />
                        <Text>Nei</Text>
                    </View></>}
            </View><View onLayout={(event) => { setSection2(event.nativeEvent.layout.y); } } style={styles.formFrame}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Dagssamningar</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.inputTitle}>Fór hann í göngutúr</Text>
                    { editMode
                        ? <><View style={[styles.radioInput, walkChecked === 'yes' && styles.greenBorder]}>
                            <RadioButton
                                value="yes"
                                status={walkChecked}
                                onPress={() => setWalkChecked('yes')} />
                            <Text>Já</Text>
                        </View>
                        <View style={[styles.radioInput, walkChecked === 'no' && styles.greenBorder]}>
                            <RadioButton
                                value="no"
                                status={walkChecked}
                                onPress={() => setWalkChecked('no')} />
                            <Text>Nei</Text>
                        </View></>
                        : <><View style={[styles.radioInput, walkChecked === 'yes' && styles.greenBorder]}>
                            <RadioButton
                                value="yes"
                                status={walkChecked} />
                            <Text>Já</Text>
                        </View>
                        <View style={[styles.radioInput, walkChecked === 'no' && styles.greenBorder]}>
                            <RadioButton
                                value="no"
                                status={walkChecked} />
                            <Text>Nei</Text>
                        </View></>}
                                    
                </View>

            </View><View onLayout={(event) => { setSection3(event.nativeEvent.layout.y); } } style={[styles.formFrame, styles.lastFormFrame]}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Dagbók</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.paragraph}>ATH: Samkvæmt gildandi lögum um persónuvernd þá getur þjónustuþegi fengið afrit af öllum upplýsingum sem skrifaðar eru um hann.
                                            Starfsmenn skulu því vanda orðaval sitt. Ef þeir eru í vafa ber að hafa samband við deildarstjóra.</Text>
                    { editMode 
                        ? <><TextInput
                            style={[styles.textInput, entry ? styles.greenBorder : styles.textInput]}
                            keyboardType="default"
                            multiline={true}
                            onPress={() => Keyboard.dismiss()}
                            value={entry}
                            onChangeText={setEntry}
                            textAlignVertical='top'
                        /></> 
                        : <><Text style={[styles.textInput, entry ? styles.greenBorder : styles.textInput]}>{report.entry || ''}</Text></>}
                </View>
                <View style={styles.important}>
                    <Text style={styles.inputTitle}>Áríðandi upplýsingar</Text>
                    { editMode
                        ? <><Checkbox
                            style={styles.checkBox}
                            value={important}  
                            onValueChange={setImportant}
                            color={important ? greenBlue : 'gainsboro'}
                        /></>
                        : <><Checkbox
                            style={styles.checkBox}
                            value={report.important}
                            color={report.important ? greenBlue : 'gainsboro'}
                        /></>}
                </View>
            </View></>
    );
};

export default ReportDetailModal;
