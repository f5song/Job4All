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

const DashboardScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userData, setUserData] = useState(null);

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


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#BDFAC7", "#72D282"]} style={styles.header}>
        <Text style={styles.headerText}>สุขสบาย สำนึกใจ</Text>
        <Image
          source={require("../assets/profile.png")}
          style={styles.profileImage}
        />
      </LinearGradient>
      <View style={styles.headerSearch}>
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหางานที่นี่..."
        />
      </View>

      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statCardGreen}
            onPress={() => alert("ตำแหน่งงานที่สมัคร")}
          >
            <Text style={styles.statValue}>29</Text>
            <Text style={styles.statLabel}>ตำแหน่งงานที่สมัคร</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statCardBlue}
            onPress={() => alert("สัมภาษณ์")}
          >
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>สัมภาษณ์</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>งานล่าสุด</Text>
        {/* แนวนอน */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.horizontalJobCard}>
            <Text style={styles.jobTitle}>Product Manager</Text>
            <Text style={styles.jobLocation}>Bangkok, Thailand</Text>
            <Text style={styles.jobSalary}>฿70,000 - ฿90,000</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.horizontalJobCard}>
            <Text style={styles.jobTitle}>UX/UI Designer</Text>
            <Text style={styles.jobLocation}>Chiang Mai, Thailand</Text>
            <Text style={styles.jobSalary}>฿50,000 - ฿70,000</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.horizontalJobCard}>
            <Text style={styles.jobTitle}>Full Stack Developer</Text>
            <Text style={styles.jobLocation}>Bangkok, Thailand</Text>
            <Text style={styles.jobSalary}>฿80,000 - ฿120,000</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>งานที่แนะนำ</Text>
        <View style={styles.recommendations}>
          <TouchableOpacity style={styles.jobCard}>
            <Text style={styles.jobTitle}>Software Engineer</Text>
            <Text style={styles.jobLocation}>Jakarta, Indonesia</Text>
            <Text style={styles.jobSalary}>$500 - $1,000</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.jobCard}>
            <Text style={styles.jobTitle}>Database Engineer</Text>
            <Text style={styles.jobLocation}>London, United Kingdom</Text>
            <Text style={styles.jobSalary}>$500 - $1,000</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.jobCard}>
            <Text style={styles.jobTitle}>Software Engineer</Text>
            <Text style={styles.jobLocation}>Jakarta, Indonesia</Text>
            <Text style={styles.jobSalary}>$500 - $1,000</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.jobCard}>
            <Text style={styles.jobTitle}>Senior Software Engineer</Text>
            <Text style={styles.jobLocation}>Medan, Indonesia</Text>
            <Text style={styles.jobSalary}>$500 - $1,000</Text>
          </TouchableOpacity>
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCardGreen: {
    backgroundColor: "#72D282",
    borderRadius: 25,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statCardBlue: {
    backgroundColor: "#48A9F8",
    borderRadius: 25,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Mitr-Bold",
  },
  statLabel: {
    fontSize: 14,
    color: "white",
    fontFamily: "Mitr-Regular",
  },
  recommendations: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontFamily: "Mitr-Medium",
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
    fontWeight: "bold",
    fontFamily: "Mitr-Bold",
  },
  jobLocation: {
    color: "gray",
    fontFamily: "Mitr-Regular",
  },
  jobSalary: {
    fontWeight: "bold",
    color: "#4CAF50",
    fontFamily: "Mitr-Bold",
  },
});

export default DashboardScreen;
