import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from '../services/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert('Error', 'Completa todos los campos'); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigation.replace('Main');
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.bgGlow} />
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>🛡️</Text>
        </View>
        <Text style={styles.title}>SeguroPro</Text>
        <Text style={styles.subtitle}>Tu seguridad, nuestra prioridad</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#475569"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#475569"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.demoBox}>
            <Text style={styles.demoText}>Demo: demo@email.com / demo123</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading} activeOpacity={0.8}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Ingresar</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkWrap}>
            <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050510' },
  bgGlow: {
    position: 'absolute', top: -120, width: 250, height: 250,
    borderRadius: 125, backgroundColor: 'rgba(99, 102, 241, 0.06)', alignSelf: 'center',
  },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  logoWrap: { alignItems: 'center', marginBottom: 12 },
  logo: { fontSize: 56 },
  title: { fontSize: 32, fontWeight: '900', color: '#f1f5f9', textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginTop: 4, marginBottom: 32 },
  card: {
    backgroundColor: 'rgba(15, 15, 30, 0.85)', borderRadius: 20, padding: 28,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#f1f5f9', marginBottom: 24, textAlign: 'center' },
  input: {
    backgroundColor: 'rgba(30, 30, 60, 0.9)', borderRadius: 12, padding: 16, fontSize: 15,
    color: '#f1f5f9', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  demoBox: {
    backgroundColor: 'rgba(99, 102, 241, 0.08)', borderRadius: 10, padding: 12,
    marginBottom: 20, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.15)',
  },
  demoText: { textAlign: 'center', color: '#818cf8', fontSize: 12, fontWeight: '600' },
  button: {
    backgroundColor: '#6366f1', borderRadius: 12, padding: 16, alignItems: 'center',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  linkWrap: { marginTop: 20, alignItems: 'center' },
  link: { color: '#94a3b8', fontSize: 14 },
  linkBold: { color: '#818cf8', fontWeight: '700' },
});
