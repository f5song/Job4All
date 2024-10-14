import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import PropTypes from 'prop-types';

const ApplicantsScreen = ({ user, navigation }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`http://10.0.2.2:3000/api/jobs_company/${user.company_name}`);
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

        if (user && user.company_name) {
            fetchJobs();
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('AddAJob')} // เปลี่ยนเส้นทางไปที่ AddAJobScreen
                    title="Add Job"
                    color="#0000ff"
                />
            ),
        });
    }, [navigation]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>เกิดข้อผิดพลาด: {error}</Text>;
    }

    if (jobs.length === 0) {
        return <Text>ไม่พบงานสำหรับบริษัทของคุณ</Text>;
    }

    return (
        <FlatList
            data={jobs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <View style={styles.jobItem}>
                    <Text style={styles.jobTitle}>{item.job_title}</Text>
                    <Text>{`สถานที่: ${item.job_location}`}</Text>
                    <Text>{`เงินเดือน: ${item.job_salary}`}</Text>
                    <Text>{`รายละเอียด: ${item.job_description}`}</Text>
                </View>
            )}
        />
    );
};

ApplicantsScreen.propTypes = {
    user: PropTypes.shape({
        company_name: PropTypes.string.isRequired,
    }).isRequired,
    navigation: PropTypes.object.isRequired, // เพิ่ม PropTypes สำหรับ navigation
};

const styles = StyleSheet.create({
    jobItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ApplicantsScreen;
