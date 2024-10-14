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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';

const DashboardScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
  const navigation = useNavigation();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Mitr-Regular": require("../assets/fonts/Mitr-Regular.ttf"),
        "Mitr-Medium": require("../assets/fonts/Mitr-Medium.ttf"),
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

        const randomJobs = data.sort(() => 0.5 - Math.random()).slice(0, 6);
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
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await fetch(`http://10.0.2.2:3000/api/users/id/${userId}`, {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
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
    <View style={styles.body}>
      <LinearGradient colors={["#BDFAC7", "#72D282"]} style={styles.header}>
        <Text style={styles.headerText}>
          สวัสดี, {userInfo.firstName} {userInfo.lastName}
        </Text>
        <Image
          source={require("../assets/profile.png")}
          style={styles.profileImage}
        />
      </LinearGradient>

      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <View style={styles.headerSearch}>
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหางานที่นี่..."
            editable={false}
          />
        </View>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>งานล่าสุด</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.jobScroll}>
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
                  onPress={() => navigation.navigate("JobDetail", { jobId: job._id })}
                >
                  <Text style={styles.jobTitle}>{job.job_title}</Text>
                  <Text style={styles.jobLocation}>{job.job_location}</Text>
                  <Text style={styles.jobSalary}>{job.job_salary}</Text>
                </TouchableOpacity>
              ))}
            </View>
        </View>
      </ScrollView>
      <Navbar style={styles.navbar} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  header: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
  },
  headerSearch: {
    padding: 20,
  },
  headerText: {
    marginTop: 30,
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
    color: '#333', // Slightly darker for better contrast
  },
  jobScroll: {
    paddingVertical: 10,
  },
  recommendations: {
    flex: 1,
  },
  jobCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
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
    height: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontFamily: "Mitr-Medium",
    color: "#333",
  },
  jobLocation: {
    color: "gray",
    fontFamily: "Mitr-Regular",
  },
  jobSalary: {
    color: "#4CAF50",
    fontFamily: "Mitr-Medium",
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  jobList: {
    flex: 1,
  },
});

export default DashboardScreen;
