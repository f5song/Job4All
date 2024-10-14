import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import * as Font from 'expo-font'; // Import Font from expo-font

const ApplicantsScreen = ({ route, navigation }) => {
    const { jobId } = route.params; // Get jobId from params
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fontsLoaded, setFontsLoaded] = useState(false); // State for font loading

    useEffect(() => {
        const loadFonts = async () => {
            try {
                await Font.loadAsync({
                    "Mitr-Regular": require("../assets/fonts/Mitr-Regular.ttf"),
                    "Mitr-Bold": require("../assets/fonts/Mitr-Bold.ttf"),
                    "Mitr-Medium": require("../assets/fonts/Mitr-Medium.ttf"),
                });
                setFontsLoaded(true); // Set fonts loaded state to true
            } catch (error) {
                console.error(error);
            }
        };

        loadFonts(); // Load fonts
    }, []);

    useEffect(() => {
        const fetchApplicants = async () => {
            setLoading(true); // Start loading data
            setError(null); // Clear previous errors

            try {
                const response = await fetch(`http://10.0.2.2:3000/api/applicants/job/${jobId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setApplicants(data);
            } catch (error) {
                console.error('Error fetching applicants:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchApplicants();
        } else {
            setLoading(false);
        }
    }, [jobId]);

    // Receive updated applicant data from EditApplicantScreen
    useEffect(() => {
        if (route.params?.updatedApplicant) {
            const updatedApplicant = route.params.updatedApplicant;
            setApplicants((prevApplicants) =>
                prevApplicants.map((applicant) =>
                    applicant._id === updatedApplicant._id ? updatedApplicant : applicant
                )
            );
        }
    }, [route.params?.updatedApplicant]);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />; // Show loading while fonts are loading
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#28A745" style={styles.loading} />;
    }

    if (error) {
        return <Text style={styles.errorText}>เกิดข้อผิดพลาด: {error}</Text>;
    }

    if (applicants.length === 0) {
        return <Text style={styles.noApplicantsText}>ไม่มีผู้สมัครสำหรับงานนี้</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>รายชื่อผู้สมัครงาน</Text>
            <FlatList
                data={applicants}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.applicantItem}>
                        <Text style={styles.applicantName}>{`${item.firstName} ${item.lastName}`}</Text>
                        <Text style={styles.applicantInfo}>{`หมายเลขโทรศัพท์: ${item.phone}`}</Text>
                        <Text style={styles.applicantInfo}>{`สถานะการสมัคร: ${item.status}`}</Text>
                        {item.applied_at && (
                            <Text style={styles.applicantInfo}>{`วันที่สมัคร: ${new Date(item.applied_at).toLocaleDateString()}`}</Text>
                        )}
                        <TouchableOpacity 
                            style={styles.editButton}
                            onPress={() => navigation.navigate("EditApplicant", { applicant: item })}>
                            <Text style={styles.editButtonText}>แก้ไข</Text>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        color: '#333',
        fontFamily: 'Mitr-Medium', // Use your custom font here
        marginBottom: 20,
        marginTop: 30
    },
    editButton: {
        backgroundColor: '#28A745', // Change button color to green
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center', // Center the text
    },
    editButtonText: {
        color: '#FFFFFF', // White text color
        fontFamily: 'Mitr-Medium', // Use custom font
        fontSize: 16, // Adjust font size
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#FF4136',
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Mitr-Regular',
    },
    noApplicantsText: {
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Mitr-Regular',
    },
    listContainer: {
        padding: 16,
        backgroundColor: '#F9F9F9',
    },
    applicantItem: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    applicantName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        fontFamily: 'Mitr-Medium', // Use your custom font here
        marginBottom: 10,
    },
    applicantInfo: {
        fontSize: 16,
        color: '#555',
        fontFamily: 'Mitr-Regular', // Use your custom font here
        marginBottom: 5,
    },
});

export default ApplicantsScreen;
