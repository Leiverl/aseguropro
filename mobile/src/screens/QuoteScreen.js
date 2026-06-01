import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';

const planTypes = [
  { value: 'health', label: 'Salud' },
  { value: 'auto', label: 'Auto' },
  { value: 'home', label: 'Hogar' },
  { value: 'life', label: 'Vida' },
  { value: 'travel', label: 'Viajes' },
  { value: 'student', label: 'Estudiante' },
];

export default function QuoteScreen({ navigation }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [planType, setPlanType] = useState('health');
  const [coverage, setCoverage] = useState('50000');
  const [age, setAge] = useState('25');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const s = makeStyles(colors);

  const handleQuote = async () => {
    if (!user) { navigation.navigate('Login'); return; }
    if (!coverage || !age) { Alert.alert('Error', 'Completa todos los campos'); return; }
    setLoading(true);
    try {
      const data = await api.getQuote({ plan_type: planType, coverage_amount: parseFloat(coverage), age: parseInt(age) });
      setResult(data.quote);
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Cotizador</Text>
        <Text style={s.headerSub}>Calcula tu prima personalizada</Text>
      </View>

      <View style={[s.card, { borderColor: colors.border }]}>
        <Text style={s.label}>Tipo de seguro</Text>
        <View style={s.typeRow}>
          {planTypes.map(pt => (
            <TouchableOpacity
              key={pt.value}
              style={[s.typeBtn, { borderColor: colors.border }, planType === pt.value && s.typeBtnActive]}
              onPress={() => setPlanType(pt.value)}
              activeOpacity={0.7}
            >
              <Text style={[s.typeLabel, planType === pt.value && s.typeLabelActive]}>{pt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>Monto de cobertura ($)</Text>
        <TextInput
          style={[s.input, { borderColor: colors.border }]}
          value={coverage}
          onChangeText={setCoverage}
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={s.label}>Tu edad</Text>
        <TextInput
          style={[s.input, { borderColor: colors.border }]}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity style={[s.button, { backgroundColor: colors.primary }]} onPress={handleQuote} disabled={loading} activeOpacity={0.8}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Calcular Cotizaci&oacute;n</Text>}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={[s.resultCard, { borderColor: colors.border }]}>
          <Text style={s.resultTitle}>Tu Cotizaci&oacute;n</Text>
          <View style={s.resultRow}>
            <View style={[s.resultAmount, { borderColor: colors.border }]}>
              <Text style={s.amountLabel}>Mensual</Text>
              <Text style={[s.amountValue, { color: colors.primary }]}>${result.monthly_premium.toFixed(2)}</Text>
            </View>
            <View style={[s.resultAmount, { borderColor: colors.border }]}>
              <Text style={s.amountLabel}>Anual</Text>
              <Text style={[s.amountValue, { color: colors.primary }]}>${result.annual_premium.toFixed(2)}</Text>
            </View>
          </View>
          <View style={s.resultDetails}>
            <View style={[s.detailRow, { borderBottomColor: colors.border }]}>
              <Text style={s.detailLabel}>Cobertura</Text>
              <Text style={s.detailValue}>${result.coverage_amount?.toLocaleString()}</Text>
            </View>
            <View style={[s.detailRow, { borderBottomColor: colors.border }]}>
              <Text style={s.detailLabel}>Edad</Text>
              <Text style={s.detailValue}>{result.age} a&ntilde;os</Text>
            </View>
            <View style={[s.detailRow, { borderBottomColor: colors.border }]}>
              <Text style={s.detailLabel}>Tasa base</Text>
              <Text style={s.detailValue}>{(result.details?.base_rate * 100).toFixed(1)}%</Text>
            </View>
          </View>
          <TouchableOpacity style={[s.secondaryBtn, { borderColor: colors.border }]} onPress={() => navigation.navigate('Citas')} activeOpacity={0.7}>
            <Text style={[s.secondaryBtnText, { color: colors.text }]}>Agendar Cita</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: colors.text, letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  card: {
    margin: 24, backgroundColor: colors.bgCard, borderRadius: 8,
    padding: 20, borderWidth: 1,
  },
  label: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 8, marginTop: 6, letterSpacing: 0.3 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  typeBtn: {
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 6,
    backgroundColor: colors.bgInput, borderWidth: 1,
  },
  typeBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary + '10' },
  typeLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  typeLabelActive: { color: colors.primaryLight },
  input: {
    backgroundColor: colors.bgInput, borderRadius: 6, padding: 14, fontSize: 14,
    color: colors.text, marginBottom: 10, borderWidth: 1,
  },
  button: {
    borderRadius: 6, padding: 14, alignItems: 'center', marginTop: 6,
    ...shadows(colors).primary,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  resultCard: {
    margin: 24, marginTop: 0, backgroundColor: colors.bgCard, borderRadius: 8,
    padding: 20, borderWidth: 1, alignItems: 'center',
  },
  resultTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 20 },
  resultRow: { flexDirection: 'row', gap: 10, marginBottom: 20, width: '100%' },
  resultAmount: {
    flex: 1, backgroundColor: colors.bgElevated, borderRadius: 6,
    padding: 16, alignItems: 'center', borderWidth: 1,
  },
  amountLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 4 },
  amountValue: { fontSize: 20, fontWeight: '900' },
  resultDetails: { width: '100%', marginBottom: 20 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1,
  },
  detailLabel: { color: colors.textMuted, fontSize: 13 },
  detailValue: { color: colors.text, fontSize: 13, fontWeight: '600' },
  secondaryBtn: {
    borderWidth: 1, borderRadius: 6, padding: 12, alignItems: 'center', width: '100%',
  },
  secondaryBtnText: { fontWeight: '600', fontSize: 14 },
});

const shadows = (colors) => ({
  primary: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 3 },
});
