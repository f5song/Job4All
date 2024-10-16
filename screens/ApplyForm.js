import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from '@react-navigation/native';


export default function JobApplicationScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const route = useRoute();
  const { jobId } = route.params;

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

    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        setUserId(id);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    if (jobId) {
      fetchJob();
    }
    fetchUserId();
  }, [jobId]);

  const handleUploadResume = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // จำกัดให้เลือกเฉพาะ PDF
      });

      console.log("Document Picker response: ", res);

      if (!res.canceled && res.assets && res.assets.length > 0) {
        console.log("Selected file: ", res.assets[0]);
        setSelectedFile(res.assets[0]); // เก็บไฟล์ที่เลือก
      } else {
        console.log("User cancelled the picker");
      }
    } catch (err) {
      console.error("Error picking document: ", err);
      Alert.alert("Error", "เกิดข้อผิดพลาดในการเลือกไฟล์: " + err.message);
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is not available.");
      return;
    }
  
    if (!selectedFile) {
      Alert.alert("Error", "กรุณาเลือกไฟล์เรซูเม่ก่อน");
      return;
    }
  
    const appliedAt = new Date().toISOString();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("job_id", jobId);
    formData.append("status", "pending");
    formData.append("applied_at", appliedAt);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
  
    // เพิ่มไฟล์เรซูเม่ในรูปแบบ FormData
    formData.append("resume", {
      uri: selectedFile.uri,
      type: selectedFile.mimeType || "application/pdf",
      name: selectedFile.name || "resume.pdf",
    });
  
    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/api/applications",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted", response.data);
      Alert.alert("สำเร็จ", "สมัครงานสำเร็จแล้ว!", [
        { text: "ตกลง", onPress: () => navigation.navigate("Dashboard") }, // นำทางไปยังหน้าแดชบอร์ด
      ]);
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "เกิดข้อผิดพลาด",
        "ไม่สามารถสมัครงานได้: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const appliedAt = new Date().toISOString();
  console.log({
    user_id: userId, 
    job_id: jobId,
    status: "pending", 
    applied_at: appliedAt,
    firstName: firstName, 
    lastName: lastName, 
    phone: phone,
    resume: selectedFile,

  });

  useEffect(() => {
    console.log("Current selected file:", selectedFile);
  }, [selectedFile]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      <View style={styles.header}>
        <Text style={styles.companyName}>{job ? job.company_name : "N/A"}</Text>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{job ? job.job_title : "N/A"}</Text>
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
          <Text style={styles.uploadButtonText}>
            {selectedFile && selectedFile.name
              ? selectedFile.name
              : "อัพโหลดเรซูเม่"}
          </Text>
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
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "Mitr-Regular",
  },
  jobTitleContainer: {
    marginRight: 60,
    top: 20,
  },
  jobTitle: {
    color: "white",
    fontSize: 26,
    fontFamily: "Mitr-Medium",
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
    fontFamily: "Mitr-Medium",
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
    fontFamily: "Mitr-Regular",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Mitr-Regular",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "Mitr-Regular",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Mitr-Medium",
  },
});