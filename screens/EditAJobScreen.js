import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Font from 'expo-font'; // Import Font from expo-font

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

    const [fontsLoaded, setFontsLoaded] = useState(false); // State to track font loading

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

        const fetchJobData = async () => {
            try {
                const response = await fetch(`http://10.0.2.2:3000/api/jobs/${jobId}`);
                const data = await response.json();
                setJobData(data);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to fetch job data.');
            }
        };

        fetchJobData(); // Fetch job data
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
                Alert.alert('Success', 'Job updated successfully.');
                navigation.goBack(); // Navigate back to the previous screen
            } else {
                console.error('Failed to update job');
                Alert.alert('Error', 'Failed to update job. Please try again.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while updating the job.');
        }
    };

    if (!fontsLoaded) {
        return null; // You can return a loading spinner or a placeholder while the fonts are loading
    }

    // Filter out jobId and _v from the jobData keys
    const filteredKeys = Object.keys(jobData).filter(key => key !== '_id' && key !== '__v');

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>แก้ไขรายละเอียดงาน</Text>
            {filteredKeys.map((key) => (
                <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>{capitalizeFirstLetter(key.replace('_', ' '))}</Text>
                    <TextInput
                        placeholder={capitalizeFirstLetter(key.replace('_', ' '))}
                        value={jobData[key]}
                        onChangeText={(text) => setJobData({ ...jobData, [key]: text })}
                        style={styles.input}
                        accessibilityLabel={key} // Add accessibility label
                    />
                </View>
            ))}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} accessible>
                <Text style={styles.buttonText}>Update Job</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
        fontFamily: "Mitr-Medium", // Use your custom font here
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontFamily: "Mitr-Medium", // Use your custom font here
    },
    input: {
        height: 50,
        borderColor: '#28A745',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Mitr-Regular', // Use your custom font here
    },
    updateButton: {
        backgroundColor: '#28A745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "Mitr-Regular", // Use your custom font here
    },
});

export default EditAJobScreen;
