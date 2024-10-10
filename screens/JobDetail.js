import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function JobDetailScreen() {
  const [job, setJob] = useState(null);

  // ฟังก์ชันดึงข้อมูลจาก API
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/jobs/12345"); // ใช้ ID ที่ถูกต้องจาก URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJob(data); // เก็บข้อมูล job ใน state
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, []);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>กำลังโหลด...</Text>
      </View>
    );
  }

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
            <Text style={styles.companyName}>{job.company_name}</Text> {/* แทนที่ด้วยข้อมูลจริง */}
            <Text style={styles.jobPosition}>{job.job_title}</Text>
          </View>
          <Image
            source={{ uri: job.company_logo || "https://via.placeholder.com/50" }} // ใส่ logo จาก API
            style={styles.logo}
          />
        </View>

        {/* Job Info */}
        <View style={styles.jobInfo}>
          <Feather name="map-pin" size={24} color="gray" />
          <Text style={styles.text}>{job.job_location}</Text> {/* ข้อมูลสถานที่ */}
        </View>
        <View style={styles.salaryInfo}>
          <Feather name="dollar-sign" size={24} color="gray" />
          <Text style={styles.text}>{job.job_salary}</Text> {/* ข้อมูลเงินเดือน */}
        </View>
        <View style={styles.badges}>
          {job.job_types.map((type, index) => (
            <Text key={index} style={styles.badge}>{type}</Text> // ตัวอย่างงาน เช่น งานประจำ, ทำงานที่บ้าน
          ))}
        </View>

        <View style={styles.details}>
          <Text style={styles.subtitle}>รายละเอียดงาน</Text>
          <Text style={styles.description}>{job.job_description}</Text> {/* แทนที่ด้วยรายละเอียดงานจริง */}
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
    color: "#6b7280", 
    marginTop: 4, 
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8, 
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
  