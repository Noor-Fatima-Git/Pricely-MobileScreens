import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

type Result = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  bestPrice?: boolean;
  outOfStock?: boolean;
  inStock?: boolean;
  store?: { name: string; letter: string; gradient: [string, string] };
  icon: keyof typeof Ionicons.glyphMap;
};

const FILTERS = ['Sort: Price ↑', 'In stock', 'Daraz', 'Mega.pk'];

const RESULTS: Result[] = [
  {
    id: '1',
    title: 'Redmi Note 13 8GB/256GB',
    subtitle: 'Matched across 4 stores',
    price: 'Rs 54,999',
    bestPrice: true,
    inStock: true,
    store: { name: 'Telemart', letter: 'T', gradient: ['#2BB88A', '#0F7B57'] },
    icon: 'phone-portrait-outline',
  },
  {
    id: '2',
    title: 'Anker PowerCore 20000mAh',
    subtitle: 'Matched across 3 stores',
    price: 'Rs 8,450',
    inStock: true,
    store: { name: 'Daraz', letter: 'D', gradient: ['#D25089', '#95264F'] },
    icon: 'lock-closed-outline',
  },
  {
    id: '3',
    title: 'Nike Air Zoom Pegasus 40',
    subtitle: 'Out of stock everywhere',
    price: 'Rs 21,900',
    outOfStock: true,
    icon: 'bookmark-outline',
  },
  {
    id: '4',
    title: 'Philips Air Fryer HD9200 5L',
    subtitle: 'Matched across 4 stores',
    price: 'Rs 16,250',
    inStock: true,
    store: { name: 'Mega.pk', letter: 'M', gradient: ['#4A8FD6', '#245789'] },
    icon: 'camera-outline',
  },
];

export default function SearchResultsScreen() {
  const [activeFilter, setActiveFilter] = useState('Sort: Price ↑');

  const renderItem = ({ item }: { item: Result }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={item.icon} size={26} color="#1F5D4C" />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={[
            styles.subtitle,
            item.outOfStock && styles.outOfStockText,
          ]}
        >
          {item.subtitle}
        </Text>

        {item.bestPrice && (
          <LinearGradient
            colors={['#F7CC5C', '#E0972E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bestPriceBadge}
          >
            <Text style={styles.bestPriceText}>Best price</Text>
          </LinearGradient>
        )}

        <View style={styles.bottomRow}>
          {item.store ? (
            <View style={styles.storeRow}>
              <LinearGradient
                colors={item.store.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.storeBadge}
              >
                <Text style={styles.storeBadgeText}>{item.store.letter}</Text>
              </LinearGradient>
              <Text style={styles.storeName}>{item.store.name}</Text>
            </View>
          ) : (
            <View />
          )}

          <View style={styles.priceStockCol}>
            <Text
              style={[
                styles.price,
                item.outOfStock && styles.strikethroughPrice,
              ]}
            >
              {item.price}
            </Text>
            {item.inStock && <Text style={styles.inStockText}>In stock</Text>}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="#3E4C9E" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Ionicons name="ellipse-outline" size={16} color="#9AA0A6" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            defaultValue="redmi note 13"
            placeholderTextColor="#9AA0A6"
          />
        </View>
      </View>

      <Text style={styles.matchesText}>14 matches · deduped from 31 listings</Text>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;

          if (isActive) {
            return (
              <TouchableOpacity key={filter} onPress={() => setActiveFilter(filter)}>
                <LinearGradient
                  colors={['#1FAE7E', '#0B6B49']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.chip, { borderWidth: 0 }]}
                >
                  <Text style={styles.chipTextActive}>{filter}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={filter}
              style={styles.chip}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={styles.chipText}>{filter}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Results list */}
      <FlatList
        data={RESULTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5F1' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E4E7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 46,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#3C3C3C',
  },
  matchesText: {
    color: '#8A8F98',
    fontSize: 13,
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  filterRow: {
    flexGrow: 0,
    marginBottom: 12,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#D8DBD6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  chipText: {
    color: '#3C3C3C',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#E4EDE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#1C1C1C' },
  subtitle: { fontSize: 13, color: '#9AA0A6', marginTop: 2 },
  outOfStockText: { color: '#D9822B' },
  bestPriceBadge: {
    backgroundColor: '#F0B429',
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 8,
  },
  bestPriceText: { fontSize: 12, fontWeight: '700', color: '#5A3B0A' },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  storeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  storeBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  storeName: { fontSize: 13, color: '#3C3C3C', fontWeight: '500' },
  priceStockCol: { alignItems: 'flex-end' },
  price: { fontSize: 18, fontWeight: '700', color: '#1C1C1C' },
  strikethroughPrice: {
    textDecorationLine: 'line-through',
    color: '#B0B4B8',
    fontWeight: '600',
  },
  inStockText: { fontSize: 13, color: '#3E63C9', marginTop: 2 },
});