import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Component() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>รายละเอียด</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="bookmark" size={24} color="purple" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Company Info */}
        <View style={styles.companyInfo}>
          <View>
            <Text style={styles.companyName}>Highspeed Studios</Text>
            <Text style={styles.jobPosition}>Senior Software Engineer</Text>
          </View>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.logo}
          />
        </View>

        {/* Job Info */}
        <View style={styles.jobInfo}>
          <Feather name="map-pin" size={24} color="gray" />
          <Text style={styles.text}>กรุงเทพ, ประเทศไทย</Text>
        </View>
        <View style={styles.salaryInfo}>
          <Feather name="dollar-sign" size={24} color="gray" />
          <Text style={styles.text}>15000 THB - 20000 THB/เดือน</Text>
        </View>
        <View style={styles.badges}>
          <Text style={styles.badge}>งานประจำ</Text>
          <Text style={styles.badge}>ทำงานที่บ้าน</Text>
          <Text style={styles.badge}>รายชั่วโมง</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.subtitle}>รายละเอียดงาน</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <View style={styles.bullets}>
            <Text style={styles.bullet}>• Sed ut perspiciatis unde omnis</Text>
            <Text style={styles.bullet}>• Doloremque laudantium</Text>
            <Text style={styles.bullet}>• Ipsa quae ab illo inventore</Text>
            <Text style={styles.bullet}>• Sunt explicabo</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>สมัครงาน</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    paddingBottom: 16,
  },
  companyInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  jobPosition: {
    fontSize: 14,
    color: "#6b7280", // สีเทา
    marginTop: 4, // เพิ่มระยะห่างจากชื่อบริษัท
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8, // ทำให้มุมโค้ง
  },
  jobInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  salaryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4b5563",
  },
  badges: {
    flexDirection: "row",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  details: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#6b7280",
    marginBottom: 8,
  },
  bullets: {
    marginLeft: 16,
  },
  bullet: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  applyButton: {
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
  