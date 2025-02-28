import { Text, View } from "react-native";
import tw from "../../tailwind";
import SettingsScreen from "../Home/UserProfileList/SettingsScreen";
export default ProfileScreen = () => (
  <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
    <SettingsScreen/>
  </View>
);