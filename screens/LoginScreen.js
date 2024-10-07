import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login attempted with:', username, password);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>บริษัท</Text>
      <Text style={styles.subtitle}>เข้าสู่ระบบ</Text>
      <Text style={styles.description}>กรุณาเข้าสู่ระบบบัญชีที่ลงทะเบียนไว้</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="รหัสผ่าน"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
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
      </View>

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
      {/* เส้นกั้น */}
      <View style={styles.line} />
      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.createAccountText}>สร้างบัญชี</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 10,

  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'Mitr-Regular',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'flex-start',
    marginBottom: 30,
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
  eyeIcon: {
    padding: 10,
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
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
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
  },
  forgetpasswordText: {
    color: '#787878',
    fontSize: 16,
  },
  forgetpasswordButton: {
    marginTop: 10,
    alignItems: 'flex-start',
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
    marginTop: 70,
  },
}
);

export default LoginScreen;