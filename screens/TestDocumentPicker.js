import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker"; // ใช้เฉพาะ expo-document-picker

const TestDocumentPicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ทดสอบ Document Picker</Text>
      <TouchableOpacity style={styles.button} onPress={handleUploadResume}>
        <Text style={styles.buttonText}>เลือกไฟล์ PDF</Text>
      </TouchableOpacity>
      {selectedFile && (
        <Text style={styles.selectedFile}>
          ไฟล์ที่เลือก: {selectedFile.name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedFile: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default TestDocumentPicker;
