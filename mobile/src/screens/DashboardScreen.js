import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';

export default function DashboardScreen({ navigation }) {
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const s = makeStyles(colors);

  useEffect(() => {
    Promise.all([
      api.getPolicies().catch(() => ({ policies: [] })),
      api.getAppointments().catch(() => ({ appointments: [] })),
    ]).then(([pData, aData]) => {
      setPolicies(pData.policies);
      setAppointments(aData.appointments);
    }).finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <View style={s.welcomeRow}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{user?.name?.[0] || 'U'}</Text>
          </View>
          <View>
            <Text style={s.welcome}>Bienvenido, {user?.name}</Text>
            <Text style={s.email}>{user?.email}</Text>
          </View>
        </View>
        <View style={s.statsRow}>
          <View style={[s.statCard, { borderColor: colors.border }]}>
            <Text style={[s.statValue, { color: colors.primary }]}>{policies.length}</Text>
            <Text style={s.statLabel}>P&oacute;lizas</Text>
          </View>
          <View style={[s.statCard, { borderColor: colors.border }]}>
            <Text style={[s.statValue, { color: colors.primary }]}>{appointments.filter(a => a.status === 'pending').length}</Text>
            <Text style={s.statLabel}>Citas</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={s.actionsGrid}>
        <TouchableOpacity style={[s.actionCard, { borderColor: colors.border }]} onPress={() => navigation.navigate('Cotizar')}>
          <Text style={s.actionTitle}>Cotizar</Text>
          <Text style={s.actionDesc}>Calcula tu prima</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.actionCard, { borderColor: colors.border }]} onPress={() => navigation.navigate('Citas')}>
          <Text style={s.actionTitle}>Agendar Cita</Text>
          <Text style={s.actionDesc}>Habla con un asesor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.actionCard, { borderColor: colors.border }]} onPress={() => navigation.navigate('Planes')}>
          <Text style={s.actionTitle}>Ver Planes</Text>
          <Text style={s.actionDesc}>Explora coberturas</Text>
        </TouchableOpacity>
      </View>

      {/* P&oacute;lizas */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Mis P&oacute;lizas</Text>
        {policies.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyText}>A&uacute;n no tienes p&oacute;lizas</Text>
          </View>
        ) : (
          policies.map(p => (
            <View key={p.id} style={[s.policyCard, { borderColor: colors.border }]}>
              <View style={[s.policyIcon, { backgroundColor: (p.color || colors.primary) + '15' }]}>
                <Text style={{ color: p.color || colors.primary, fontWeight: '700', fontSize: 14 }}>
                  {p.plan_name?.[0] || 'S'}
                </Text>
              </View>
              <View style={s.policyInfo}>
                <Text style={s.policyName}>{p.plan_name}</Text>
                <Text style={s.policyType}>{p.plan_type}</Text>
              </View>
              <View style={s.policyRight}>
                <View style={[s.statusBadge, { backgroundColor: p.status === 'active' ? colors.success + '15' : colors.error + '15' }]}>
                  <Text style={{ color: p.status === 'active' ? colors.success : colors.error, fontSize: 10, fontWeight: '700' }}>
                    {p.status === 'active' ? 'Activa' : p.status}
                  </Text>
                </View>
                <Text style={[s.policyPrice, { color: colors.primary }]}>${p.price}/mes</Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Citas */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Mis Citas</Text>
        {appointments.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyText}>No tienes citas agendadas</Text>
          </View>
        ) : (
          appointments.slice(0, 5).map(apt => (
            <View key={apt.id} style={[s.apptCard, { borderColor: colors.border }]}>
              <View style={s.apptHeader}>
                <Text style={s.apptName}>{apt.advisor_name}</Text>
                <View style={[s.apptStatus, { backgroundColor: apt.status === 'pending' ? colors.accent + '10' : colors.success + '10' }]}>
                  <Text style={{ color: apt.status === 'pending' ? colors.accent : colors.success, fontSize: 10, fontWeight: '700' }}>
                    {apt.status === 'pending' ? 'Pendiente' : 'Confirmada'}
                  </Text>
                </View>
              </View>
              <Text style={s.apptDate}>{apt.date} &middot; {apt.time}</Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={[s.logoutBtn, { borderColor: colors.border }]} onPress={handleLogout}>
        <Text style={[s.logoutText, { color: colors.error }]}>Cerrar Sesi&oacute;n</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  welcomeRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 24 },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  welcome: { fontSize: 18, fontWeight: '800', color: colors.text, letterSpacing: -0.3 },
  email: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, backgroundColor: colors.bgCard, borderRadius: 8,
    padding: 20, borderWidth: 1,
  },
  statValue: { fontSize: 28, fontWeight: '900', letterSpacing: -0.3 },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  actionsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8,
    paddingHorizontal: 24, marginBottom: 24,
  },
  actionCard: {
    backgroundColor: colors.bgCard, borderRadius: 8, padding: 18,
    width: '48%', borderWidth: 1,
  },
  actionTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  actionDesc: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  section: { paddingHorizontal: 24, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 12 },
  emptyState: { paddingVertical: 20, alignItems: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 13 },
  policyCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgCard,
    borderRadius: 8, padding: 14, marginBottom: 8, borderWidth: 1,
  },
  policyIcon: { width: 36, height: 36, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  policyInfo: { flex: 1 },
  policyName: { fontSize: 13, fontWeight: '700', color: colors.text },
  policyType: { fontSize: 11, color: colors.textSecondary, textTransform: 'capitalize', marginTop: 1 },
  policyRight: { alignItems: 'flex-end' },
  statusBadge: { borderRadius: 100, paddingHorizontal: 8, paddingVertical: 2, marginBottom: 4 },
  policyPrice: { fontSize: 13, fontWeight: '700' },
  apptCard: {
    backgroundColor: colors.bgCard, borderRadius: 8, padding: 14, marginBottom: 8, borderWidth: 1,
  },
  apptHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  apptName: { fontSize: 13, fontWeight: '700', color: colors.text },
  apptStatus: { borderRadius: 100, paddingHorizontal: 8, paddingVertical: 2 },
  apptDate: { fontSize: 11, color: colors.textSecondary },
  logoutBtn: {
    marginHorizontal: 24, borderRadius: 8, padding: 14,
    alignItems: 'center', borderWidth: 1, marginTop: 8,
  },
  logoutText: { fontWeight: '700', fontSize: 14 },
});
