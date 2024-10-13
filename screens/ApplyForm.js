import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'; // Ensure you have axios imported

export default function JobApplicationScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState(null);
  const route = useRoute();
  const { jobId } = route.params; // รับ jobId จาก params

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleUploadResume = () => {
    console.log('Upload resume');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/api/applications",
        {
          jobId,
          firstName,
          lastName,
          phone,
        }
      );
      console.log("Form submitted", response.data);
      // แสดงข้อความสำเร็จหรือล้างฟอร์มหลังจากส่งข้อมูล
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>กำลังโหลด...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      <View style={styles.header}>
        <Text style={styles.companyName}>{job.company_name || "N/A"}</Text>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{job.job_title || "N/A"}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: job.company_logo || "https://via.placeholder.com/60" }} // ใช้ URL ที่ถูกต้องสำหรับภาพ
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#4CAF50"
            style={styles.backIcon}
          />
          <Text style={styles.formTitle}>กรอกฟอร์ม</Text>
        </View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadResume}
        >
          <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
          <Text style={styles.uploadButtonText}>อัพโหลดเรซูเม่</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>ชื่อ</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="กรอกชื่อ"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>นามสกุล</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="กรอกนามสกุล"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>หมายเลขโทรศัพท์</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="กรอกหมายเลขโทรศัพท์"
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>สมัครงาน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: "#4CAF50",
  },
  header: {
    backgroundColor: "#4CAF50",
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    position: "relative",
    height: 300,
  },
  companyName: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "600",
    top: 20,
  },
  jobTitleContainer: {
    marginRight: 60,
    top: 20,
  },
  jobTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    right: 40,
    top: 60,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 5,
    width: 80,
    height: 80,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: "absolute",
    top: 225,
    left: 0,
    right: 0,
    bottom: 0,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#F1F8E9",
    elevation: 2,
  },
  uploadButtonText: {
    color: "#4CAF50",
    marginLeft: 10,
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    elevation: 3,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
