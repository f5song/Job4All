import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MySVGIcon from '../assets/searchIcon'; // นำเข้าจากไฟล์ที่สร้างไว้
import * as Font from 'expo-font';

const SearchScreen = () => {
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

  if (!fontsLoaded) {
    return null; // หรือแสดง loading spinner ถ้าต้องการ
  }
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder=" ค้นหา"
            placeholderTextColor="#ccc" // กำหนดสีของ placeholder ถ้าต้องการ
          />
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>  X  </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.top}>
        <View style={styles.topText}>
          <Text style={styles.sectionTitle}> ผลลัพธ์ </Text>
          <Text style={styles.sectionsecon}> 45 งาน </Text>
        </View>

        <TouchableOpacity style={styles.topSVG} onPress={() => alert('เลือกประเภท')}>
          <MySVGIcon />
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <TouchableOpacity style={styles.clearfilter}>
            <Text style={styles.clearButtonfilter}> X </Text>
          </TouchableOpacity>
          <Text style={styles.filterText}>งานประจำ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <TouchableOpacity style={styles.clearfilter}>
            <Text style={styles.clearButtonfilter}> X </Text>
          </TouchableOpacity>
          <Text style={styles.filterText}>กรุงเทพ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <TouchableOpacity style={styles.clearfilter}>
            <Text style={styles.clearButtonfilter}> X </Text>
          </TouchableOpacity>          
          <Text style={styles.filterText}>ทำงานที่บ้าน</Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <TouchableOpacity style={styles.clearfilter}>
            <Text style={styles.clearButtonfilter}> X </Text>
          </TouchableOpacity>          
          <Text style={styles.filterText}>รายชั่วโมง</Text>

        </TouchableOpacity>
      </View>


      {/* Job Listings */}
      <ScrollView style={styles.jobList}>
        <View style={styles.jobCard}>
          <View style={styles.icon} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Darkseer Studios</Text>
            <Text style={styles.jobTitle}>Senior Software Engineer</Text>
            <Text style={styles.salary}>$500 - $1,000</Text>
            <Text style={styles.location}>Medan, Indonesia</Text>
          </View>
        </View>

        <View style={styles.jobCard}>
          <View style={[styles.icon, { backgroundColor: '#8A2BE2' }]} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Lunar Djaja Corp.</Text>
            <Text style={styles.jobTitle}>Database Engineer</Text>
            <Text style={styles.salary}>$500 - $1,000</Text>
            <Text style={styles.location}>London, United Kingdom</Text>
          </View>
        </View>

        <View style={styles.jobCard}>
          <View style={[styles.icon, { backgroundColor: '#FF6347' }]} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Highspeed Studios</Text>
            <Text style={styles.jobTitle}>Junior Software Engineer</Text>
            <Text style={styles.salary}>$500 - $1,000</Text>
            <Text style={styles.location}>Jakarta, Indonesia</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row', // จัดเรียงให้เป็นแถว
    flexWrap: 'wrap', // ถ้าจำเป็นให้มีการห่อหุ้มเมื่อไม่พอพื้นที่
    marginBottom: 20, // กำหนดระยะห่างระหว่างส่วนนี้กับส่วนอื่น
  },
  filterButton: {
    flexDirection: 'row', // จัดเรียงให้เป็นแถว
    backgroundColor: '#D9FFDF', // สีพื้นหลัง
    borderRadius: 25, // มุมโค้ง
    padding: 10, // ช่องว่างภายใน
    marginLeft: 10, // ช่องว่างระหว่างปุ่ม
    marginBottom: 10, // ช่องว่างระหว่างแถว
    paddingHorizontal: 10,
  },
  filterText: {
    marginRight: 5,
    marginLeft: 5, // ช่องว่างระหว่างข้อความและปุ่มลบ
    color: '#4DB15E', // สีของข้อความ
    fontFamily: 'Mitr-Medium',
  },
  clearfilter: {
    padding: 5,
    backgroundColor: '#4DB15E',
    borderRadius: 25,
  },
  clearButtonfilter: {
    fontSize: 10, // ขนาดของไอคอนลบ
    color: 'white',
    fontFamily: 'Mitr-Bold',
    
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Mitr-Bold',
  },
  sectionsecon: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 20,
    fontFamily: 'Mitr-Regular',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  top: {
    flexDirection: 'row', // จัดเรียงให้เป็นแถว
    justifyContent: 'space-between', // จัดให้แต่ละส่วนอยู่ตรงข้ามกัน
  },
  topText: {
    marginLeft: 10,
    fontFamily: 'Mitr-Bold',
  },
  topSVG: {
    marginRight: 15,
  },
  searchContainer: {
    marginBottom: 20,
    // สามารถปรับ margin และ layout ของ searchContainer ตามต้องการ
  },
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    paddingLeft: 40, // เพิ่ม padding เพื่อให้ clearButton ไม่ทับกับ text
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    width: '100%', // กำหนดให้ input กว้างเต็มพื้นที่ parent
    fontFamily: 'Mitr-Medium',
  },
  clearButton: {
    position: 'absolute',
    right: 10, // ให้อยู่ติดริมซ้าย
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 25,
    zIndex: 1, // ทำให้ปุ่มอยู่บนสุด
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Mitr-Bold',
  },
  jobList: {
    flex: 1,
  },
  jobCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginRight: 15,
  },
  jobInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Mitr-Medium',
  },
  jobTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Mitr-Bold',
  },
  salary: {
    color: '#72D282',
    fontFamily: 'Mitr-Bold',
  },
  location: {
    color: '#555',
    fontFamily: 'Mitr-Medium',
  },
});

export default SearchScreen;
