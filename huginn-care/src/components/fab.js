import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const FloatingActionButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('NewReport')} // Adjust as needed for your navigation structure
    >
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 90, // Adjust based on your navigation bar height
    backgroundColor: '#D6EBFF',
    borderRadius: 28,
    elevation: 8,
    zIndex: 1 // Make sure the button is on top of other components
  },
  fabIcon: {
    fontSize: 24,
    color: 'white'
  }
});

export default FloatingActionButton;