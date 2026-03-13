import modules from '../modules'
import HomeContainer from 'screens/Home/HomeContainer';
import SignInContainer from 'screens/SignIn/LoginContainer';
import ProfileContainer from 'screens/Profile/ProfileContainer';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';

const Tab = createNativeBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarBlurEffect: 'light',
        tabBarStyle: { backgroundColor: modules.PRIMARY_TAB, },
        tabBarInactiveTintColor: modules.WHITE_AL,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: { type: 'sfSymbol', name: 'house', },
        }}
        component={HomeContainer}
      />
      <Tab.Screen
        name="SignIn"
        options={{
          tabBarIcon: { type: 'sfSymbol', name: 'key.2.on.ring', },
        }}
        component={SignInContainer}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: { type: 'sfSymbol', name: 'person', },
        }}
        component={ProfileContainer}
      />
    </Tab.Navigator>

  );
}

export default MyTabs