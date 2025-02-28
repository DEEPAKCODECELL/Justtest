import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import tw from '../../tailwind'; // Ensure you import your Tailwind utility

const ScheduleSlot = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`p-5`}>
      <View style={tw`flex-row justify-between items-center`}>
        <View>
          <Text style={tw`text-lg font-bold text-gray-900`}>Schedule your slot for later</Text>
          <Text style={tw`text-sm text-gray-600`}>Guaranteed on-time service by our trusted Experts</Text>
        </View>
        <CalendarIcon style={tw`w-10 h-10 text-blue-500`} />
      </View>

      <TouchableOpacity
        style={tw`mt-4 w-full bg-pink-500 py-3 rounded-lg flex-row justify-center items-center`}
        onPress={() => navigation.navigate('ChooseService')}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Prebook Now →</Text>
      </TouchableOpacity>
    </View>
  );
};

// Calendar Icon SVG Component
const CalendarIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8 7V3M16 7V3M4 11h16M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </Svg>
);

export default ScheduleSlot;
