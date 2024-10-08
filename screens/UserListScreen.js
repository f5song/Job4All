import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://10.0.2.2:3000/data'); // ใช้ 10.0.2.2 สำหรับ Android Emulator
                const json = await response.json();
                setUsers(json.users); // เก็บข้อมูลผู้ใช้
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#000" />; // แสดง loading indicator ขณะรอข้อมูล
    }

    if (error) {
        return <Text>Error: {error}</Text>; // แสดงข้อความ error ถ้ามี
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id} // ใช้ _id เป็น key
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.user_type}</Text>
                        <Text>{item.disability_type}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    userItem: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 1,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default UserList;
