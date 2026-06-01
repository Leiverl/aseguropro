import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../services/AuthContext';

const planTypes = [
  { value: 'health', label: 'Salud', icon: '🏥' },
  { value: 'auto', label: 'Auto', icon: '🚗' },
  { value: 'home', label: 'Hogar', icon: '🏠' },
  { value: 'life', label: 'Vida', icon: '👨‍👩‍👧‍👦' },
  { value: 'travel', label: 'Viajes', icon: '✈️' },
  { value: 'student', label: 'Estudiante', icon: '🎓' },
];

export default function QuoteScreen({ navigation }) {
  const { user } = useAuth();
  const [planType, setPlanType] = useState('health');
  const [coverage, setCoverage] = useState('50000');
  const [age, setAge] = useState('25');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cotizador</Text>
        <Text style={styles.headerSub}>Calcula tu prima personalizada</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Tipo de seguro</Text>
        <View style={styles.typeRow}>
          {planTypes.map(pt => (
            <TouchableOpacity
              key={pt.value}
              style={[styles.typeBtn, planType === pt.value && styles.typeBtnActive]}
              onPress={() => setPlanType(pt.value)}
              activeOpacity={0.7}
            >
              <Text style={styles.typeIcon}>{pt.icon}</Text>
              <Text style={[styles.typeLabel, planType === pt.value && styles.typeLabelActive]}>{pt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Monto de cobertura ($)</Text>
        <TextInput
          style={styles.input}
          value={coverage}
          onChangeText={setCoverage}
          keyboardType="numeric"
          placeholderTextColor="#475569"
        />

        <Text style={styles.label}>Tu edad</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholderTextColor="#475569"
        />

        <TouchableOpacity style={styles.button} onPress={handleQuote} disabled={loading} activeOpacity={0.8}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Calcular Cotización</Text>}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultIcon}>✅</Text>
          <Text style={styles.resultTitle}>Tu Cotización</Text>
          <View style={styles.resultRow}>
            <View style={styles.resultAmount}>
              <Text style={styles.amountLabel}>Mensual</Text>
              <Text style={styles.amountValue}>${result.monthly_premium.toFixed(2)}</Text>
            </View>
            <View style={styles.resultAmount}>
              <Text style={styles.amountLabel}>Anual</Text>
              <Text style={styles.amountValue}>${result.annual_premium.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.resultDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Cobertura</Text>
              <Text style={styles.detailValue}>${result.coverage_amount?.toLocaleString()}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Edad</Text>
              <Text style={styles.detailValue}>{result.age} años</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tasa base</Text>
              <Text style={styles.detailValue}>{(result.details?.base_rate * 100).toFixed(1)}%</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Citas')} activeOpacity={0.7}>
            <Text style={styles.secondaryBtnText}>Agendar Cita →</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050510' },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: '#f1f5f9', letterSpacing: -0.5 },
  headerSub: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  card: {
    margin: 24, backgroundColor: 'rgba(15, 15, 30, 0.85)', borderRadius: 20,
    padding: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  label: { fontSize: 13, fontWeight: '700', color: '#94a3b8', marginBottom: 10, marginTop: 8, letterSpacing: 0.5 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  typeBtn: {
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12,
    backgroundColor: 'rgba(30, 30, 60, 0.9)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  typeBtnActive: { borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.1)' },
  typeIcon: { fontSize: 16 },
  typeLabel: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  typeLabelActive: { color: '#818cf8' },
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
  resultCard: {
    margin: 24, marginTop: 0, backgroundColor: 'rgba(15, 15, 30, 0.85)', borderRadius: 20,
    padding: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', alignItems: 'center',
  },
  resultIcon: { fontSize: 40, marginBottom: 12 },
  resultTitle: { fontSize: 20, fontWeight: '800', color: '#f1f5f9', marginBottom: 24 },
  resultRow: { flexDirection: 'row', gap: 12, marginBottom: 24, width: '100%' },
  resultAmount: {
    flex: 1, backgroundColor: 'rgba(30, 30, 60, 0.9)', borderRadius: 14,
    padding: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  amountLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 6 },
  amountValue: { fontSize: 24, fontWeight: '900', color: '#818cf8' },
  resultDetails: { width: '100%', marginBottom: 24 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  detailLabel: { color: '#94a3b8', fontSize: 14 },
  detailValue: { color: '#f1f5f9', fontSize: 14, fontWeight: '600' },
  secondaryBtn: {
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12,
    padding: 14, alignItems: 'center', width: '100%',
  },
  secondaryBtnText: { color: '#f1f5f9', fontWeight: '600', fontSize: 15 },
});
