import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import { useTheme } from '../services/ThemeContext';

const typeMeta = {
  health: { name: 'Salud', color: '#1e40af' },
  auto: { name: 'Auto', color: '#1e40af' },
  home: { name: 'Hogar', color: '#1e40af' },
  life: { name: 'Vida', color: '#1e40af' },
  travel: { name: 'Viajes', color: '#1e40af' },
  student: { name: 'Estudiante', color: '#0d9488' },
};

export default function PlansScreen({ route, navigation }) {
  const { colors } = useTheme();
  const initialType = route.params?.type || '';
  const [activeType, setActiveType] = useState(initialType);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getPlans(activeType || undefined)
      .then(data => setPlans(data.plans))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeType]);

  const s = makeStyles(colors);

  const renderPlan = (plan) => {
    const meta = typeMeta[plan.type] || { color: '#1e40af' };
    return (
      <View key={plan.id} style={[s.planCard, { borderColor: colors.border }]}>
        <View style={s.planTop}>
          <View style={[s.planIconWrap, { backgroundColor: meta.color + '15' }]}>
            <Text style={[s.planIconText, { color: meta.color }]}>{plan.name[0]}</Text>
          </View>
          <View style={s.planInfo}>
            <Text style={s.planName}>{plan.name}</Text>
            <Text style={[s.planType, { color: meta.color }]}>{meta.name}</Text>
          </View>
          {plan.popular ? (
            <View style={[s.popularBadge, { borderColor: colors.accent + '30' }]}>
              <Text style={s.popularText}>Popular</Text>
            </View>
          ) : null}
        </View>
        <Text style={s.planDesc}>{plan.description}</Text>
        <Text style={[s.planPrice, { color: colors.primary }]}>
          ${plan.price}<Text style={s.planPricePeriod}>/mes</Text>
        </Text>
        <View style={s.planBenefits}>
          {plan.benefits?.split(',').slice(0, 3).map((b, i) => (
            <Text key={i} style={s.benefitText}>{b.trim()}</Text>
          ))}
        </View>
        <TouchableOpacity
          style={[s.planBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Cotizar', { planType: plan.type })}
          activeOpacity={0.8}
        >
          <Text style={s.planBtnText}>Cotizar este plan</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Planes</Text>
        <Text style={s.headerSub}>Encuentra tu cobertura ideal</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterRow} contentContainerStyle={s.filterContent}>
        <TouchableOpacity
          style={[s.filterBtn, { borderColor: colors.border }, activeType === '' && s.filterActive]}
          onPress={() => setActiveType('')}
        >
          <Text style={[s.filterText, activeType === '' && s.filterTextActive]}>Todos</Text>
        </TouchableOpacity>
        {Object.entries(typeMeta).map(([key, meta]) => (
          <TouchableOpacity
            key={key}
            style={[s.filterBtn, { borderColor: colors.border }, activeType === key && { backgroundColor: meta.color }]}
            onPress={() => setActiveType(key)}
          >
            <Text style={[s.filterText, activeType === key && { color: '#fff' }]}>{meta.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 60 }} />
        ) : (
          plans.map(renderPlan)
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const makeStyles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: colors.text, letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  filterRow: { maxHeight: 40, marginBottom: 8 },
  filterContent: { paddingHorizontal: 24, gap: 6 },
  filterBtn: {
    paddingHorizontal: 18, paddingVertical: 8, borderRadius: 100,
    backgroundColor: colors.bgCard, borderWidth: 1,
  },
  filterActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  list: { paddingHorizontal: 24, paddingTop: 12 },
  planCard: {
    backgroundColor: colors.bgCard, borderRadius: 8, padding: 20, marginBottom: 14, borderWidth: 1,
  },
  planTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  planIconWrap: { width: 42, height: 42, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  planIconText: { fontSize: 16, fontWeight: '700' },
  planInfo: { flex: 1 },
  planName: { fontSize: 15, fontWeight: '700', color: colors.text },
  planType: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  popularBadge: {
    backgroundColor: colors.accent + '12', borderRadius: 100,
    paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1,
  },
  popularText: { color: colors.accent, fontSize: 10, fontWeight: '700' },
  planDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginBottom: 12 },
  planPrice: { fontSize: 24, fontWeight: '900', marginBottom: 14, letterSpacing: -0.3 },
  planPricePeriod: { fontSize: 13, fontWeight: '500', color: colors.textMuted },
  planBenefits: { marginBottom: 16 },
  benefitText: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  planBtn: { borderRadius: 6, padding: 12, alignItems: 'center' },
  planBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
