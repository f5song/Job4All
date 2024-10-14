import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from "react-native";

const ApplicantsScreen = ({ route, navigation }) => {
    const { jobId } = route.params; // ดึง jobId จาก params
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            setLoading(true); // เริ่มโหลดข้อมูล
            setError(null); // ล้างข้อผิดพลาดก่อนหน้า

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

    // รับข้อมูลที่อัปเดตกลับมาจาก EditApplicantScreen
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

    if (loading) {
        return <ActivityIndicator size="large" color="#007BFF" style={styles.loading} />;
    }

    if (error) {
        return <Text style={styles.errorText}>เกิดข้อผิดพลาด: {error}</Text>;
    }

    if (applicants.length === 0) {
        return <Text style={styles.noApplicantsText}>ไม่มีผู้สมัครสำหรับงานนี้</Text>;
    }

    return (
        <FlatList
            data={applicants}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={styles.applicantItem}>
                    <Text style={styles.applicantName}>{`${item.firstName} ${item.lastName}`}</Text>
                    <Text>{`หมายเลขโทรศัพท์: ${item.phone}`}</Text>
                    <Text>{`สถานะการสมัคร: ${item.status}`}</Text>
                    {item.applied_at && (
                        <Text>{`วันที่สมัคร: ${new Date(item.applied_at).toLocaleDateString()}`}</Text>
                    )}
                    <Button 
                        title="แก้ไข" 
                        onPress={() => navigation.navigate("EditApplicant", { applicant: item })} 
                    />
                </View>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        margin: 20,
    },
    noApplicantsText: {
        textAlign: 'center',
        margin: 20,
    },
    listContainer: {
        padding: 16,
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
    },
});

export default ApplicantsScreen;
