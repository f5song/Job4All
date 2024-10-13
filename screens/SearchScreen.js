import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // นำเข้า useNavigation
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import thaiProvinces from "../assets/data/thai_province.json"; // นำเข้าข้อมูลจังหวัด

const SearchScreen = () => {
  const navigation = useNavigation(); // ใช้งาน navigation
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [provinceQuery, setProvinceQuery] = useState(""); // สร้างสถานะสำหรับการค้นหาจังหวัด
  const [filteredProvinces, setFilteredProvinces] = useState(thaiProvinces); // เก็บรายการจังหวัดที่กรองแล้ว

  useEffect(() => {
    Font.loadAsync({
      "Mitr-Regular": require("../assets/fonts/Mitr-Regular.ttf"),
      "Mitr-Bold": require("../assets/fonts/Mitr-Bold.ttf"),
      "Mitr-Medium": require("../assets/fonts/Mitr-Medium.ttf"),
    })
      .then(() => setFontsLoaded(true))
      .catch((error) => console.error(error));

    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/jobs"); // เปลี่ยนเป็น API ที่คุณใช้
      const data = await response.json();
      setJobListings(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    filterJobs();
  }, [searchQuery, selectedFilters]);

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((item) => item !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  const filterJobs = () => {
    const filtered = jobListings.filter((job) => {
      const matchesSearchQuery = job.job_title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesFilters = selectedFilters.every((filter) =>
        [job.job_type, job.work_schedule, job.province].includes(filter)
      );

      return matchesSearchQuery && matchesFilters;
    });

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    if (provinceQuery === "") {
      setFilteredProvinces(thaiProvinces);
    } else {
      const filtered = thaiProvinces.filter((province) =>
        province.name_th.includes(provinceQuery)
      );
      setFilteredProvinces(filtered);
    }
  }, [provinceQuery]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหางานที่นี่..."
            placeholderTextColor="#ccc"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery("")}
          >
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.top}>
        <View style={styles.topText}>
          <Text style={styles.sectionTitle}>ผลลัพธ์</Text>
          <Text style={styles.sectionsecon}>{filteredJobs.length} งาน</Text>
        </View>

        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="filter-list" size={24} color="#4DB15E" />
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {selectedFilters.map((filter, index) => (
          <View key={index} style={styles.selectedFilter}>
            <Text style={styles.filterText}>{filter}</Text>
            <TouchableOpacity
              style={styles.clearfilter}
              onPress={() => toggleFilter(filter)}
            >
              <View style={styles.circle}>
                <Text style={styles.clearButtonfilter}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Job Listings */}
      <ScrollView style={styles.jobList}>
        {filteredJobs.map((job) => (
          <TouchableOpacity
            key={job._id}
            style={styles.jobCard}
            onPress={() => navigation.navigate("JobDetail", { jobId: job._id })} // นำทางไปยัง JobDetail
          >
            <View style={styles.jobInfo}>
              <Text style={styles.companyName}>{job.company_name}</Text>
              <Text style={styles.jobTitle}>{job.job_title}</Text>
              <Text style={styles.salary}>{job.job_salary}</Text>
              <Text style={styles.location}>{job.job_location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>เลือกฟิลเตอร์</Text>

            {/* ประเภทการทำงาน */}
            <Text style={styles.filterCategoryTitle}>ประเภทการทำงาน</Text>
            {["ทำงานที่บ้าน", "ทำงานนอกสถานที่"].map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.filterOption}
                onPress={() => toggleFilter(filter)}
              >
                <Text style={styles.filterText}>{filter}</Text>
                {selectedFilters.includes(filter) && (
                  <Text style={styles.selectedIndicator}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            {/* ประเภทงาน */}
            <Text style={styles.filterCategoryTitle}>ประเภทงาน</Text>
            {["งานประจำ", "พาร์ทไทม์", "รายชั่วโมง"].map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={styles.filterOption}
                onPress={() => toggleFilter(filter)}
              >
                <Text style={styles.filterText}>{filter}</Text>
                {selectedFilters.includes(filter) && (
                  <Text style={styles.selectedIndicator}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            {/* จังหวัด */}
            <Text style={styles.filterCategoryTitle}>จังหวัด</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="พิมพ์เพื่อค้นหาจังหวัด"
              placeholderTextColor="#ccc"
              value={provinceQuery}
              onChangeText={setProvinceQuery}
              keyboardType="default"
              returnKeyType="done"
            />
            <ScrollView style={styles.provinceList} nestedScrollEnabled={true}>
              {filteredProvinces.map((province) => (
                <TouchableOpacity
                  key={province.id}
                  style={styles.filterOption}
                  onPress={() => toggleFilter(province.name_th)}
                >
                  <Text style={styles.filterText}>{province.name_th}</Text>
                  {selectedFilters.includes(province.name_th) && (
                    <Text style={styles.selectedIndicator}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.applyButtonText}>ใช้ฟิลเตอร์</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  searchInput: {
    paddingLeft: 40,
    padding: 12,
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    width: "100%",
    fontFamily: "Mitr-Regular",
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  clearButtonText: {
    fontSize: 18,
    color: "#999",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  topText: {
    flexDirection: "column",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Mitr-Medium",
  },
  sectionsecon: {
    fontSize: 14,
    fontFamily: "Mitr-Regular",
    color: "#888",
  },
  filterIcon: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  selectedFilter: {
    backgroundColor: "#D9FFDF",
    padding: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    fontFamily: "Mitr-Regular",
  },
  clearfilter: {
    marginLeft: 5,
  },
  clearButtonfilter: {
    color: "#FFFFFF",
    fontSize: 16, // ปรับขนาดตัวอักษรให้เหมาะสม
  },
  circle: {
    backgroundColor: "#4DB15E", // สีพื้นหลังของวงกลม (เช่น สีแดงอ่อน)
    borderRadius: 20, // ทำให้เป็นวงกลม
    width: 25, // กำหนดความกว้างของวงกลม
    height: 25, // กำหนดความสูงของวงกลม
    justifyContent: "center", // จัดกึ่งกลางแนวตั้ง
    alignItems: "center", // จัดกึ่งกลางแนวนอน
  },
  jobList: {
    flex: 1,
  },
  jobCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  jobInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontFamily: "Mitr-Medium",
  },
  jobTitle: {
    fontSize: 14,
    fontFamily: "Mitr-Regular",
  },
  salary: {
    fontSize: 14,
    fontFamily: "Mitr-Regular",
    color: "#4DB15E",
  },
  location: {
    fontSize: 12,
    fontFamily: "Mitr-Regular",
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Mitr-Medium",
    marginBottom: 10,
  },
  filterCategoryTitle: {
    fontSize: 16,
    fontFamily: "Mitr-Medium",
    marginTop: 15,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedIndicator: {
    fontSize: 18,
    color: "#4DB15E",
  },
  applyButton: {
    backgroundColor: "#4DB15E",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  applyButtonText: {
    color: "white",
    fontFamily: "Mitr-Medium",
  },
  provinceList: {
    maxHeight: 200, 
    marginTop: 10, // เพิ่มระยะห่างด้านบน
    width: "100%", // ให้แน่ใจว่ามีความกว้างเต็มที่
  },  
});

export default SearchScreen;
