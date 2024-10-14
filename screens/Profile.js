import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import Navbar from '../components/Navbar'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const [userData, setUserData] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await fetch(`http://10.0.2.2:3000/api/users/id/${userId}`, {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserData(data);
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("token");
      navigation.navigate('Login'); // ปรับตามโครงสร้างการนำทางของคุณ
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
            <FontAwesome name="envelope" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>อีเมล</Text>
            <Text style={styles.infoText}>{userData?.email || 'ไม่มีข้อมูล'}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="wheelchair" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>ประเภทความพิการ</Text>
            <Text style={styles.infoText}>{userData?.disability_type || 'ไม่มีข้อมูล'}</Text>
          </View>
        </View>
      </View>

      {/* ปุ่มสามจุดสำหรับเมนูที่มุมขวาบน */}
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
        <FontAwesome name="ellipsis-v" size={24} color="#333" />
      </TouchableOpacity>

      {/* เมนูออกจากระบบ */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Navbar ควรอยู่ที่ด้านล่าง */}
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
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
  menuButton: {
    position: 'absolute', // ใช้ position absolute เพื่อให้ปุ่มอยู่ที่มุมขวาบน
    right: 20,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    right: 20,
    top: 60, // ปรับตำแหน่งเมนูให้อยู่ต่ำกว่าปุ่มสามจุด
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  logoutButton: {
    backgroundColor: '#f44336', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Mitr-Regular',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Adjust padding if needed
    paddingBottom: 10,
  },
});

export default AccountScreen;
