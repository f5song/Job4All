import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JobDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายละเอียด</Text>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.companyInfo}>
          <View style={styles.companyDetails}>
            <Text style={styles.companyName}>Highspeed Studios</Text>
            <Text style={styles.jobTitle}>Senior Software Engineer</Text>
          </View>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with your company logo URL
            style={styles.logo}
          />
        </View>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>งานประจำ</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>ทำงานที่บ้าน</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>รายชั่วโมง</Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="cash-outline" size={24} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.infoLabel}>เงินเดือน</Text>
              <Text style={styles.infoValue}>15000 THB - 20000 THB/เดือน</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={24} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.infoLabel}>ที่อยู่</Text>
              <Text style={styles.infoValue}>กรุงเทพ, ประเทศไทย</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="time-outline" size={24} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.infoLabel}>เวลาทำงาน</Text>
              <Text style={styles.infoValue}>จันทร์ - ศุกร์, 9:00 - 18:00</Text>
            </View>
          </View>
        </View>
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>รายละเอียดงาน</Text>
          <Text style={styles.descriptionText}>
            เรากำลังมองหานักพัฒนาซอฟต์แวร์ที่มีประสบการณ์เพื่เข้าร่วมทีมของเราในโครงการพัฒนาแอปพลิเคชันที่มีนวัตกรรม 
            โดยมุ่งเน้นการพัฒนาโปรแกรมที่ตอบสนองความต้องการของลูกค้า
          </Text>
          <Text style={styles.descriptionText}>
            คุณจะต้องทำงานร่วมกับทีมในการสร้างสรรค์โซลูชันที่มีประสิทธิภาพและการออกแบบที่ดี 
            เพื่อให้ประสบการณ์ของผู้ใช้ที่ดีที่สุด
          </Text>
          <View style={styles.bulletPoints}>
            <BulletPoint text="พัฒนาฟีเจอร์ใหม่ในซอฟต์แวร์" />
            <BulletPoint text="ทำการแก้ไขและปรับปรุงประสิทธิภาพ" />
            <BulletPoint text="ร่วมมือกับทีม UX/UI ในการออกแบบ" />
            <BulletPoint text="สนับสนุนการทดสอบและบำรุงรักษา" />
            <BulletPoint text="เข้าร่วมการประชุมทีมและเสนอแนวคิด" />
          </View>
        </View>
        <View style={styles.requirementsSection}>
          <Text style={styles.requirementsTitle}>คุณสมบัติที่ต้องการ</Text>
          <Text style={styles.requirementsText}>
            • มีประสบการณ์ในการพัฒนาซอฟต์แวร์ 3 ปีขึ้นไป
          </Text>
          <Text style={styles.requirementsText}>
            • มีทักษะในภาษาโปรแกรมเช่น JavaScript, Python
          </Text>
          <Text style={styles.requirementsText}>
            • มีประสบการณ์ในการทำงานกับฐานข้อมูล SQL/NoSQL
          </Text>
          <Text style={styles.requirementsText}>
            • มีทักษะในการทำงานเป็นทีมและสื่อสารได้ดี
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>สมัครงาน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function BulletPoint({ text }: { text: string }) {
  return (
    <View style={styles.bulletPoint}>
      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  tags: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  requirementsSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requirementsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  bookmarkButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
