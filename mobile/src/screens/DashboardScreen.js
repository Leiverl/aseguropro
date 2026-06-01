import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import { useAuth } from '../services/AuthContext';
import { useTheme } from '../services/ThemeContext';

const planIcons = { heart: '🏥', car: '🚗', home: '🏠', users: '👨‍👩‍👧‍👦', plane: '✈️', 'graduation-cap': '🎓' };
const getIcon = (icon) => planIcons[icon] || '🛡️';

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { colors, isDark, toggleTheme } = useTheme();
  const [policies, setPolicies] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getPolicies().catch(() => ({ policies: [] })),
      api.getAppointments().catch(() => ({ appointments: [] }))
    ]).then(([pData, aData]) => {
      setPolicies(pData.policies);
      setAppointments(aData.appointments);
    }).finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  const s = makeStyles(colors);

  if (loading) return <View style={[s.container, { backgroundColor: colors.bg }]}><ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 80 }} /></View>;

  return (
    <ScrollView style={[s.container, { backgroundColor: colors.bg }]} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <View style={s.welcomeRow}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{user?.name?.[0] || 'U'}</Text>
          </View>
          <View>
            <Text style={[s.greeting, { color: colors.textMuted }]}>Bienvenido</Text>
            <Text style={[s.userName, { color: colors.text }]}>{user?.name}</Text>
          </View>
        </View>
        <View style={s.statsRow}>
          <View style={[s.statCard, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
            <Text style={[s.statValue, { color: colors.primaryLight }]}>{policies.length}</Text>
            <Text style={[s.statLabel, { color: colors.textMuted }]}>Pólizas activas</Text>
          </View>
          <View style={[s.statCard, { backgroundColor: colors.bgCard, borderColor: colors.border }]}>
            <Text style={[s.statValue, { color: colors.primaryLight }]}>{appointments.filter(a => a.status === 'pending').length}</Text>
            <Text style={[s.statLabel, { color: colors.textMuted }]}>Citas pendientes</Text>
          </View>
        </View>
      </View>

      <View style={s.quickActions}>
        {[
          { icon: '💰', label: 'Cotizar', screen: 'Cotizar' },
          { icon: '📅', label: 'Agendar', screen: 'Citas' },
          { icon: '📋', label: 'Planes', screen: 'Planes' },
        ].map((a, i) => (
          <TouchableOpacity key={i} style={[s.quickBtn, { backgroundColor: colors.bgCard, borderColor: colors.border }]} onPress={() => navigation.navigate(a.screen)} activeOpacity={0.7}>
            <Text style={s.quickIcon}>{a.icon}</Text>
            <Text style={[s.quickLabel, { color: colors.text }]}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={s.section}>
        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>Mis Pólizas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Planes')}>
            <Text style={[s.seeAll, { color: colors.primaryLight }]}>+ Nueva</Text>
          </TouchableOpacity>
        </View>
        {policies.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyIcon}>📋</Text>
            <Text style={[s.emptyText, { color: colors.textDim }]}>Aún no tienes pólizas</Text>
          </View>
        ) : (
          policies.map(p => (
            <View key={p.id} style={[s.policyCard, { backgroundColor: colors.bgInput, borderColor: colors.border }]}>
              <View style={s.policyIconWrap}>
                <Text style={s.policyIcon}>{getIcon(p.icon)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.policyName, { color: colors.text }]}>{p.plan_name}</Text>
                <Text style={[s.policyType, { color: colors.textMuted }]}>{p.plan_type}</Text>
                <Text style={[s.policyDates, { color: colors.textDim }]}>{p.start_date} - {p.end_date}</Text>
              </View>
              <View style={s.policyRight}>
                <View style={[s.statusDot, p.status === 'active' && { backgroundColor: colors.success }]} />
                <Text style={[s.policyPrice, { color: colors.primaryLight }]}>${p.price}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={s.section}>
        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>Mis Citas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Citas')}>
            <Text style={[s.seeAll, { color: colors.primaryLight }]}>+ Nueva</Text>
          </TouchableOpacity>
        </View>
        {appointments.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyIcon}>📅</Text>
            <Text style={[s.emptyText, { color: colors.textDim }]}>No tienes citas</Text>
          </View>
        ) : (
          appointments.slice(0, 3).map(apt => (
            <View key={apt.id} style={[s.aptCard, { backgroundColor: colors.bgInput, borderColor: colors.border }]}>
              <Text style={[s.aptAdvisor, { color: colors.text }]}>{apt.advisor_name}</Text>
              <Text style={[s.aptDate, { color: colors.textMuted }]}>📅 {apt.date} · ⏰ {apt.time}</Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={[s.themeBtn, { borderColor: colors.primary + '33', backgroundColor: colors.primary + '0D' }]} onPress={toggleTheme} activeOpacity={0.7}>
        <Text style={[s.themeBtnText, { color: colors.primaryLight }]}>{isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
        <Text style={s.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const makeStyles = (c) => StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20 },
  welcomeRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: c.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: '700' },
  greeting: { fontSize: 14 },
  userName: { fontSize: 22, fontWeight: '800' },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, borderRadius: 16, padding: 20, borderWidth: 1,
  },
  statValue: { fontSize: 28, fontWeight: '900' },
  statLabel: { fontSize: 12, marginTop: 4 },
  quickActions: { flexDirection: 'row', paddingHorizontal: 24, gap: 10, marginBottom: 24 },
  quickBtn: {
    flex: 1, borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1,
  },
  quickIcon: { fontSize: 24, marginBottom: 6 },
  quickLabel: { fontSize: 12, fontWeight: '600' },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  seeAll: { fontSize: 14, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 30 },
  emptyIcon: { fontSize: 36, marginBottom: 12 },
  emptyText: { fontSize: 14 },
  policyCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1,
  },
  policyIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: c.primary + '1A', alignItems: 'center', justifyContent: 'center' },
  policyIcon: { fontSize: 20 },
  policyName: { fontSize: 15, fontWeight: '700' },
  policyType: { fontSize: 12, textTransform: 'capitalize' },
  policyDates: { fontSize: 11, marginTop: 2 },
  policyRight: { alignItems: 'flex-end', gap: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.textDim },
  policyPrice: { fontSize: 16, fontWeight: '800' },
  aptCard: {
    borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1,
  },
  aptAdvisor: { fontSize: 15, fontWeight: '700' },
  aptDate: { fontSize: 13, marginTop: 6 },
  themeBtn: {
    marginHorizontal: 24, marginBottom: 12,
    borderWidth: 1, borderRadius: 12, padding: 14, alignItems: 'center',
  },
  themeBtnText: { fontWeight: '600', fontSize: 15 },
  logoutBtn: {
    marginHorizontal: 24, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 12, padding: 14, alignItems: 'center',
  },
  logoutText: { color: '#ef4444', fontWeight: '600', fontSize: 15 },
});
