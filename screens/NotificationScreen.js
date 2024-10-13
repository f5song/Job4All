import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Navbar from '../components/Navbar'; // แก้ไขเส้นทางให้ตรงกับตำแหน่งไฟล์

const notifications = [
    {
        id: 1,
        title: "สมัครเสร็จสิ้น",
        message: "คุณได้สมัครงานใน Queenify Group ในตำแหน่ง UI Designer ",
        time: "10h ago",
        read: false,
    },
    {
        id: 2,
        title: "กรอกโปรไฟล์ของคุณให้สมบูรณ์ ",
        message: "โปรดยืนยันข้อมูลโปรไฟล์ของคุณเพื่อใช้แอปนี้ต่อไป ",
        time: "4 June",
        read: true,
    },
    {
        id: 3,
        title: "สมัครเสร็จสิ้น",
        message: "คุณได้สมัครงานใน Queenify Group ในตำแหน่ง UI Designer ",
        time: "3 June",
        read: true,
    },
    {
        id: 4,
        title: "สัมภาษณ์ ",
        message: "ยินดีด้วย!  พรุ่งนี้คุณมีสัมภาษณ์  เช็คกำหนดการได้ที่นี่.. ",
        time: "4m ago",
        read: true,
    },
];

const NotificationScreen = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Mitr-Regular': require('../assets/fonts/Mitr-Regular.ttf'),
                'Mitr-Bold': require('../assets/fonts/Mitr-Bold.ttf'),
                'Mitr-Medium': require('../assets/fonts/Mitr-Medium.ttf'),
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null; // หรือแสดง loading spinner ถ้าต้องการ
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>แจ้งเตือน</Text>
            <ScrollView>
                {notifications.map((notification) => (
                    <View
                        key={notification.id}
                        style={[styles.notification, !notification.read && styles.unread]}
                    >
                        <Text style={styles.title}>{notification.title}</Text>
                        <Text style={styles.message}>{notification.message}</Text>
                        <Text style={styles.time}>{notification.time}</Text>
                        {!notification.read && (
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Mark as read</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'Mitr-Bold',
    },
    notification: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    unread: {
        borderLeftWidth: 5,
        borderLeftColor: '#4CAF50',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Mitr-Bold',
    },
    message: {
        fontSize: 14,
        marginVertical: 5,
        fontFamily: 'Mitr-Regular',
    },
    time: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 10,
        fontFamily: 'Mitr-Regular',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Mitr-Regular',
    },
});

export default NotificationScreen;
