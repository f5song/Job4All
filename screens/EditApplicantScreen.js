import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Font from 'expo-font';

const EditApplicantScreen = ({ route, navigation }) => {
    const { applicant } = route.params; // รับข้อมูลผู้สมัครจาก params
    const [status, setStatus] = useState(applicant.status);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            try {
                await Font.loadAsync({
                    "Mitr-Medium": require("../assets/fonts/Mitr-Medium.ttf"),
                    "Mitr-Regular": require("../assets/fonts/Mitr-Regular.ttf"),
                });
                setFontsLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        loadFonts();
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/api/applicants/${applicant._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: status }),
            });
    
            if (!response.ok) {
                throw new Error("ไม่สามารถอัปเดตข้อมูลได้");
            }
    
            const updatedApplicant = await response.json();
            navigation.navigate("Applicants", { updatedApplicant });
        } catch (error) {
            console.error("Error updating applicant status:", error);
            Alert.alert("เกิดข้อผิดพลาด", error.message);
        }
    };

    if (!fontsLoaded) {
        return null; // Optionally add a loading indicator
    }

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
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>บันทึก</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#F9F9F9',
    },
    label: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 8,
        fontFamily: 'Mitr-Medium',
        color: '#333',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 22,
    },
    button: {
        backgroundColor: '#28A745', // Green button color
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Mitr-Medium', // Use custom font
    },
});

export default EditApplicantScreen;
