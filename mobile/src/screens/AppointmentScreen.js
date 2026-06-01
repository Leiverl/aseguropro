import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';

const advisors = [
  { name: 'Mar\u00eda Garc\u00eda', specialties: 'Salud, Vida, Estudiantes' },
  { name: 'Carlos L\u00f3pez', specialties: 'Salud, Auto' },
  { name: 'Ana Mart\u00ednez', specialties: 'Estudiantes, Hogar' },
  { name: 'Roberto D\u00edaz', specialties: 'Auto, Hogar, Viajes' },
  { name: 'Laura S\u00e1nchez', specialties: 'Vida, Salud, Viajes' },
];

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

export default function AppointmentScreen({ navigation }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ advisor_name: '', date: '', time: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  const s = makeStyles(colors);

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
      Alert.alert('\u00c9xito', 'Cita agendada correctamente');
      setForm({ advisor_name: '', date: '', time: '', notes: '' });
      fetchAppointments();
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Agendar Cita</Text>
        <Text style={s.headerSub}>Habla con un asesor experto</Text>
      </View>

      <View style={[s.card, { borderColor: colors.border }]}>
        <Text style={s.sectionLabel}>Selecciona un asesor</Text>
        <View style={s.advisorList}>
          {advisors.map(adv => (
            <TouchableOpacity
              key={adv.name}
              style={[s.advisorCard, { borderColor: colors.border }, form.advisor_name === adv.name && s.advisorSelected]}
              onPress={() => setForm({ ...form, advisor_name: adv.name })}
              activeOpacity={0.7}
            >
              <Text style={s.advisorName}>{adv.name}</Text>
              <Text style={s.advisorSpecialties}>{adv.specialties}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.sectionLabel}>Fecha</Text>
        <TextInput
          style={[s.input, { borderColor: colors.border }]}
          value={form.date}
          onChangeText={(v) => setForm({ ...form, date: v })}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={s.sectionLabel}>Hora</Text>
        <View style={s.timeGrid}>
          {timeSlots.map(t => (
            <TouchableOpacity
              key={t}
              style={[s.timeBtn, { borderColor: colors.border }, form.time === t && s.timeBtnActive]}
              onPress={() => setForm({ ...form, time: t })}
              activeOpacity={0.7}
            >
              <Text style={[s.timeText, form.time === t && s.timeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.sectionLabel}>Notas (opcional)</Text>
        <TextInput
          style={[s.input, s.textArea, { borderColor: colors.border }]}
          value={form.notes}
          onChangeText={(v) => setForm({ ...form, notes: v })}
          placeholder="Cu\u00e9ntanos qu\u00e9 seguro te interesa..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity style={[s.button, { backgroundColor: colors.primary }]} onPress={handleSubmit} disabled={submitting} activeOpacity={0.8}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={s.buttonText}>Agendar Cita</Text>}
        </TouchableOpacity>
      </View>

      <View style={s.myAppts}>
        <Text style={s.sectionTitle}>Mis Citas</Text>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 20 }} />
        ) : appointments.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyText}>No tienes citas agendadas</Text>
          </View>
        ) : (
          appointments.map(apt => (
            <View key={apt.id} style={[s.apptCard, { borderColor: colors.border }]}>
              <View style={s.apptHeader}>
                <Text style={s.apptAdvisor}>{apt.advisor_name}</Text>
                <View style={[s.apptStatus, apt.status === 'pending' && { backgroundColor: colors.accent + '10' }]}>
                  <Text style={[s.apptStatusText, apt.status === 'pending' && { color: colors.accent }]}>
                    {apt.status === 'pending' ? 'Pendiente' : apt.status}
                  </Text>
                </View>
              </View>
              <Text style={s.apptDate}>{apt.date} \u00b7 {apt.time}</Text>
            </View>
          ))
        )}
      </View>
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
  sectionLabel: { fontSize: 12, fontWeight: '700', color: colors.textSecondary, marginBottom: 10, marginTop: 6, letterSpacing: 0.3 },
  advisorList: { gap: 6, marginBottom: 4 },
  advisorCard: {
    backgroundColor: colors.bgInput, borderRadius: 6, padding: 12,
    borderWidth: 1,
  },
  advisorSelected: { borderColor: colors.primary, backgroundColor: colors.primary + '08' },
  advisorName: { fontSize: 14, fontWeight: '600', color: colors.text },
  advisorSpecialties: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  input: {
    backgroundColor: colors.bgInput, borderRadius: 6, padding: 14, fontSize: 14,
    color: colors.text, marginBottom: 10, borderWidth: 1,
  },
  textArea: { minHeight: 70, textAlignVertical: 'top' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  timeBtn: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6,
    backgroundColor: colors.bgInput, borderWidth: 1,
  },
  timeBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary + '10' },
  timeText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  timeTextActive: { color: colors.primaryLight },
  button: {
    borderRadius: 6, padding: 14, alignItems: 'center', marginTop: 6,
    ...shadows(colors).primary,
  },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  myAppts: { paddingHorizontal: 24, paddingBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 14 },
  emptyState: { alignItems: 'center', paddingVertical: 24 },
  emptyText: { color: colors.textMuted, fontSize: 14 },
  apptCard: {
    backgroundColor: colors.bgCard, borderRadius: 8, padding: 16, marginBottom: 10, borderWidth: 1,
  },
  apptHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  apptAdvisor: { fontSize: 14, fontWeight: '700', color: colors.text },
  apptStatus: { borderRadius: 100, paddingHorizontal: 10, paddingVertical: 3 },
  apptStatusText: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  apptDate: { fontSize: 12, color: colors.textSecondary },
});

const shadows = (colors) => ({
  primary: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 3 },
});
