import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useFonts } from 'expo-font';
import HomeScreen from './screens/Home';
import DoctorsScreen from './screens/Doctors';
import SignUpScreen from './screens/SignUp';
import SignInScreen from './screens/Signin';
import ProfileScreen from './screens/Profile';

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    OpenFont: require('./assets/fonts/OpenSans-Regular.ttf')
  });

  if(!loaded){
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#228B22'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'OpenFont'
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Doctors"
          component={DoctorsScreen}
          options={{
            title: "doctors"
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: "sign up"
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            title: "sign in"
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


