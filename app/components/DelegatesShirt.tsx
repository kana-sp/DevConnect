import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeArea from './SafeArea'
import _styles from '@styles'
import modules, { IMAGES } from 'modules'
import { fontGSans, FontGSansBold, FontGSansSemiBold } from '@customs/customFont'
import GlobalSvgMEMO from './GlobalSvg'
import xmlSvgs from 'modules/svg/svg.dummy'
import { PressableScale } from './PressableScale/PressableScale.android'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {}

const DelegatesShirt = (props: Props) => {

  const navigation = useNavigation<any>()

  const SHIRT_MEASUREMENTS = [
    { label: '(a) Collar Size', value: '18', desc: 'Measure from one side to the other side of cuff base' },
    { label: '(b) Cuff Size', value: '18', desc: 'Measure from one side to the other side of cuff base' },
    { label: '(c) Sleeve Length', value: '18', desc: 'Measure from shirt shoulder seam to the end of the shirt cuff' },
    { label: '(d) Front Accross', value: '18', desc: 'Measure from one side seam to another side seam and bottom of shirt sleeve armpit' },
    { label: '(e) Across Chest', value: '18', desc: 'Measure from one side of the button hole to the other size under the armpit of shirt widest part' },
    { label: '(f) Stomach', value: '18', desc: 'Measure from the end of waistline from one side to the other side' },
    { label: '(g) Hip', value: '18', desc: 'Measure at the biggest part of your shirt' },
    { label: '(h) Shirt Length', value: '18', desc: 'Measure from the top to the bottom of shirt' },
    { label: '(i) Shoulder', value: '18', desc: 'Measure from one seam to other seam of the shoulder of your shirt' },
    { label: '(j) Back Across', value: '18', desc: 'Measure from one side seam to another side seam between the middle of vertical line connecting top and bottom of sleeve armpit' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        // Deep charcoal to a slightly lighter slate
        colors={['rgb(42, 42, 43)', 'rgba(72, 71, 72, 0.73)']}
        style={StyleSheet.absoluteFill}
        // Vertical gradient: starts at the top middle, ends at the bottom middle
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SafeArea edges={'safeTop'} />
        <View style={styles.header}>
          <PressableScale style={styles.headerIcon} onPress={navigation.goBack}>
            <GlobalSvgMEMO
              xml={xmlSvgs.X}
              fill={modules.TEXT}
              width={35}
              height={35}
              stroke={modules.TEXT}
              strokeWidth={0.5}
            />
          </PressableScale>
          <View style={[_styles.center, _styles.flx1, { paddingRight: 30 }]}>
            <Text style={[styles.title, { color: modules.WHITE }]}>DelegatesShirt</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.body}>
            <View style={_styles.center}>
              <Image style={styles.img} source={IMAGES.HODSHIRT} />
            </View>
            <View style={styles.card}>
              {SHIRT_MEASUREMENTS.map((item, index) => (
                <View key={index}>
                  {/* Top Row: Label and Value */}
                  <View style={[_styles.rows]}>
                    <Text style={styles.title}>{item.label}: </Text>
                    <Text style={styles.titleBold}>{item.value} </Text>
                    <Text style={styles.title}>cm</Text>
                  </View>

                  {/* Bottom Row: Description */}
                  <Text style={styles.subtitle}>
                    {item.desc}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={_styles.fake}></View>
        </ScrollView>
      </LinearGradient>
    </View >
  )
}

export default DelegatesShirt

const styles = StyleSheet.create({
  container: {
    backgroundColor: modules.FACEBOOK_BACKGROUND,
    flex: 1,
  },
  header: {
    // backgroundColor: 'rgba(72, 71, 72, 0.73)',
    padding: modules.BODY_HORIZONTAL / 1.5,
    ..._styles.rows,
  },
  headerIcon: {
    backgroundColor: modules.FB_BTN_BG,
    borderRadius: 100,
    padding: 5,
  },
  body: {
    marginTop: modules.BODY_HORIZONTAL_12,
    flex: 1,
    marginHorizontal: modules.BODY_HORIZONTAL_12
  },
  title: {
    ...FontGSansSemiBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.TEXT,
  },
  titleBold: {
    ...FontGSansBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.TEXT,
  },
  subtitle: {
    ...fontGSans,
    fontSize: modules.BODY_HORIZONTAL_12,
    color: modules.SUB_LABEL,
  },
  img: {
    height: 700,
    width: '85%',
    borderRadius: modules.CARD_RADIUS
  },
  card: {
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
    marginTop: modules.BODY_HORIZONTAL_12,
    padding: modules.BODY_HORIZONTAL_12,
    gap: modules.BODY_HORIZONTAL_12
  },
})