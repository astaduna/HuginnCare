import React, { useState } from 'react';
import styles from './styles';
import { Text, View, TextInput } from 'react-native';
import Client from '../Client';

const ClientList = ({ clients }) => {
    const [searchFilter, setSearchFilter] = useState('');
    const [clientColors, setClientColors] = useState({});

    const filteredClients = clients
        .sort((a, b) => a.nafn.localeCompare(b.nafn))
        .filter(client =>
            client.nafn.toLowerCase().includes(searchFilter.toLowerCase()) ||
            client.kennitala.includes(searchFilter)
        );

    const handleColorChange = (clientName, color) => {
        setClientColors({
            ...clientColors,
            [clientName]: color
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder='Leita eftir að nafni eða kennitölu'
                value={searchFilter}
                onChangeText={text => setSearchFilter(text)}
            />
            {clients.length === 0
                ? (
                    <Text style={styles.paragraph}></Text>
                )
                : filteredClients.length > 0
                    ? (
                        <View style={styles.table}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.columnHeader, { flex: 0.5 }]}> </Text>
                                <Text style={styles.columnHeader}>Nafn</Text>
                                <Text style={styles.columnHeader}>Kennitala</Text>
                                <Text style={styles.columnHeader}>Deild/ir</Text>
                                <Text style={styles.columnHeader}>Litur</Text>
                                <Text style={[styles.columnHeader, { flex: 0.5 }]}> </Text>
                            </View>
                            {filteredClients.map(c => (
                                <Client
                                    key={c.nafn}
                                    {...c}
                                    color={clientColors[c.nafn]}
                                    onColorChange={color => handleColorChange(c.nafn, color)}
                                />
                            ))}
                        </View>
                    )
                    : (
                        <Text style={styles.paragraph}></Text>
                    )}
        </View>
    );
};

export default ClientList;
