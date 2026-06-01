import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'health', name: 'Salud', icon: '🏥', color: '#ef4444', gradient: ['#ef4444', '#dc2626'] },
  { id: 'auto', name: 'Auto', icon: '🚗', color: '#3b82f6', gradient: ['#3b82f6', '#2563eb'] },
  { id: 'home', name: 'Hogar', icon: '🏠', color: '#22c55e', gradient: ['#22c55e', '#16a34a'] },
  { id: 'life', name: 'Vida', icon: '👨‍👩‍👧‍👦', color: '#a855f7', gradient: ['#a855f7', '#9333ea'] },
  { id: 'travel', name: 'Viajes', icon: '✈️', color: '#f59e0b', gradient: ['#f59e0b', '#d97706'] },
  { id: 'student', name: 'Estudiante', icon: '🎓', color: '#06b6d4', gradient: ['#06b6d4', '#0891b2'] },
];

const stats = [
  { value: '50K+', label: 'Clientes' },
  { value: '98%', label: 'Aprobación' },
  { value: '24/7', label: 'Soporte' },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <View style={styles.heroGrid} />
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeDot}>●</Text>
            <Text style={styles.heroBadgeText}>Confianza y Seguridad</Text>
          </View>
          <Text style={styles.heroTitle}>
            Protegemos{'\n'}
            <Text style={styles.heroGradient}>lo que más{'\n'}te importa</Text>
          </Text>
          <Text style={styles.heroSub}>Planes para ti, tu familia y tus estudios</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Planes')}>
            <Text style={styles.primaryBtnText}>Ver Planes →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTag}>PRODUCTOS</Text>
        <Text style={styles.sectionTitle}>Tipos de Seguro</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { borderColor: cat.color + '30' }]}
              onPress={() => navigation.navigate('Planes', { type: cat.id })}
              activeOpacity={0.8}
            >
              <View style={[styles.categoryIconWrap, { backgroundColor: cat.color + '15' }]}>
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
              </View>
              <Text style={[styles.categoryName, { color: cat.color }]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTag}>ACCIONES</Text>
        <Text style={styles.sectionTitle}>Acceso Rápido</Text>
        <View style={styles.actionsGrid}>
          {[
            { icon: '💰', label: 'Cotizar', screen: 'Cotizar' },
            { icon: '📅', label: 'Agendar Cita', screen: 'Citas' },
            { icon: '🎓', label: 'Estudiantes', screen: 'Planes', params: { type: 'student' } },
            { icon: '👤', label: 'Mi Cuenta', screen: 'Cuenta' },
          ].map((action, i) => (
            <TouchableOpacity
              key={i}
              style={styles.actionCard}
              onPress={() => navigation.navigate(action.screen, action.params || {})}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050510' },
  hero: { paddingTop: 60, paddingBottom: 30, alignItems: 'center', position: 'relative', overflow: 'hidden' },
  heroGlow: {
    position: 'absolute', top: -100, width: 300, height: 300,
    borderRadius: 150, backgroundColor: 'rgba(99, 102, 241, 0.06)', alignSelf: 'center',
  },
  heroGrid: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
  },
  heroContent: { alignItems: 'center', paddingHorizontal: 24 },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(99, 102, 241, 0.15)', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 100, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  heroBadgeDot: { color: '#818cf8', fontSize: 10 },
  heroBadgeText: { color: '#818cf8', fontSize: 13, fontWeight: '600' },
  heroTitle: { fontSize: 36, fontWeight: '900', color: '#f1f5f9', textAlign: 'center', lineHeight: 42, letterSpacing: -1 },
  heroGradient: { color: '#818cf8' },
  heroSub: { color: '#94a3b8', fontSize: 15, textAlign: 'center', marginTop: 12, lineHeight: 22 },
  primaryBtn: {
    backgroundColor: '#6366f1', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 14,
    marginTop: 28, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: 40, marginTop: 30 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '900', color: '#f1f5f9' },
  statLabel: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  section: { paddingHorizontal: 24, paddingVertical: 28 },
  sectionTag: {
    fontSize: 11, fontWeight: '700', color: '#818cf8', letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 24, fontWeight: '800', color: '#f1f5f9', marginBottom: 20, letterSpacing: -0.5 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: {
    width: (width - 68) / 3, backgroundColor: 'rgba(15, 15, 30, 0.85)',
    borderRadius: 16, padding: 18, alignItems: 'center', borderWidth: 1,
  },
  categoryIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  categoryIcon: { fontSize: 22 },
  categoryName: { fontSize: 13, fontWeight: '700' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: {
    backgroundColor: 'rgba(15, 15, 30, 0.85)', borderRadius: 16, padding: 22,
    alignItems: 'center', width: (width - 68) / 2, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  actionIcon: { fontSize: 28, marginBottom: 10 },
  actionLabel: { fontSize: 14, fontWeight: '600', color: '#f1f5f9' },
});
