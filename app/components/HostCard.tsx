import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import type { Host } from 'types/host'

type Props = {
  item: Host
  index: number
}

export default function HostCard({ item }: Props) {
  const chairLabel = `${item.year} CHAIR · ${item.country ?? 'CAMBODIA'}`

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.75}>
      {/* Flag icon */}
      <View style={styles.flagBox}>
        <Text style={styles.flagEmoji}>{item.flagEmoji ?? '🇰🇭'}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.label}>{chairLabel}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>

      {/* Chevron */}
      <Ionicons name="chevron-forward" size={18} color="rgba(0,0,0,0.25)" style={styles.chevron} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 3,
  },
  flagBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#0d2d6b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  flagEmoji: {
    fontSize: 28,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0057D9',
    letterSpacing: 0.4,
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0d1a30',
    marginBottom: 3,
    letterSpacing: 0.1,
  },
  title: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 17,
  },
  chevron: {
    marginLeft: 8,
  },
})
