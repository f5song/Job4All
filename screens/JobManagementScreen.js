import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

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
            fetchJobs(); // Fetch jobs when coming back to the screen
        });

        return unsubscribe; // Clean up the listener
    }, [companyName, navigation]);

    if (loading) {
        return <ActivityIndicator size="large" color="#28A745" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>เกิดข้อผิดพลาด: {error}</Text>;
    }

    if (jobs.length === 0) {
        return <Text style={styles.noJobsText}>ไม่พบงานสำหรับบริษัทของคุณ</Text>;
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
                            onPress={() => navigation.navigate('Applicants', { jobId: item._id })} // Pass jobId to Applicants screen
                        >
                            <Text style={styles.jobTitle}>{item.job_title}</Text>
                            <Text style={styles.jobDetail}>{`สถานที่: ${item.job_location}`}</Text>
                            <Text style={styles.jobDetail}>{`เงินเดือน: ${item.job_salary}`}</Text>
                            <Text style={styles.jobDescription}>{item.job_description}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditAJob', { jobId: item._id })} // Pass jobId to EditJob screen
                        >
                            <Icon name="pencil" size={20} color="#28A745" />
                        </TouchableOpacity>
                    </View>
                )}
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
                contentContainerStyle={styles.flatListContent} // Add padding to the FlatList
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#F9F9F9',
    },
    buttonContainer: {
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#28A745',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "Mitr-Medium", // Custom font applied
    },
    jobItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    jobDetailContainer: {
        flex: 1,
    },
    jobTitle: {
        fontSize: 18,
        color: '#333',
        fontFamily: "Mitr-Medium",  // Custom font applied
    },
    jobDetail: {
        fontSize: 14,
        color: '#666',
        marginVertical: 2,
        fontFamily: "Mitr-Regular", // Custom font applied
    },
    jobDescription: {
        fontSize: 12,
        color: '#888',
        marginTop: 8,
        lineHeight: 18,
        fontFamily: "Mitr-Regular", // Custom font applied
    },
    editButton: {
        marginLeft: 16,
        padding: 8, // Add some padding for better touch target
        borderRadius: 5, // Slight rounding for the edit button
    },
    loader: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontFamily: "Mitr-Regular", // Custom font applied
    },
    noJobsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
        fontFamily: "Mitr-Regular", // Custom font applied
    },
    flatListContent: {
        paddingBottom: 80, // Add bottom padding to the FlatList content
    },
});

export default JobManagementScreen;
