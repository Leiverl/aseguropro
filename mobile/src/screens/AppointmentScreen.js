import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../services/AuthContext';

const advisors = [
  { name: 'María García', specialties: 'Salud, Vida, Estudiantes' },
  { name: 'Carlos López', specialties: 'Salud, Auto' },
  { name: 'Ana Martínez', specialties: 'Estudiantes, Hogar' },
  { name: 'Roberto Díaz', specialties: 'Auto, Hogar, Viajes' },
  { name: 'Laura Sánchez', specialties: 'Vida, Salud, Viajes' },
];

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

export default function AppointmentScreen({ navigation }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ advisor_name: '', date: '', time: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchAppointments = () => {
    if (!user) return;
    api.getAppointments()
      .then(data => setAppointments(data.appointments))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments() }, [user]);

  const handleSubmit = async () => {
    if (!user) { navigation.navigate('Login'); return; }
    if (!form.advisor_name || !form.date || !form.time) {
      Alert.alert('Error', 'Completa todos los campos'); return;
    }
    setSubmitting(true);
    try {
      await api.createAppointment(form);
      Alert.alert('✅ Éxito', 'Cita agendada correctamente');
      setForm({ advisor_name: '', date: '', time: '', notes: '' });
      fetchAppointments();
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agendar Cita</Text>
        <Text style={styles.headerSub}>Habla con un asesor experto</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Selecciona un asesor</Text>
        <View style={styles.advisorList}>
          {advisors.map(adv => (
            <TouchableOpacity
              key={adv.name}
              style={[styles.advisorCard, form.advisor_name === adv.name && styles.advisorSelected]}
              onPress={() => setForm({ ...form, advisor_name: adv.name })}
              activeOpacity={0.7}
            >
              <View style={styles.advisorRow}>
                <View style={[styles.advisorDot, form.advisor_name === adv.name && { backgroundColor: '#6366f1' }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.advisorName}>{adv.name}</Text>
                  <Text style={styles.advisorSpecialties}>{adv.specialties}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Fecha</Text>
        <TextInput
          style={styles.input}
          value={form.date}
          onChangeText={(v) => setForm({ ...form, date: v })}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#475569"
        />

        <Text style={styles.sectionLabel}>Hora</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.timeBtn, form.time === t && styles.timeBtnActive]}
              onPress={() => setForm({ ...form, time: t })}
              activeOpacity={0.7}
            >
              <Text style={[styles.timeText, form.time === t && styles.timeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Notas (opcional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={form.notes}
          onChangeText={(v) => setForm({ ...form, notes: v })}
          placeholder="Cuéntanos qué seguro te interesa..."
          placeholderTextColor="#475569"
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting} activeOpacity={0.8}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Agendar Cita</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.myAppts}>
        <Text style={styles.sectionTitle}>Mis Citas</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#6366f1" style={{ marginVertical: 20 }} />
        ) : appointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyText}>No tienes citas agendadas</Text>
          </View>
        ) : (
          appointments.map(apt => (
            <View key={apt.id} style={styles.apptCard}>
              <View style={styles.apptHeader}>
                <Text style={styles.apptAdvisor}>{apt.advisor_name}</Text>
                <View style={[styles.apptStatus, apt.status === 'pending' && { backgroundColor: 'rgba(245,158,11,0.1)' }]}>
                  <Text style={[styles.apptStatusText, apt.status === 'pending' && { color: '#f59e0b' }]}>
                    {apt.status === 'pending' ? 'Pendiente' : apt.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.apptDate}>📅 {apt.date} · ⏰ {apt.time}</Text>
            </View>
          ))
        )}
      </View>
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
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#94a3b8', marginBottom: 12, marginTop: 8, letterSpacing: 0.5 },
  advisorList: { gap: 8, marginBottom: 4 },
  advisorCard: {
    backgroundColor: 'rgba(30, 30, 60, 0.9)', borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  advisorSelected: { borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.08)' },
  advisorRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  advisorDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.1)' },
  advisorName: { fontSize: 15, fontWeight: '600', color: '#f1f5f9' },
  advisorSpecialties: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  input: {
    backgroundColor: 'rgba(30, 30, 60, 0.9)', borderRadius: 12, padding: 16, fontSize: 15,
    color: '#f1f5f9', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  timeBtn: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10,
    backgroundColor: 'rgba(30, 30, 60, 0.9)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  timeBtnActive: { borderColor: '#6366f1', backgroundColor: 'rgba(99, 102, 241, 0.1)' },
  timeText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  timeTextActive: { color: '#818cf8' },
  button: {
    backgroundColor: '#6366f1', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  myAppts: { paddingHorizontal: 24, paddingBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#f1f5f9', marginBottom: 16 },
  emptyState: { alignItems: 'center', paddingVertical: 30 },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { color: '#64748b', fontSize: 15 },
  apptCard: {
    backgroundColor: 'rgba(15, 15, 30, 0.85)', borderRadius: 14, padding: 18, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  apptHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  apptAdvisor: { fontSize: 15, fontWeight: '700', color: '#f1f5f9' },
  apptStatus: { borderRadius: 100, paddingHorizontal: 12, paddingVertical: 4 },
  apptStatusText: { fontSize: 12, fontWeight: '600', color: '#94a3b8' },
  apptDate: { fontSize: 13, color: '#94a3b8' },
});
