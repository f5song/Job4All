import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const InputField = ({ 
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry, 
    keyboardType, 
    showPassword, 
    setShowPassword 
}) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
        {/* ไอคอนเปิด/ปิดรหัสผ่าน */}
        {setShowPassword && (
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
        )}
    </View>
);

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
                'Mitr-Bold': require('../assets/fonts/Mitr-Bold.ttf'),
                'Mitr-Medium': require('../assets/fonts/Mitr-Medium.ttf'),
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    const handleRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage('โปรดกรอกข้อมูลให้ครบถ้วน');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('รหัสผ่านไม่ตรงกัน');
            return;
        }

        setErrorMessage('');

        try {
            const response = await fetch('http://10.0.2.2:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const text = await response.text();
            const data = JSON.parse(text);

            if (response.ok) {
                navigation.navigate('Login');
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            setErrorMessage('เกิดข้อผิดพลาดระหว่างการลงทะเบียน');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>สร้างบัญชี</Text>
            <Text style={styles.description}>โปรดกรอกรายละเอียดด้านล่าง</Text>

            {/* Username Input */}
            <InputField
                placeholder="ชื่อผู้ใช้"
                value={username}
                onChangeText={setUsername}
            />

            {/* Email Input */}
            <InputField
                placeholder="อีเมล"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Password Input with eye icon */}
            <InputField
                placeholder="รหัสผ่าน"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />

            {/* Confirm Password Input with eye icon */}
            <InputField
                placeholder="ยืนยันรหัสผ่าน"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            {/* Register Button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>ลงทะเบียน</Text>
            </TouchableOpacity>

            <Text style={styles.loginText}>คุณมีบัญชีแล้ว?</Text>
            <View style={styles.line} />
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Mitr-Regular',
    },
    eyeIcon: {
        paddingHorizontal: 10, 
        justifyContent: 'center',
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
        fontFamily: 'Mitr-Medium',
    },
    errorText: {
        color: '#FF4C4C',
        backgroundColor: '#FFEDED',
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#FF4C4C',
        fontFamily: 'Mitr-Regular',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Mitr-Medium',
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 30,
        fontFamily: 'Mitr-Regular',
    },
    loginText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginTop: 40,
        fontFamily: 'Mitr-Regular',
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
    },
    loginButton: {
        backgroundColor: '#D9FFDF',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginTop: 1,
    },
});

export default RegisterScreen;
