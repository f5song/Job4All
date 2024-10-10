import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function JobDetailScreen() {
  const [job, setJob] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { jobId } = route.params;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("Fetching job with ID:", jobId);
        const response = await fetch(`http://10.0.2.2:3000/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>กำลังโหลด...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        {/* Company Info */}
        <View style={styles.companyInfo}>
          <View>
            <Text style={styles.companyName}>{job.company_name || "N/A"}</Text>
            <Text style={styles.jobPosition}>{job.job_title || "N/A"}</Text>
          </View>
          <Image
            source={{
              uri: job.company_logo || "https://via.placeholder.com/50",
            }}
            style={styles.logo}
          />
        </View>

        {/* เส้นกั้น */}
        <View style={styles.separator} />

        {/* Job Types */}
        {job.job_type && (
          <View style={styles.badges}>
            <Text style={styles.badge}>{job.job_type}</Text>
          </View>
        )}

        {/* Job Info */}
        <View style={styles.jobInfo}>
          <View style={styles.iconContainer}>
            <Feather name="map-pin" size={24} color="#ffffff" />
          </View>
          <Text style={styles.text}>{job.province || "N/A"}</Text>
        </View>
        <View style={styles.jobInfo}>
          <View style={styles.iconContainer}>
            <Feather name="map" size={24} color="#ffffff" />
          </View>
          <Text style={styles.text}>{job.job_location || "N/A"}</Text>
        </View>
        <View style={styles.salaryInfo}>
          <View style={styles.iconContainer}>
            <Feather name="dollar-sign" size={24} color="#ffffff" />
          </View>
          <Text style={styles.text}>{job.job_salary || "N/A"}</Text>
        </View>

        {/* เส้นกั้น */}
        <View style={styles.separator} />

        <View style={styles.details}>
          <Text style={styles.subtitle}>รายละเอียดงาน</Text>
          <Text style={styles.description}>{job.job_description || "N/A"}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>สมัครงาน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Feather name="bookmark" size={24} color="#10b981" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  content: {
    paddingBottom: 16,
  },
  companyInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f0fdf4",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  companyName: {
    fontSize: 20,
    fontFamily: "Mitr-Medium",
    color: "#065f46",
  },
  jobPosition: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 4,
    fontFamily: "Mitr-Regular",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  jobInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  salaryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: "#374151",
    fontFamily: "Mitr-Regular",
  },
  iconContainer: {
    backgroundColor: "#10b981", // สีเขียวของไอคอน
    padding: 8,
    borderRadius: 30,
  },
  badges: {
    flexDirection: "row",
    marginBottom: 16,
  },
  badge: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    fontFamily: "Mitr-Regular",
  },
  details: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Mitr-Medium",
    marginBottom: 8,
    color: "#374151",
  },
  description: {
    color: "#6b7280",
    lineHeight: 22,
    fontFamily: "Mitr-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  applyButtonText: {
    color: "#ffffff",
    fontFamily: "Mitr-Medium",
    fontSize: 18,
  },
  bookmarkButton: {
    backgroundColor: "#f0fdf4", // ใช้สีเดิม
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e5e5", // สีของเส้นกั้น
    marginVertical: 16,
  },
});
