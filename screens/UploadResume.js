import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const UploadResume = () => {
  const [resume, setResume] = useState(null);

  const handleUpload = async () => {
    if (!resume) {
      Alert.alert('กรุณาเลือกไฟล์ PDF');
      return;
    }

    const formData = new FormData();
    formData.append('resume', {
      uri: resume.uri,
      type: resume.type,
      name: resume.name,
    });
    formData.append('user_id', '670b96bfcf741754bb14cdb2'); // เปลี่ยนให้ตรงกับ user_id ของคุณ
    formData.append('job_id', '6707e2e4ed437dfd2b798297'); // เปลี่ยนให้ตรงกับ job_id ที่ต้องการ

    try {
      const response = await axios.post('http://localhost:3000/api/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('สมัครงานสำเร็จ!', response.data.message);
    } catch (error) {
      console.error('Error uploading resume:', error);
      Alert.alert('เกิดข้อผิดพลาด!', 'ไม่สามารถสมัครงานได้ กรุณาลองใหม่อีกครั้ง');
    }
  };

  const selectResume = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setResume(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>อัปโหลด Resume ของคุณ</Text>
      <Button title="เลือกไฟล์ PDF" onPress={selectResume} />
      {resume && (
        <Text style={{ marginVertical: 10 }}>{resume.name}</Text>
      )}
      <Button title="สมัครงาน" onPress={handleUpload} />
    </View>
  );
};

export default UploadResume;
