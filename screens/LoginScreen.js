import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useRoute } from '@react-navigation/native'; // ใช้ useRoute เพื่อรับพารามิเตอร์

const InputField = ({ 
    placeholder, 
    value, 
    onChangeText, 
    secureTextEntry, 
    showPassword, 
    setShowPassword 
}) => (
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

const LoginScreen = ({ navigation }) => {
    const route = useRoute(); // ใช้ useRoute เพื่อรับพารามิเตอร์
    const { userType } = route.params || {}; // รับค่าที่ส่งมา เช่น userType

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

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

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            // Update API URL if necessary
            const response = await fetch('http://10.0.2.2:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('เข้าสู่ระบบสำเร็จ', 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว!');
                navigation.navigate('Home');
            } else {
                setErrorMessage(data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            }
        } catch (error) {
            setErrorMessage('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    if (!fontsLoaded || loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>

            <Text style={styles.subtitle}>เข้าสู่ระบบ{userType}</Text>
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
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />

            {/* Display error message */}
            {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}

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
            <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Register', { userType })}>
                <Text style={styles.createAccountText}>สร้างบัญชี</Text>
            </TouchableOpacity>
        </View>
    );
};

// Your styles here
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
        fontFamily: 'Mitr-Medium',
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'Mitr-Medium',
    },
    description: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'flex-start',
        marginBottom: 30,
        fontFamily: 'Mitr-Medium',
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
        top: 15, // Adjust position to align with TextInput
        fontSize: 16,
        color: '#B0B0B0',
        fontFamily: 'Mitr-Regular',
    },
    eyeIcon: {
        padding: 10,
        alignContent: 'flex-end',
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
        fontFamily: 'Mitr-Medium',
    },
    orText: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: 'black',
        fontFamily: 'Mitr-Medium',
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
        fontFamily: 'Mitr-Medium',
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
        height: 1,
        backgroundColor: 'lightgray',
        marginTop: 10,
        marginBottom: 10,
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
});

export default LoginScreen;
