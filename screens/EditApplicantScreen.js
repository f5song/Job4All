import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const EditApplicantScreen = ({ route, navigation }) => {
    const { applicant } = route.params; // รับข้อมูลผู้สมัครจาก params
    const [status, setStatus] = useState(applicant.status);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/api/applicants/${applicant._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: status, // ส่งสถานะโดยตรง
                }),
            });
    
            if (!response.ok) {
                throw new Error("ไม่สามารถอัปเดตข้อมูลได้");
            }
    
            const updatedApplicant = await response.json(); // รับข้อมูลที่อัปเดตกลับมา
            navigation.navigate("Applicants", { updatedApplicant }); // ส่งข้อมูลกลับไปยังหน้าจอก่อนหน้า
        } catch (error) {
            console.error("Error updating applicant status:", error);
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>สถานะการสมัคร:</Text>
            <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Approved" value="Approved" />
                <Picker.Item label="Rejected" value="Rejected" />
            </Picker>
            <Button title="บันทึก" onPress={handleUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 12,
    },
});

export default EditApplicantScreen;
