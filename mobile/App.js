import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { AuthProvider, useAuth } from './src/services/AuthContext';
import { ThemeProvider, useTheme } from './src/services/ThemeContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import PlansScreen from './src/screens/PlansScreen';
import QuoteScreen from './src/screens/QuoteScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabLabels = { Inicio: '', Planes: '', Cotizar: '', Citas: '', Cuenta: '' };

function TabIcon({ label, focused, color }) {
  const icons = { Inicio: 'I', Planes: 'P', Cotizar: 'C', Citas: 'A', Cuenta: 'U' };
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{
        width: 28, height: 28, borderRadius: 6,
        backgroundColor: focused ? color + '15' : 'transparent',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 13, fontWeight: '700', color: focused ? color : '#64748b' }}>
          {icons[label]}
        </Text>
      </View>
    </View>
  );
}

function MainTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} color={colors.primary} />,
        tabBarStyle: {
          backgroundColor: colors.bgCard,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 20,
          paddingTop: 8,
          height: 64,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Planes" component={PlansScreen} />
      <Tab.Screen name="Cotizar" component={QuoteScreen} />
      <Tab.Screen name="Citas" component={AppointmentScreen} />
      <Tab.Screen name="Cuenta" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();
  const { colors } = useTheme();

  if (loading) return null;

  const navTheme = {
    dark: colors.isDark,
    colors: {
      primary: colors.primary,
      background: colors.bg,
      card: colors.bgCard,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ presentation: 'modal' }} />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style={colors.isDark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
