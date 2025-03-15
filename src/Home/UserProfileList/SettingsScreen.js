import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import tw from "../../../tailwind";
import { Dimensions } from "react-native";
import { logoutUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
const { width } = Dimensions.get("window");
import { ChevronLeft } from "lucide-react-native";

const settingsOptions = [
  { id: 1, title: "Profile", subtitle: "Update personal information", route: "ActualProfile" },
  { id: 4, title: "Refer And Earn", subtitle: "Earn Money For Referral", route: "Refer" },
  { id: 5, title: "Policies", subtitle: "Terms of Use, Privacy Policy and others", route: "Policies" },
  { id: 6, title: "Help & support", subtitle: "Reach out in case you have a question", route: "HelpAndSupport" },
  { id: 9, title: "FAQs", subtitle: "Reach out in case you have a question", route: "FAQs" },
  { id: 10, title: "FAQCategory", subtitle: "Reach out in case you have a question", route: "FAQCategory" },
]

const settingsOptionsProvider = [
   
]


const SettingsScreen = ({setIsAuthenticated}) => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const handleLogout = async () => {
  const result = await dispatch(logoutUser());
  console.log("setting page Response", result);
  if (result && result.payload?.success) {
    await AsyncStorage.removeItem("authToken");// Remove token from storage
    await AsyncStorage.removeItem("role");// Remove role from storage
    console.log("Auth token removed and role removed");
    navigation.navigate("LoginAfterLogout");
  } else {
    console.log("Logout failed");
  }
};
  return (
    <View style={[tw`flex-1 bg-white p-4`, { width }]}>
      <View style={tw`flex-row items-center h-16  bg-white border-b border-gray-200`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full bg-gray-100`}>
          <ChevronLeft size={24} />
        </TouchableOpacity>
        <Text style={tw`text-xl font-medium ml-4`}>Settings</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={settingsOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-4 border-b border-gray-300`}
            onPress={() => navigation.navigate(item.route)}
          >
            <View>
              <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
              <Text style={tw`text-sm text-gray-500`}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={tw`mt-6 p-4 bg-red-500 rounded-lg`} onPress={handleLogout}>
        <Text style={tw`text-center text-white font-bold`}>Log out</Text>
      </TouchableOpacity>
      <Text style={tw`text-center text-gray-400 mt-6`}>App version 1.0.9</Text>
    </View>
  );
};

export default SettingsScreen;
