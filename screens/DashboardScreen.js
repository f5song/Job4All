import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native"; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


const DashboardScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [jobs, setJobs] = useState([]); // State สำหรับเก็บข้อมูลงาน
  const [recommendedJobs, setRecommendedJobs] = useState([]); // สำหรับเก็บงานที่สุ่มแนะนำ
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' }); // State สำหรับเก็บข้อมูลผู้ใช้
  const navigation = useNavigation(); // ใช้ navigation

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Mitr-Regular": require("../assets/fonts/Mitr-Regular.ttf"),
        "Mitr-Bold": require("../assets/fonts/Mitr-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/api/jobs");
        const data = await response.json();
        setJobs(data);

        const randomJobs = data.sort(() => 0.5 - Math.random()).slice(0, 6); // สุ่มเลือก 6 งาน
        setRecommendedJobs(randomJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // ดึง userId จาก AsyncStorage
        if (userId) {
          const response = await fetch(`http://10.0.2.2:3000/api/users/id/${userId}`, {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`, // ดึง token และส่งใน headers
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserInfo(data);
          } else {
            console.error(data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#BDFAC7", "#72D282"]} style={styles.header}>
        <Text style={styles.headerText}>
          {userInfo.firstName} {userInfo.lastName}
        </Text>
        <Image
          source={require("../assets/profile.png")}
          style={styles.profileImage}
        />
      </LinearGradient>

      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        {/* เมื่อกดช่องค้นหา จะไปที่ SearchScreen */}
        <View style={styles.headerSearch}>
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหางานที่นี่..."
            editable={false} 
          />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>งานล่าสุด</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {jobs.map((job) => (
            <TouchableOpacity
              key={job._id}
              style={styles.horizontalJobCard}
              onPress={() =>
                navigation.navigate("JobDetail", { jobId: job._id })
              }
            >
              <Text style={styles.jobTitle}>{job.job_title}</Text>
              <Text style={styles.jobLocation}>{job.job_location}</Text>
              <Text style={styles.jobSalary}>{job.job_salary}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>งานที่แนะนำ</Text>
        <View style={styles.recommendations}>
          {recommendedJobs.map((job) => (
            <TouchableOpacity
              key={job._id}
              style={styles.jobCard}
              onPress={() =>
                navigation.navigate("JobDetail", { jobId: job._id })
              } 
            >
              <Text style={styles.jobTitle}>{job.job_title}</Text>
              <Text style={styles.jobLocation}>{job.job_location}</Text>
              <Text style={styles.jobSalary}>{job.job_salary}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Mitr-Bold",
    flexDirection: "row",
    gap: 45,
    marginBottom: -40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: 10,
  },
  headerSearch: {
    padding: 20,
  },
  headerText: {
    marginTop: 50,
    marginLeft: 10,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Mitr-Medium",
    color: "white",
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    fontFamily: "Mitr-Regular",
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: "Mitr-Medium",
  },
  recommendations: {
    flex: 1,
  },
  jobCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  horizontalJobCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: "Mitr-Medium",
  },
  jobLocation: {
    color: "gray",
    fontFamily: "Mitr-Regular",
  },
  jobSalary: {
    color: "#4CAF50",
    fontFamily: "Mitr-Medium",
  },
});

export default DashboardScreen;