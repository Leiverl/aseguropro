import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { api } from '../services/api';

const { width } = Dimensions.get('window');

const typeMeta = {
  health: { name: 'Salud', icon: '🏥', color: '#ef4444' },
  auto: { name: 'Auto', icon: '🚗', color: '#3b82f6' },
  home: { name: 'Hogar', icon: '🏠', color: '#22c55e' },
  life: { name: 'Vida', icon: '👨‍👩‍👧‍👦', color: '#a855f7' },
  travel: { name: 'Viajes', icon: '✈️', color: '#f59e0b' },
  student: { name: 'Estudiante', icon: '🎓', color: '#06b6d4' },
};

export default function PlansScreen({ route, navigation }) {
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

  const renderPlan = (plan, index) => {
    const meta = typeMeta[plan.type] || { icon: '🛡️', color: '#6366f1' };
    return (
      <View key={plan.id} style={[styles.planCard, { borderColor: meta.color + '20' }]}>
        <View style={styles.planTop}>
          <View style={[styles.planIconWrap, { backgroundColor: meta.color + '15' }]}>
            <Text style={styles.planIcon}>{meta.icon}</Text>
          </View>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={[styles.planType, { color: meta.color }]}>{meta.name}</Text>
          </View>
          {plan.popular ? (
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>★ Popular</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.planDesc}>{plan.description}</Text>
        <Text style={[styles.planPrice, { color: meta.color }]}>
          ${plan.price}<Text style={styles.planPricePeriod}>/mes</Text>
        </Text>
        <View style={styles.planBenefits}>
          {plan.benefits?.split(',').slice(0, 3).map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Text style={styles.benefitDot}>→</Text>
              <Text style={styles.benefitText}>{b.trim()}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.planBtn, { backgroundColor: meta.color }]}
          onPress={() => navigation.navigate('Cotizar', { planType: plan.type })}
          activeOpacity={0.8}
        >
          <Text style={styles.planBtnText}>Cotizar este plan</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Planes</Text>
        <Text style={styles.headerSub}>Encuentra tu cobertura ideal</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
        <TouchableOpacity
          style={[styles.filterBtn, activeType === '' && styles.filterActive]}
          onPress={() => setActiveType('')}
        >
          <Text style={[styles.filterText, activeType === '' && styles.filterTextActive]}>Todos</Text>
        </TouchableOpacity>
        {Object.entries(typeMeta).map(([key, meta]) => (
          <TouchableOpacity
            key={key}
            style={[styles.filterBtn, activeType === key && { backgroundColor: meta.color }]}
            onPress={() => setActiveType(key)}
          >
            <Text style={[styles.filterText, activeType === key && { color: '#fff' }]}>
              {meta.icon} {meta.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#6366f1" style={{ marginTop: 60 }} />
        ) : (
          plans.map((plan, i) => renderPlan(plan, i))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050510' },
  header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 },
  headerTitle: { fontSize: 32, fontWeight: '900', color: '#f1f5f9', letterSpacing: -0.5 },
  headerSub: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  filterRow: { maxHeight: 44, marginBottom: 8 },
  filterContent: { paddingHorizontal: 24, gap: 8 },
  filterBtn: {
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100,
    backgroundColor: 'rgba(15, 15, 30, 0.85)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  filterActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  filterText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  list: { paddingHorizontal: 24, paddingTop: 12 },
  planCard: {
    backgroundColor: 'rgba(15, 15, 30, 0.85)', borderRadius: 20, padding: 24, marginBottom: 16,
    borderWidth: 1,
  },
  planTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  planIconWrap: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  planIcon: { fontSize: 22 },
  planInfo: { flex: 1 },
  planName: { fontSize: 17, fontWeight: '700', color: '#f1f5f9' },
  planType: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  popularBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)', borderRadius: 100,
    paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  popularText: { color: '#f59e0b', fontSize: 11, fontWeight: '700' },
  planDesc: { fontSize: 13, color: '#94a3b8', lineHeight: 20, marginBottom: 14 },
  planPrice: { fontSize: 28, fontWeight: '900', marginBottom: 16, letterSpacing: -0.5 },
  planPricePeriod: { fontSize: 14, fontWeight: '500', color: '#64748b' },
  planBenefits: { marginBottom: 20 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  benefitDot: { color: '#818cf8', fontSize: 14, marginRight: 8, fontWeight: '700' },
  benefitText: { fontSize: 13, color: '#94a3b8' },
  planBtn: { borderRadius: 12, padding: 14, alignItems: 'center' },
  planBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
