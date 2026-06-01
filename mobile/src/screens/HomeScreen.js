import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../services/ThemeContext';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'health', name: 'Salud', color: '#1e40af' },
  { id: 'auto', name: 'Auto', color: '#1e40af' },
  { id: 'home', name: 'Hogar', color: '#1e40af' },
  { id: 'life', name: 'Vida', color: '#1e40af' },
  { id: 'travel', name: 'Viajes', color: '#1e40af' },
  { id: 'student', name: 'Estudiante', color: '#0d9488' },
];

const stats = [
  { value: '50K+', label: 'Clientes' },
  { value: '98%', label: 'Aprobaci\u00f3n' },
  { value: '24/7', label: 'Soporte' },
];

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const s = makeStyles(colors);

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.hero}>
        <View style={s.heroContent}>
          <View style={s.heroBadge}>
            <Text style={s.heroBadgeText}>Confianza y Seguridad</Text>
          </View>
          <Text style={s.heroTitle}>
            Protegemos{'\n'}
            <Text style={s.heroGradient}>lo que m&aacute;s te importa</Text>
          </Text>
          <Text style={s.heroSub}>Planes para ti, tu familia y tus estudios</Text>
          <TouchableOpacity style={s.primaryBtn} onPress={() => navigation.navigate('Planes')}>
            <Text style={s.primaryBtnText}>Ver Planes</Text>
          </TouchableOpacity>
        </View>
        <View style={s.statsRow}>
          {stats.map((sItem, i) => (
            <View key={i} style={s.statItem}>
              <Text style={s.statValue}>{sItem.value}</Text>
              <Text style={s.statLabel}>{sItem.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTag}>PRODUCTOS</Text>
        <Text style={s.sectionTitle}>Tipos de Seguro</Text>
        <View style={s.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[s.categoryCard, { borderColor: colors.border }]}
              onPress={() => navigation.navigate('Planes', { type: cat.id })}
              activeOpacity={0.8}
            >
              <View style={[s.categoryIconWrap, { backgroundColor: cat.color + '15' }]}>
                <Text style={[s.categoryIcon, { color: cat.color }]}>{cat.name[0]}</Text>
              </View>
              <Text style={[s.categoryName, { color: cat.color }]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTag}>ACCIONES</Text>
        <Text style={s.sectionTitle}>Acceso R&aacute;pido</Text>
        <View style={s.actionsGrid}>
          <TouchableOpacity
            style={[s.actionCard, { borderColor: colors.border }]}
            onPress={() => navigation.navigate('Cotizar')}
            activeOpacity={0.7}
          >
            <Text style={s.actionLabel}>Cotizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.actionCard, { borderColor: colors.border }]}
            onPress={() => navigation.navigate('Citas')}
            activeOpacity={0.7}
          >
            <Text style={s.actionLabel}>Agendar Cita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.actionCard, { borderColor: colors.border }]}
            onPress={() => navigation.navigate('Planes', { type: 'student' })}
            activeOpacity={0.7}
          >
            <Text style={s.actionLabel}>Estudiantes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.actionCard, { borderColor: colors.border }]}
            onPress={() => navigation.navigate('Cuenta')}
            activeOpacity={0.7}
          >
            <Text style={s.actionLabel}>Mi Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { paddingTop: 60, paddingBottom: 30, alignItems: 'center' },
  heroContent: { alignItems: 'center', paddingHorizontal: 24 },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primary + '15', paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 100, marginBottom: 20, borderWidth: 1, borderColor: colors.primary + '25',
  },
  heroBadgeText: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
  heroTitle: { fontSize: 32, fontWeight: '900', color: colors.text, textAlign: 'center', lineHeight: 38, letterSpacing: -0.5 },
  heroGradient: { color: colors.primaryLight },
  heroSub: { color: colors.textSecondary, fontSize: 14, textAlign: 'center', marginTop: 10, lineHeight: 20 },
  primaryBtn: {
    backgroundColor: colors.primary, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 8,
    marginTop: 24, ...shadows(colors).primary,
  },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: 36, marginTop: 28 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '900', color: colors.text },
  statLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  section: { paddingHorizontal: 24, paddingVertical: 24 },
  sectionTag: { fontSize: 10, fontWeight: '700', color: colors.primaryLight, letterSpacing: 2, marginBottom: 6 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 16, letterSpacing: -0.3 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryCard: {
    width: (width - 64) / 3, backgroundColor: colors.bgCard,
    borderRadius: 8, padding: 16, alignItems: 'center', borderWidth: 1,
  },
  categoryIconWrap: { width: 40, height: 40, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  categoryIcon: { fontSize: 16, fontWeight: '700' },
  categoryName: { fontSize: 12, fontWeight: '700' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actionCard: {
    backgroundColor: colors.bgCard, borderRadius: 8, padding: 20,
    alignItems: 'center', width: (width - 64) / 2, borderWidth: 1,
  },
  actionLabel: { fontSize: 13, fontWeight: '600', color: colors.text },
});

const shadows = (colors) => ({
  card: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 3 },
  primary: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
});
