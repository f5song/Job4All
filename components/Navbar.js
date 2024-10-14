// Navbar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                <Ionicons name="home-outline" size={24} color="black" />
                <Text style={styles.text}>หน้าหลัก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
                <Ionicons name="search-outline" size={24} color="black" />
                <Text style={styles.text}>ค้นหางาน</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person-outline" size={24} color="black" />
                <Text style={styles.text}>บัญชี</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
    },
    button: {
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        color: 'black',
    },
});

export default Navbar;
