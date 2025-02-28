import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "../../../tailwind";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const settingsOptions = [
  { id: 1, title: "Profile", subtitle: "Update personal information", route: "ActualProfile" },
  { id: 3, title: "Addresses", subtitle: "Manage saved addresses", route: "AddressScreen" },
  {id: 18,title:"test",subtitle:"Lager", route:"HorizontalScroll"},
  { id: 4, title: "Refer And Earn", subtitle: "Earn Money For Referral", route: "Refer" },
  { id: 5, title: "Policies", subtitle: "Terms of Use, Privacy Policy and others", route: "Policies" },
  { id: 6, title: "Help & support", subtitle: "Reach out in case you have a question", route: "HelpSupport" },
  { id: 7, title: "BookingHistory", subtitle: "Reach out in case you have a question", route: "BookingHistory" },
  { id: 8, title: "OrderDetails", subtitle: "Reach out in case you have a question", route: "OrderDetails" },
  { id: 9, title: "FAQs", subtitle: "Reach out in case you have a question", route: "FAQs" },
  { id: 10, title: "FAQCategory", subtitle: "Reach out in case you have a question", route: "FAQCategory" },
  { id: 11, title: "Login", subtitle: "Reach out in case you have a question", route: "Login" },
  { id: 12, title: "ProfileSetup", subtitle: "Reach out in case you have a question", route: "ProfileSetup" },
  { id: 13, title: "ServiceSelection", subtitle: "Reach out in case you have a question", route: "ServiceSelection" },
  { id: 14, title: "LocationSelection", subtitle: "Reach out in case you have a question", route: "LocationSelection" },
  { id: 15, title: "WorkDetails", subtitle: "Reach out in case you have a question", route: "WorkDetails" },
  { id: 16, title: "WorkLocation", subtitle: "Reach out in case you have a question", route: "WorkLocation" },
  { id: 17, title: "HomeProvider", subtitle: "Reach out in case you have a question", route: "HomeProvider" },
  {id:19,title:"Category" ,subtitle:"Admin Create Category", route:"CategoryCreate"}
]

const SettingsScreen = () => {
  const navigation = useNavigation(); 

  return (
    <View style={[tw`flex-1 bg-white p-4`, { width }]}>
      <Text style={tw`text-xl font-bold mb-4`}>Settings</Text>

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

      <TouchableOpacity style={tw`mt-6 p-4 bg-red-500 rounded-lg`} onPress={() => console.log("Logout")}>
        <Text style={tw`text-center text-white font-bold`}>Log out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`mt-4 p-4 border border-red-500 rounded-lg`} onPress={() => console.log("Delete Data")}>
        <Text style={tw`text-center text-red-500 font-bold`}>Delete my data</Text>
      </TouchableOpacity>

      <Text style={tw`text-center text-gray-400 mt-6`}>App version 1.0.9</Text>
    </View>
  );
};

export default SettingsScreen;
