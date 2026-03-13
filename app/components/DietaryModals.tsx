import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import modules from 'modules'
import { HanumanBold, HanumanRegular } from '@customs/customFont'
import { SvgXml } from 'react-native-svg'
import svg from '../modules/svg/svg.dummy'

export type DietaryType = 'NONE' | 'VEGETARIAN' | 'HALAL' | 'OTHERS'

const DIETARY_OPTIONS: { key: DietaryType; label: string }[] = [
  { key: 'NONE', label: 'No Dietary Restrictions' },
  { key: 'VEGETARIAN', label: 'Vegetarian' },
  { key: 'HALAL', label: 'Halal' },
  { key: 'OTHERS', label: 'Others (please specify):' },
]

export interface DietaryModalRef {
  open: (currentValue?: string) => void
}

interface Props {
  onSelect: (value: string) => void
}

const DietaryModal = forwardRef<DietaryModalRef, Props>(({ onSelect }, ref) => {
  const [visible, setVisible] = useState(false)
  const [selectedKey, setSelectedKey] = useState<DietaryType | null>(null)
  const [otherText, setOtherText] = useState('')

  useImperativeHandle(ref, () => ({
    open: (currentValue) => {
      // Logic to pre-select if value exists
      const match = DIETARY_OPTIONS.find(o => o.label === currentValue)
      if (match) {
        setSelectedKey(match.key)
      } else if (currentValue) {
        setSelectedKey('OTHERS')
        setOtherText(currentValue)
      }
      setVisible(true)
    },
  }))

  const hideMenu = () => setVisible(false)

  const handleConfirm = () => {
    if (selectedKey === 'OTHERS') {
      onSelect(otherText || 'Other')
    } else {
      const option = DIETARY_OPTIONS.find(o => o.key === selectedKey)
      onSelect(option?.label || '')
    }
    hideMenu()
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={hideMenu}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={hideMenu}>
          <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Dietary Requirements</Text>
              <TouchableOpacity onPress={hideMenu} style={styles.closeButton}>
                <SvgXml xml={svg.X} width={22} height={22} />
              </TouchableOpacity>
            </View>

            <ScrollView bounces={false}>
              {DIETARY_OPTIONS.map((option) => {
                const isSelected = selectedKey === option.key
                return (
                  <View key={option.key}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => setSelectedKey(option.key)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.radioCircle, isSelected && styles.radioActive]}>
                        {isSelected && <View style={styles.radioInner} />}
                      </View>
                      <Text style={styles.menuLabel}>{option.label}</Text>
                    </TouchableOpacity>

                    {option.key === 'OTHERS' && isSelected && (
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your dietary needs..."
                        placeholderTextColor="#999"
                        value={otherText}
                        onChangeText={setOtherText}
                        autoFocus
                      />
                    )}
                  </View>
                )
              })}
            </ScrollView>

            <TouchableOpacity
              style={[styles.confirmBtn, !selectedKey && { opacity: 0.5 }]}
              onPress={handleConfirm}
              disabled={!selectedKey}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  )
})

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: modules.WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    ...HanumanBold,
    fontSize: 18,
    color: modules.TEXT,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 12,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: modules.LINK,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: modules.LINK,
  },
  menuLabel: {
    ...HanumanRegular,
    fontSize: 16,
    color: modules.TEXT,
    flex: 1,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    ...HanumanRegular,
    fontSize: 15,
    color: modules.TEXT,
    marginBottom: 15,
    marginLeft: 34,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  confirmBtn: {
    backgroundColor: modules.LINK,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmText: {
    ...HanumanBold,
    color: modules.WHITE,
    fontSize: 16,
  },
})

export default DietaryModal