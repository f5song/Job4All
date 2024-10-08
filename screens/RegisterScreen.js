import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const Button = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const InputField = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, onFocus }) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onFocus={onFocus}
        />
    </View>
);

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Initialize showPassword state
    const [fontsLoaded, setFontsLoaded] = useState(false);


    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
                'Mitr-Bold': require('../assets/fonts/Mitr-Bold.ttf'),
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    const handleRegister = () => {
        console.log('Registration attempted with:', username, email, password);
        // Implement registration logic here
    };

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Loading indicator while fonts are loading
    }

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
                secureTextEntry={!showPassword}
            />
            <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                />
            </TouchableOpacity>

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
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 10,
        fontFamily: 'Mitr-Bold',
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'Mitr-Bold',
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 30,
        fontFamily: 'Mitr-Regular',
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
    eyeIcon: {
        padding: 10,
        alignContent: 'flex-end',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Mitr-Regular',
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
        fontFamily: 'Mitr-Regular',
    },
    line: {
        width: '100%',
        height: 5,
        backgroundColor: '#F5F5F5',
        marginVertical: 20,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 60,
    },
    loginText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 10,
        fontFamily: 'Mitr-Regular',
    },
});

export default RegisterScreen;
