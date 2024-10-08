import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder=""
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#B0B0B0"
        />
        {value === '' && (
            <Text style={styles.placeholder}>{placeholder}</Text>
        )}
    </View>
);

// Component หลัก
const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
                'Mitr-Bold': require('../assets/fonts/Mitr-Bold.ttf'),
                'Mitr-Medium': require('../assets/fonts/Mitr-Medium.ttf'),
                'Mitr-SemiBold': require('../assets/fonts/Mitr-SemiBold.ttf'),
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    const handleLogin = () => {
        console.log('Login attempted with:', username, password);
    };

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>บริษัท</Text>
            <Text style={styles.subtitle}>เข้าสู่ระบบ</Text>
            <Text style={styles.description}>กรุณาเข้าสู่ระบบบัญชีที่ลงทะเบียนไว้</Text>

            <InputField 
                placeholder="ชื่อผู้ใช้" 
                value={username} 
                onChangeText={setUsername} 
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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgetpasswordButton}>
                <Text style={styles.forgetpasswordText}>ลืมรหัสผ่าน?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or sign in with</Text>

            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/iconGoogle.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/iconFacebook.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.line} />
            <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.createAccountText}>สร้างบัญชี</Text>
            </TouchableOpacity>
        </View>
    );
};

// สไตล์ของคุณที่นี่
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
        fontSize: 20,
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
        textAlign: 'flex-start',
        marginBottom: 30,
        fontFamily: 'Mitr-Bold',
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 25,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
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
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 20,
        top: 15, // ปรับตำแหน่งให้ตรงกับ TextInput
        fontSize: 16,
        color: '#B0B0B0',
        fontFamily: 'Mitr-Regular', // ฟอนต์ที่คุณต้องการ
    },
    eyeIcon: {
        padding: 10,
        alignContent:'flex-end',
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Mitr-Bold',
    },
    orText: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: 'black',
        fontFamily: 'Mitr-Bold',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialButton: {
        width: 150,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
    createAccountButton: {
        backgroundColor: '#D9FFDF',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    createAccountText: {
        color: '#4DB15E',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Mitr-Bold',
    },
    forgetpasswordText: {
        color: '#787878',
        fontSize: 16,
        fontFamily: 'Mitr-Regular',
    },
    forgetpasswordButton: {
        marginTop: 10,
        alignItems: 'flex-start',
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
        marginTop: 40,
    },
});

export default LoginScreen;
