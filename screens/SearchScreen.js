import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons'; // ใช้ไอคอนจาก Material Icons

const SearchScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // โหลดฟอนต์ที่ต้องการ
  Font.loadAsync({
    'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
    'Mitr-Bold': require('../assets/fonts/Mitr-Bold.ttf'),
    'Mitr-Medium': require('../assets/fonts/Mitr-Medium.ttf'),
  }).then(() => setFontsLoaded(true)).catch(error => console.error(error));

  if (!fontsLoaded) {
    return null; 
  }

  // ฟังก์ชันสำหรับการเลือกฟิลเตอร์
  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหา"
            placeholderTextColor="#ccc" 
          />
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.top}>
        <View style={styles.topText}>
          <Text style={styles.sectionTitle}>ผลลัพธ์</Text>
          <Text style={styles.sectionsecon}>45 งาน</Text>
        </View>

        <TouchableOpacity style={styles.filterIcon} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="filter-list" size={24} color="#4DB15E" />
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {selectedFilters.map((filter, index) => (
          <View key={index} style={styles.selectedFilter}>
            <Text style={styles.filterText}>{filter}</Text>
            <TouchableOpacity style={styles.clearfilter} onPress={() => toggleFilter(filter)}>
              <Text style={styles.clearButtonfilter}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Job Listings */}
      <ScrollView style={styles.jobList}>
        {/* Job Cards */}
        {/* (The job cards can be rendered here dynamically as per your data) */}
        {/* ตัวอย่าง Job Card */}
        <View style={styles.jobCard}>
          <View style={styles.icon} />
          <View style={styles.jobInfo}>
            <Text style={styles.companyName}>Darkseer Studios</Text>
            <Text style={styles.jobTitle}>Senior Software Engineer</Text>
            <Text style={styles.salary}>฿15,000 - ฿25,000</Text>
            <Text style={styles.location}>Medan, Indonesia</Text>
          </View>
        </View>
        {/* ... */}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>เลือกฟิลเตอร์</Text>
            {['งานประจำ', 'กรุงเทพ', 'ทำงานที่บ้าน', 'รายชั่วโมง'].map((filter, index) => (
              <TouchableOpacity key={index} style={styles.filterOption} onPress={() => toggleFilter(filter)}>
                <Text style={styles.filterText}>{filter}</Text>
                {selectedFilters.includes(filter) && <Text style={styles.selectedIndicator}>✓</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.applyButtonText}>ใช้ฟิลเตอร์</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    paddingLeft: 40,
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    width: '100%',
    fontFamily: 'Mitr-Medium',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 25,
    zIndex: 1,
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: 'Mitr-Medium',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Mitr-Medium',
  },
  sectionsecon: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 20,
    fontFamily: 'Mitr-Regular',
  },
  filterIcon: {
    marginRight: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  selectedFilter: {
    flexDirection: 'row',
    backgroundColor: '#D9FFDF',
    borderRadius: 25,
    padding: 10,
    marginLeft: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  filterText: {
    color: '#4DB15E',
    fontFamily: 'Mitr-Medium',
    marginRight: 5,
  },
  clearfilter: {
    padding: 5,
    backgroundColor: '#4DB15E',
    borderRadius: 20,
  },
  clearButtonfilter: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'Mitr-Medium',
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
    fontFamily: 'Mitr-Medium',
  },
  salary: {
    fontSize: 14,
    color: '#4DB15E',
    fontFamily: 'Mitr-Medium',
  },
  location: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Mitr-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // เพิ่มสีพื้นหลังให้มืด
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Mitr-Medium',
    marginBottom: 20,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedIndicator: {
    color: '#4DB15E',
    fontSize: 18,
    fontFamily: 'Mitr-Medium',
  },
  applyButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4DB15E',
    borderRadius: 25,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Mitr-Medium',
  },
});

export default SearchScreen;

