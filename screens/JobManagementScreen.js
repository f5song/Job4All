import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'; // ติดตั้งไอคอนที่ต้องการ

const JobManagementScreen = ({ route }) => {
    const { companyName } = route.params;
    const navigation = useNavigation();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobs = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/api/jobs_company/${companyName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (companyName) {
            fetchJobs();
        } else {
            setLoading(false);
        }

        const unsubscribe = navigation.addListener('focus', () => {
            fetchJobs(); // เรียกใช้ fetchJobs เมื่อกลับมาที่หน้า
        });

        // ลบ listener เมื่อ component ถูก unmount
        return unsubscribe;
    }, [companyName, navigation]);

    if (loading) {
        return <ActivityIndicator size="large" color="#007BFF" />;
    }

    if (error) {
        return <Text>เกิดข้อผิดพลาด: {error}</Text>;
    }

    if (jobs.length === 0) {
        return <Text>ไม่พบงานสำหรับบริษัทของคุณ</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddAJob', { companyName })}
                >
                    <Text style={styles.addButtonText}>Add Job</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={jobs}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.jobItem}>
                        <TouchableOpacity 
                            style={styles.jobDetailContainer}
                            onPress={() => navigation.navigate('Applicants', { jobId: item._id })} // ส่ง jobId ไปที่หน้า Applicants
                        >
                            <Text style={styles.jobTitle}>{item.job_title}</Text>
                            <Text style={styles.jobDetail}>{`สถานที่: ${item.job_location}`}</Text>
                            <Text style={styles.jobDetail}>{`เงินเดือน: ${item.job_salary}`}</Text>
                            <Text style={styles.jobDescription}>{item.job_description}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditAJob', { jobId: item._id })} // ส่ง jobId ไปที่หน้า EditJob
                        >
                            <Icon name="pencil" size={20} color="#007BFF" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#007BFF',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    viewApplicantsButton: {
        backgroundColor: '#28A745', // สีเขียว
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    viewApplicantsButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    jobItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    jobDetailContainer: {
        flex: 1, // ทำให้ jobDetailContainer ขยายเต็มพื้นที่
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    jobDetail: {
        fontSize: 14,
        color: '#666',
        marginVertical: 2,
    },
    jobDescription: {
        fontSize: 12,
        color: '#888',
        marginTop: 8,
        lineHeight: 18,
    },
    editButton: {
        marginLeft: 16, // เพิ่มระยะห่างระหว่างปุ่มแก้ไขและรายละเอียดงาน
    },
});

export default JobManagementScreen;
