import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import Navbar from '../components/Navbar'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
  const [userData, setUserData] = useState(null); // เก็บข้อมูลผู้ใช้
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // โหลดฟอนต์ Mitr-Regular
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  // ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้จาก API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // ดึง userId จาก AsyncStorage
        if (userId) {
          const response = await fetch(`http://10.0.2.2:3000/api/users/id/${userId}`, {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`, // ดึง token และส่งใน headers
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserData(data); // เซ็ตข้อมูลผู้ใช้ใน state
          } else {
            console.error(data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#5de76e', '#dcffe1']} 
        style={styles.header}
      >
        <Image
          source={require('../assets/profile.png')} 
          style={styles.profileImage}
        />
      </LinearGradient>

      <View style={styles.profileInfo}>
        {userData ? (
          <>
            <Text style={styles.nameText}>{userData.firstName} {userData.lastName}</Text>
            <Text style={styles.subText}>{userData.address}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
        )}
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="phone" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>เบอร์โทรศัพท์</Text>
            <Text style={styles.infoText}>{userData?.phone}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="envelope" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>อีเมล</Text>
            <Text style={styles.infoText}>{userData?.email}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="wheelchair" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>ประเภทความพิการ</Text>
            <Text style={styles.infoText}>{userData?.disability_type}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.resumeButton}
        onPress={() => Linking.openURL(userData?.resume || 'https://example.com/default_resume.pdf')}
      >
        <View style={styles.resumeContent}>
          <Text style={styles.resumeText}>เรซูเม่ของฉัน</Text>
          <Text style={styles.fileText}>{'resume.pdf'}</Text>
        </View>
        <FontAwesome name="ellipsis-v" size={20} color="#fff" />
      </TouchableOpacity>

      <Navbar style={styles.navbar} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: 50,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  nameText: {
    fontSize: 24,
    fontFamily: 'Mitr-Regular',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
    fontFamily: 'Mitr-Regular',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
    fontFamily: 'Mitr-Regular',
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoTextContainer: {
    marginLeft: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconCircle: {
    backgroundColor: '#DFF7E1',
    padding: 10,
    width: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Mitr-Regular',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Mitr-Regular',
  },
  resumeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    margin: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resumeContent: {
    flexDirection: 'column',
  },
  resumeText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Mitr-Regular',
  },
  fileText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    fontFamily: 'Mitr-Regular',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AccountScreen;
