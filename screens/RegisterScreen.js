import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Button = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const InputField = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
    </View>
);

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log('Registration attempted with:', username, email, password);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>บริษัท</Text>
            <Text style={styles.subtitle}>สร้างบัญชี</Text>
            <Text style={styles.description}>โปรดกรอกรายละเอียดด้านล่าง</Text>

            <InputField
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChangeText={setUsername}
            />

            <InputField
                placeholder="อีเมล"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <InputField
                placeholder="รหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="ลงทะเบียน" onPress={handleRegister} />

            <View style={styles.line} />
            <Text style={styles.loginText}>คุณมีบัญชีแล้ว</Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 25,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#D9FFDF',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginTop: 1,
    },
    loginButtonText: {
        color: '#4DB15E',
        fontSize: 16,
        fontWeight: 'bold',
    },

    line: {
        width: '100%', // ปรับขนาดความกว้างของเส้นกั้น
        height: 5,
        backgroundColor: '#F5F5F5', // สีของเส้น
        marginVertical: 20, // ช่องว่างระหว่างเส้นกับปุ่มสร้างบัญชี
        shadowColor: 'rgba(0, 0, 0, 0.5)', // สีเงา
        shadowOffset: { width: 0, height: 1 }, // ตำแหน่งของเงา
        shadowOpacity: 0.8, // ความเข้มของเงา
        shadowRadius: 4, // รัศมีของเงา
        elevation: 5, // ใช้สำหรับ Android
        marginTop: 100,
    },

    loginText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
        marginTop: 10,

    }
});

export default RegisterScreen;