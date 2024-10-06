import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={['#5de76e', '#dcffe1']} 
        style={styles.header}
      >
        <Image
          source={require('../assets/profile.png')} 
          style={styles.profileImage}
        />
      </LinearGradient>

      {/* Profile Section */}
      <View style={styles.profileInfo}>
        <Text style={styles.nameText}>สุขสมาน สมานใจ</Text>
        <Text style={styles.subText}>กรุงเทพ, ประเทศไทย</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="phone" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>เบอร์โทรศัพท์</Text>
            <Text style={styles.infoText}>0998767656</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="envelope" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>อีเมล</Text>
            <Text style={styles.infoText}>suksman@gmail.com</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="map-marker" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>ที่อยู่</Text>
            <Text style={styles.infoText}>กรุงเทพ, ประเทศไทย</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconCircle}>
            <FontAwesome name="wheelchair" size={24} color="#4CAF50" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>ประเภทความพิการ</Text>
            <Text style={styles.infoText}>(1) ทางการมองเห็น</Text>
          </View>
        </View>
      </View>

      {/* Resume Section */}
      <TouchableOpacity
        style={styles.resumeButton}
        onPress={() => Linking.openURL('https://example.com/david_resume.pdf')}
      >
        <View style={styles.resumeContent}>
          <Text style={styles.resumeText}>เรซูเม่ของฉัน</Text>
          <Text style={styles.fileText}>david_resume.pdf</Text>
        </View>
        <FontAwesome name="ellipsis-v" size={20} color="#fff" />
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
});

export default AccountScreen;
