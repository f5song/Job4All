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
import { useNavigation, useRoute } from "@react-navigation/native"; // Import navigation and route
import Navbar from '../components/Navbar'; // แก้ไขเส้นทางให้ตรงกับตำแหน่งไฟล์


const DashboardScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [jobs, setJobs] = useState([]); // State สำหรับเก็บข้อมูลงาน
  const [recommendedJobs, setRecommendedJobs] = useState([]); // สำหรับเก็บงานที่สุ่มแนะนำ
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' }); // State สำหรับเก็บข้อมูลผู้ใช้
  const navigation = useNavigation(); // ใช้ navigation
  const route = useRoute(); // Get route object
  const { userId } = route.params; // รับ userId จาก props

  // Load custom fonts using expo-font
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Mitr-Regular": require('../assets/fonts/Mitr-Regular.ttf'),
        "Mitr-Bold": require('../assets/fonts/Mitr-Bold.ttf'),
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

        const randomJobs = data.sort(() => 0.5 - Math.random()).slice(0, 6); // สุ่มเลือก 3 งาน
        setRecommendedJobs(randomJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />; // Show a loading screen while fonts are loading
  }

  const handlePost = () => {
    console.log('Job posted');
    navigation.goBack();
  };

  const renderInputField = (label, value, setValue, isVisible, toggleVisible) => (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={toggleVisible} style={styles.inputHeader}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Icon name={isVisible ? 'remove' : 'add'} color="#FF6B6B" size={20} />
      </TouchableOpacity>
      {isVisible && (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder={`ใส่${label.toLowerCase()}`}
          placeholderTextColor="#A0A0A0"
        />
      )}
    </View>
  );

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
  },
  horizonbar: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: "Mitr-Medium",
  },
  form: {
    flex: 1,
    padding: 16,
    marginBottom: 100,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Mitr-Bold', // Custom font applied
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    color: '#333',
    fontFamily: 'Mitr-Regular', // Custom font applied
  },
});

export default DashboardScreen;
