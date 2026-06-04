import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const s = makeStyles(colors);

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
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={s.content}>
        <Text style={s.title}>VelmacSafe</Text>
        <Text style={s.subtitle}>Tu seguridad, nuestra prioridad</Text>

        <View style={[s.card, { borderColor: colors.border }]}>
          <Text style={s.cardTitle}>Iniciar Sesi&oacute;n</Text>

          <TextInput
            style={[s.input, { borderColor: colors.border }]}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={[s.input, { borderColor: colors.border }]}
            placeholder="Contrase&ntilde;a"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={[s.demoBox, { borderColor: colors.primary + '20' }]}>
            <Text style={s.demoText}>Demo: demo@email.com / demo123</Text>
          </View>

          <TouchableOpacity style={[s.button, { backgroundColor: colors.primary }]} onPress={handleLogin} disabled={loading} activeOpacity={0.8}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Ingresar</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={s.linkWrap}>
            <Text style={s.link}>&iquest;No tienes cuenta? <Text style={[s.linkBold, { color: colors.primaryLight }]}>Reg&iacute;strate</Text></Text>
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
  cardTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: colors.bgInput, borderRadius: 6, padding: 14, fontSize: 14,
    color: colors.text, marginBottom: 10, borderWidth: 1,
  },
  demoBox: {
    backgroundColor: colors.primary + '08', borderRadius: 6, padding: 10,
    marginBottom: 16, borderWidth: 1,
  },
  demoText: { textAlign: 'center', color: colors.primaryLight, fontSize: 11, fontWeight: '600' },
  button: {
    borderRadius: 6, padding: 14, alignItems: 'center',
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
