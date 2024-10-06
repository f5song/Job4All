import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // ใช้สำหรับไอคอน
import { LinearGradient } from 'expo-linear-gradient';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={['#207FEE', '#FFFFFF']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Account</Text>
      </LinearGradient>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>สุขสมาน สมานใจ</Text>
        <Text style={styles.titleText}>Programmer</Text>
        <Text style={styles.descriptionText}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
        </Text>
      </View>

      {/* Contact Buttons */}
      <View style={styles.contactSection}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="phone" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="envelope" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="map-marker" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Resume Section */}
      <TouchableOpacity style={styles.resumeButton}>
        <Text style={styles.resumeText}>My Resume</Text>
        <Text style={styles.fileText}>david_resume.pdf</Text>
        <FontAwesome name="ellipsis-v" size={20} color="#4CAF50" style={styles.ellipsisIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 100,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  titleText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  contactSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  resumeButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resumeText: {
    fontSize: 18,
    color: '#fff',
  },
  fileText: {
    fontSize: 14,
    color: '#fff',
  },
  ellipsisIcon: {
    marginLeft: 10,
  },
});

export default AccountScreen;
