import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker"; // Correct import for Picker

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  showPassword,
  setShowPassword,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      // Added keyboardDismissMode to ensure proper dismissal of keyboard
    />
    {setShowPassword && (
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    )}
  </View>
);

const RegisterScreen = ({ navigation }) => {
  const route = useRoute();
  const { userType } = route.params || {};

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [disabilityType, setDisabilityType] = useState(""); // State for disability type
  const [errorMessage, setErrorMessage] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  const handleRegister = async () => {
    console.log("Disability Type:", disabilityType); // Debug log

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("โปรดกรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (
      userType === "ผู้หางาน" &&
      (!firstName || !lastName || !disabilityType)
    ) {
      setErrorMessage("โปรดกรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (userType === "บริษัท" && !companyName) {
      setErrorMessage("โปรดกรอกชื่อบริษัท");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("โปรดกรอกอีเมลในรูปแบบที่ถูกต้อง");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัว");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("http://10.0.2.2:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          userType,
          firstName: userType === "ผู้หางาน" ? firstName : null,
          lastName: userType === "ผู้หางาน" ? lastName : null,
          companyName: userType === "บริษัท" ? companyName : null,
          disabilityType: userType === "ผู้หางาน" ? disabilityType : null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("Login", { userType });
      } else {
        console.error("Registration error:", data.error); // Debug log
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error); // Debug log
      setErrorMessage("เกิดข้อผิดพลาดระหว่างการลงทะเบียน");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>สร้างบัญชีสำหรับ {userType}</Text>
      <Text style={styles.description}>โปรดกรอกรายละเอียดด้านล่าง</Text>

      <InputField
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChangeText={setUsername}
      />

      <InputField
        placeholder="อีเมล"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <InputField
        placeholder="รหัสผ่าน"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <InputField
        placeholder="ยืนยันรหัสผ่าน"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      {userType === "ผู้หางาน" && (
        <>
          <InputField
            placeholder="ชื่อจริง"
            value={firstName}
            onChangeText={setFirstName}
          />

          <InputField
            placeholder="นามสกุล"
            value={lastName}
            onChangeText={setLastName}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>ประเภทความพิการ</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={disabilityType}
                onValueChange={(itemValue) => setDisabilityType(itemValue)}
                style={styles.picker}
                dropdownIconColor="gray" // Change icon color for dropdown
              >
                <Picker.Item label="เลือกประเภทความพิการ" value="" />
                <Picker.Item
                  label="ความพิการทางการเคลื่อนไหว"
                  value="ความพิการทางการเคลื่อนไหว"
                />
                <Picker.Item
                  label="ความพิการทางการมองเห็น"
                  value="ความพิการทางการมองเห็น"
                />
                <Picker.Item
                  label="ความพิการทางการได้ยิน"
                  value="ความพิการทางการได้ยิน"
                />
                <Picker.Item
                  label="ความพิการทางจิตใจ"
                  value="ความพิการทางจิตใจ"
                />
                <Picker.Item
                  label="ความพิการทางการเรียนรู้"
                  value="ความพิการทางการเรียนรู้"
                />
                <Picker.Item
                  label="ความพิการทางออทิสติก"
                  value="ความพิการทางออทิสติก"
                />
                <Picker.Item
                  label="ความพิการทางโรคเรื้อรัง"
                  value="ความพิการทางโรคเรื้อรัง"
                />
                <Picker.Item
                  label="ความพิการทางสมอง"
                  value="ความพิการทางสมอง"
                />
                <Picker.Item
                  label="ความพิการทางสติปัญญา"
                  value="ความพิการทางสติปัญญา"
                />
                <Picker.Item
                  label="ความพิการทางสุขภาพจิต"
                  value="ความพิการทางสุขภาพจิต"
                />
              </Picker>
            </View>
          </View>
        </>
      )}

      {userType === "บริษัท" && (
        <InputField
          placeholder="ชื่อบริษัท"
          value={companyName}
          onChangeText={setCompanyName}
        />
      )}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>ลงทะเบียน</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>คุณมีบัญชีแล้ว?</Text>
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login", { userType })}
      >
        <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "Mitr-Regular",
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Mitr-Medium",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Mitr-Bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Mitr-Regular",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Mitr-Regular",
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  loginButton: {
    marginTop: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#4CAF50",
    fontFamily: "Mitr-Medium",
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    fontFamily: "Mitr-Medium",
    marginBottom: 10,
    color: "#333",
  },
  pickerWrapper: {
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "lightgray",
    overflow: "hidden",
    elevation: 3, // Add slight elevation for a shadow effect
  },
  picker: {
    height: 50,
    width: "100%",
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
