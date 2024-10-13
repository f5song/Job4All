import React, { useEffect, useState } from 'react'; // import useEffect และ useState
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font'; // import expo-font

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false); // ใช้ useState เพื่อติดตามสถานะการโหลดฟอนต์

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
        'Mitr-Bold': require('../assets/fonts/Mitr-Bold.ttf'),
        'Mitr-Medium': require('../assets/fonts/Mitr-Medium.ttf'),
        'RacingSansOne-Regular': require('../assets/fonts/RacingSansOne-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleNavigate = (role) => {
    navigation.navigate('Login', { userType: role });
  };

  // หากฟอนต์ยังไม่โหลดให้ไม่แสดงคอมโพเนนต์
  if (!fontsLoaded) {
    return null; // หรือแสดง spinner หรือคอมโพเนนต์อื่น ๆ
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Job4All</Text>
      <Text style={styles.subText}>แอพลิเคชันหางานสำหรับผู้พิการ</Text>
      <Text style={styles.continueText}>ดำเนินการต่อโดย</Text>

      <TouchableOpacity style={styles.optionButton} onPress={() => handleNavigate('ผู้หางาน')}>
        <View style={styles.optionContent}>
          <Image style={styles.icon} source={require('../assets/hiring.png')} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>ผู้หางาน</Text>
            <Text style={styles.optionDescription}>หางานง่ายๆได้ในแอพลิเคชัน</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={() => handleNavigate('บริษัท')}>
        <View style={styles.optionContent}>
          <Image style={styles.icon} source={require('../assets/company.png')} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>บริษัท</Text>
            <Text style={styles.optionDescription}>หาพนักงานที่มีคุณภาพได้ที่นี่</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 36,
    color: '#4DB15E',
    marginBottom: 10,
    fontFamily: 'RacingSansOne-Regular',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: 'Mitr-Regular',
  },
  continueText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Mitr-Medium',
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#4DB15E',
    fontFamily: 'Mitr-Medium',
  },
  optionDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontFamily: 'Mitr-Regular',
  },
});

export default WelcomeScreen;
