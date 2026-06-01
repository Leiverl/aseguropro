import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from '../services/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Nombre, email y contraseña son requeridos');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigation.replace('Main');
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Únete a SeguroPro</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input} placeholder="Nombre completo" placeholderTextColor="#475569"
            value={form.name} onChangeText={(v) => setForm({ ...form, name: v })}
          />
          <TextInput
            style={styles.input} placeholder="Email" placeholderTextColor="#475569"
            value={form.email} onChangeText={(v) => setForm({ ...form, email: v })}
            autoCapitalize="none" keyboardType="email-address"
          />
          <TextInput
            style={styles.input} placeholder="Teléfono" placeholderTextColor="#475569"
            value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input} placeholder="Contraseña" placeholderTextColor="#475569"
            value={form.password} onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading} activeOpacity={0.8}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Crear Cuenta</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkWrap}>
            <Text style={styles.link}>¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050510' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: '900', color: '#f1f5f9', textAlign: 'center', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginTop: 4, marginBottom: 28 },
  card: {
    backgroundColor: 'rgba(15, 15, 30, 0.85)', borderRadius: 20, padding: 28,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  input: {
    backgroundColor: 'rgba(30, 30, 60, 0.9)', borderRadius: 12, padding: 16, fontSize: 15,
    color: '#f1f5f9', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  button: {
    backgroundColor: '#6366f1', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  linkWrap: { marginTop: 20, alignItems: 'center' },
  link: { color: '#94a3b8', fontSize: 14 },
  linkBold: { color: '#818cf8', fontWeight: '700' },
});
