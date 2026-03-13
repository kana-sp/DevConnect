import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import modules from 'modules'
import { FontGSansBold, FontGSansSemiBold } from '@customs/customFont'
import CheckBox from '@react-native-community/checkbox';
import _styles from '@styles';

type Props = {}

const TravelDetails = (props: Props) => {
  const [activeTab, setActiveTab] = useState<'FLIGHTS' | 'LAND'>('FLIGHTS');

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.checkBox}>
            <CheckBox
              disabled={false}
              boxType='circle'
              animationDuration={0}
              onFillColor={modules.LINK}
              onCheckColor={modules.WHITE}
              value={activeTab === 'FLIGHTS'}
              onValueChange={() => setActiveTab('FLIGHTS')}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>Flights</Text>
          </View>
          <View style={styles.option}>
            <View style={styles.checkBox}>
              <CheckBox
                disabled={false}
                boxType='circle'
                animationDuration={0}
                onFillColor={modules.LINK}
                onCheckColor={modules.WHITE}
                value={activeTab === 'LAND'}
                onValueChange={() => setActiveTab('LAND')}
              />
            </View>
            <View>
              <Text style={styles.subtitle}>On Land</Text>
            </View>
          </View>
        </View>
        <View style={styles.travelCard}>
          <View style={[_styles.rows, { gap: modules.BODY_HORIZONTAL_12 }]}>
            <Text style={styles.travelInfoTitle}>Date of Arrival:</Text>
            <Text style={styles.travelInfoSubtitle}></Text>
          </View>
          <View style={[_styles.rows, { gap: modules.BODY_HORIZONTAL_12 }]}>
            <Text style={styles.travelInfoTitle}>Flight No.:</Text>
            <Text style={styles.travelInfoSubtitle}></Text>
          </View>
          <View style={[_styles.rows, { gap: modules.BODY_HORIZONTAL_12 }]}>
            <Text style={styles.travelInfoTitle}>Date of Departure:</Text>
            <Text style={styles.travelInfoSubtitle}></Text>
          </View>
          <View style={[_styles.rows, { gap: modules.BODY_HORIZONTAL_12 }]}>
            <Text style={styles.travelInfoTitle}>Flight No.:</Text>
            <Text style={styles.travelInfoSubtitle}></Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default TravelDetails

const styles = StyleSheet.create({
  container: {
  },
  title: {
    ...FontGSansBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.WHITE,
  },
  subtitle: {
    ...FontGSansBold,
    fontSize: modules.BODY_HORIZONTAL_12,
    color: modules.WHITE,
  },
  checkBox: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], // Increases size by 50%
  },
  option: {
    ..._styles.rows,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    gap: modules.BODY_HORIZONTAL_12
  },
  travelCard: {
    backgroundColor: 'rgba(26, 58, 92, 0.73)',
    borderRadius: modules.CARD_RADIUS,
    padding: modules.BODY_HORIZONTAL_12,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    marginTop: modules.BODY_HORIZONTAL_12,
    gap: modules.BODY_HORIZONTAL_12,
  },
  travelInfoTitle: {
    ...FontGSansBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.SUB_LABEL,
  },
  travelInfoSubtitle: {
    ...FontGSansSemiBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.WHITE
  },
})