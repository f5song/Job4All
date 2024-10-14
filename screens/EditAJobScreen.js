import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditAJobScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { jobId } = route.params;

    const [jobData, setJobData] = useState({
        job_title: '',
        job_location: '',
        job_salary: '',
        job_description: '',
        company_name: '',
        province: '',
        job_type: '',
        work_schedule: '',
    });

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await fetch(`http://10.0.2.2:3000/api/jobs/${jobId}`);
                const data = await response.json();
                setJobData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobData();
    }, [jobId]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/api/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });
            if (response.ok) {
                navigation.goBack(); // กลับไปยังหน้าก่อนหน้า
            } else {
                console.error('Failed to update job');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Job Title"
                value={jobData.job_title}
                onChangeText={(text) => setJobData({ ...jobData, job_title: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Job Location"
                value={jobData.job_location}
                onChangeText={(text) => setJobData({ ...jobData, job_location: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Job Salary"
                value={jobData.job_salary}
                onChangeText={(text) => setJobData({ ...jobData, job_salary: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Job Description"
                value={jobData.job_description}
                onChangeText={(text) => setJobData({ ...jobData, job_description: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Company Name"
                value={jobData.company_name}
                onChangeText={(text) => setJobData({ ...jobData, company_name: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Province"
                value={jobData.province}
                onChangeText={(text) => setJobData({ ...jobData, province: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Job Type"
                value={jobData.job_type}
                onChangeText={(text) => setJobData({ ...jobData, job_type: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Work Schedule"
                value={jobData.work_schedule}
                onChangeText={(text) => setJobData({ ...jobData, work_schedule: text })}
                style={styles.input}
            />
            <Button title="Update Job" onPress={handleUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});

export default EditAJobScreen;




