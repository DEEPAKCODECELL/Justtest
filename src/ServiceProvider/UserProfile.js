import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  ArrowLeft,
  Briefcase,
  HelpCircle,
  CreditCard,
  User,
  Users,
  ShoppingCart,
  Info,
  DollarSign,
  Languages,
  MessageCircle,
} from "lucide-react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const MenuItem = ({ icon, title, subtitle, badge, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={tw`flex-row justify-between items-center py-4 border-b border-gray-200`}
  >
    <View style={tw`flex-row items-center`}>
      <View style={tw`text-gray-500 mr-4`}>{icon}</View>
      <View>
        <Text style={tw`font-medium text-base`}>{title}</Text>
        {subtitle && <Text style={tw`text-sm text-gray-500`}>{subtitle}</Text>}
      </View>
    </View>
    {badge && (
      <Text style={tw`text-purple-600 text-sm font-medium mr-2`}>{badge}</Text>
    )}
  </TouchableOpacity>
);

const Divider = () => <View style={tw`border-t border-gray-200 my-3`} />;

const UserProfile = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-4 border-b bg-white`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <Text style={tw`text-lg font-semibold ml-2`}>Profile</Text>
      </View>

      {/* Content */}
      <ScrollView style={tw`bg-white`}>
        <View style={tw`px-6 py-6 border-b`}>
          <Text style={tw`text-xl font-semibold`}>Derek Aka Rider</Text>
        </View>

        <View style={tw`px-6`}>
          <MenuItem icon={<Briefcase size={20} />} title="Job history" />
          <MenuItem icon={<User size={20} />} title="My Hub" badge="New!" />
          <MenuItem icon={<CreditCard size={20} />} title="Credits" />
          <MenuItem icon={<DollarSign size={20} />} title="Loans" />
          <MenuItem icon={<HelpCircle size={20} />} title="Help center" />
          <MenuItem icon={<Users size={20} />} title="Invite a friend to UC" />
          <MenuItem icon={<ShoppingCart size={20} />} title="UC shop" />
        </View>

        <Divider />

        <View style={tw`px-6`}>
          <MenuItem
            icon={<Info size={20} />}
            title="Financial details"
            subtitle="GST, PAN and Bank information"
          />
          <MenuItem
            icon={<MessageCircle size={20} />}
            title="Send WhatsApp updates"
            subtitle="On"
          />
          <MenuItem
            icon={<Languages size={20} />}
            title="Change language"
            subtitle="English"
          />
        </View>

        <Divider />

        {/* Footer Links */}
        <View style={tw`px-6 pb-6`}>
          <TouchableOpacity>
            <Text style={tw`text-gray-600 text-sm`}>Contact us</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-600 text-sm`}>Terms of use</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-600 text-sm`}>Privacy policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-600 text-sm`}>Welfare policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-600 text-sm`}>
              Rate us on the Play Store
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-600 text-sm`}>
              Download UC Customer app
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-gray-600 text-sm font-bold`}>Logout</Text>
          </TouchableOpacity>
          <Text style={tw`mt-8 text-gray-400 text-xs`}>v7.0.24 252</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;