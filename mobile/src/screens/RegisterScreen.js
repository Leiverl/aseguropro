import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';

export default function RegisterScreen({ navigation }) {
  const { colors } = useTheme();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const s = makeStyles(colors);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Nombre, email y contrase\u00f1a son requeridos');
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
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={s.content}>
        <Text style={s.title}>Crear Cuenta</Text>
        <Text style={s.subtitle}>&Uacute;nete a VelmacSafe</Text>

        <View style={[s.card, { borderColor: colors.border }]}>
          <TextInput
            style={[s.input, { borderColor: colors.border }]} placeholder="Nombre completo" placeholderTextColor={colors.textMuted}
            value={form.name} onChangeText={(v) => setForm({ ...form, name: v })}
          />
          <TextInput
            style={[s.input, { borderColor: colors.border }]} placeholder="Email" placeholderTextColor={colors.textMuted}
            value={form.email} onChangeText={(v) => setForm({ ...form, email: v })}
            autoCapitalize="none" keyboardType="email-address"
          />
          <TextInput
            style={[s.input, { borderColor: colors.border }]} placeholder="Tel\u00e9fono" placeholderTextColor={colors.textMuted}
            value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[s.input, { borderColor: colors.border }]} placeholder="Contrase\u00f1a" placeholderTextColor={colors.textMuted}
            value={form.password} onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
          />

          <TouchableOpacity style={[s.button, { backgroundColor: colors.primary }]} onPress={handleRegister} disabled={loading} activeOpacity={0.8}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Crear Cuenta</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={s.linkWrap}>
            <Text style={s.link}>&iquest;Ya tienes cuenta? <Text style={[s.linkBold, { color: colors.primaryLight }]}>Inicia sesi&oacute;n</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '900', color: colors.text, textAlign: 'center', letterSpacing: -0.3 },
  subtitle: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', marginTop: 4, marginBottom: 28 },
  card: {
    backgroundColor: colors.bgCard, borderRadius: 8, padding: 24,
    borderWidth: 1,
  },
  input: {
    backgroundColor: colors.bgInput, borderRadius: 6, padding: 14, fontSize: 14,
    color: colors.text, marginBottom: 10, borderWidth: 1,
  },
  button: {
    borderRadius: 6, padding: 14, alignItems: 'center', marginTop: 6,
    ...shadows(colors).primary,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  linkWrap: { marginTop: 16, alignItems: 'center' },
  link: { color: colors.textSecondary, fontSize: 13 },
  linkBold: { fontWeight: '700' },
});

const shadows = (colors) => ({
  primary: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 3 },
});
