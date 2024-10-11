import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CompanyProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }} // เปลี่ยนเป็น URL ของภาพที่คุณต้องการใช้
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>รายละเอียดบริษัท</Text>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }} // เปลี่ยนเป็น URL ของโลโก้บริษัท
            style={styles.logo}
          />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Highspeed Studios.</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.location}>Medan, Indonesia</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFC107" />
                <Text style={styles.rating}>4.5</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#4CAF50" />
            <Text style={styles.contactText}>+51 632 445 556</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#4CAF50" />
            <Text style={styles.contactText}>highspeedst@mail.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="globe-outline" size={20} color="#4CAF50" />
            <Text style={styles.contactText}>highspeed.studio</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>เกี่ยวกับบริษัท</Text>
          <Text style={styles.descriptionText}>
            Highspeed Studios specializes in software development, focusing on innovative solutions to enhance user experiences. 
          </Text>
          <Text style={styles.descriptionText}>
            Our team of experts is dedicated to delivering high-quality products that meet the needs of our clients.
          </Text>
        </View>
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>บริการของเรา</Text>
          <Text style={styles.servicesText}>
            1. การพัฒนาซอฟต์แวร์ที่มีคุณภาพ
          </Text>
          <Text style={styles.servicesText}>
            2. การให้คำปรึกษาด้านเทคโนโลยีสารสนเทศ
          </Text>
          <Text style={styles.servicesText}>
            3. การออกแบบและพัฒนาแอพพลิเคชันมือถือ
          </Text>
          <Text style={styles.servicesText}>
            4. บริการสนับสนุนและบำรุงรักษาระบบ
          </Text>
        </View>
        <View style={styles.teamContainer}>
          <Text style={styles.teamTitle}>ทีมงานของเรา</Text>
          <Text style={styles.teamText}>เรามีทีมงานที่มีความเชี่ยวชาญมากกว่า 50 คน ในหลากหลายสาขา รวมถึงนักพัฒนา นักออกแบบ และผู้เชี่ยวชาญด้านการตลาด</Text>
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>ประวัติความเป็นมา</Text>
          <Text style={styles.historyText}>
            Highspeed Studios ก่อตั้งขึ้นในปี 2015 ด้วยเป้าหมายในการพัฒนาซอฟต์แวร์ที่สร้างสรรค์และนวัตกรรม 
            ปัจจุบันเราเป็นหนึ่งในบริษัทที่เติบโตเร็วที่สุดในอุตสาหกรรมซอฟต์แวร์
          </Text>
        </View>
        <View style={styles.mapContainer}>
          <Text style={styles.mapTitle}>ที่ตั้งของเรา</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/400x200' }} // เปลี่ยนเป็น URL ของแผนที่หรือภาพที่ตั้งบริษัท
            style={styles.mapImage}
          />
        </View>
        <View style={styles.socialMediaContainer}>
          <Text style={styles.socialMediaTitle}>ติดตามเราได้ที่</Text>
          <View style={styles.socialMediaIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-linkedin" size={24} color="#0077b5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-instagram" size={24} color="#C13584" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.jobButton}>
        <Text style={styles.jobButtonText}>ตำแหน่งงาน 21 ตำแหน่ง</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: -40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4CAF50', // กรอบโลโก้
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  contactInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  descriptionContainer: {
    padding: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  servicesContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  servicesText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  teamContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  teamText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  historyContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  mapContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  socialMediaContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  socialMediaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    padding: 8,
  },
  jobButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  jobButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
