import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import SafeArea from './SafeArea'
import modules, { IMAGES } from 'modules'
import _styles from '@styles'
import { fontGSans, FontGSansBold, FontGSansSemiBold } from '@customs/customFont'
import { DELEGATES, HEADDELEGATES } from 'dummy/audiences'
import GlobalSvgMEMO from './GlobalSvg'
import xmlSvgs from 'modules/svg/svg.dummy'
import { PressableScale } from './PressableScale/PressableScale.android'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import BackgroundAnimated from './BackgroundAnimated'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { MEETINGLISTS } from 'dummy/meetingLists'
import TravelDetails from './TravelDetails'
import { DietaryModalRef } from './DietaryModals'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {}

const DelagatesInfo = (props: Props) => {
  const scrollY = useSharedValue(0);
  const dietaryRef = useRef<DietaryModalRef>(null)
  const [dietaryValue, setDietaryValue] = useState('')


  const navigation = useNavigation<any>()
  return (
    <View style={styles.container}>
      <BackgroundAnimated blurRadius={99} image={IMAGES.COLOR} scrollYValue={scrollY} />
      <SafeArea edges={'safeTop'} style={{
        backgroundColor: 'rgb(42, 42, 43)'
      }} />
      <ScrollView>
        {
          Object.values(HEADDELEGATES)?.map(i => {
            return (
              <View key={i?.key} style={styles.header}>
                <PressableScale style={[styles.icon, _styles.center]} onPress={navigation.goBack}>
                  <GlobalSvgMEMO
                    xml={xmlSvgs.X}
                    fill={modules.TEXT}
                    width={15}
                    height={15}
                    stroke={modules.TEXT}
                    strokeWidth={0.75}
                  />
                </PressableScale>
              </View>
            )
          }
          )
        }
        {
          Object.values(HEADDELEGATES)?.map(i => {
            return (
              <View key={i?.key} style={styles.photoCard}>
                <LinearGradient
                  // Deep charcoal to a slightly lighter slate
                  colors={['rgb(42, 42, 43)', 'rgba(72, 71, 72, 0.73)']}
                  style={StyleSheet.absoluteFill}
                  // Vertical gradient: starts at the top middle, ends at the bottom middle
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                />
                <Image style={styles.photoCardImg} source={i.Photo} />
                <Text style={[styles.title]}>{i.Role}</Text>
                <Text style={[styles.title]}>Kingdom of Cambodia</Text>
              </View>
            )
          }
          )
        }
        {
          Object.values(HEADDELEGATES)?.map(i => {
            return (
              <View key={i?.key} style={styles.infoCard}>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Name:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Name}</Text>
                </View>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Gender:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Gender}</Text>
                </View>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Title:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Title}</Text>
                </View>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Department:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Department}</Text>
                </View>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Nationality:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Nationality}</Text>
                </View>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Phone:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Phone}</Text>
                </View>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Email:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Email}</Text>
                </View>
                <View style={_styles.rows}>
                  <Text style={styles.infoTitle}>Role:  </Text>
                  <Text style={styles.infoSubtitle}>{i.Role}</Text>
                </View>
              </View>
            )
          }
          )
        }
        {
          Object.values(HEADDELEGATES)?.map(i => {
            return (
              <View key={i.key} style={{ marginTop: modules.BODY_HORIZONTAL_12 }}>
                <Text style={[styles.title, { padding: modules.BODY_HORIZONTAL_12 / 2 }]}>Passport Detail</Text>
                <View style={styles.infoCard}>
                  <View style={_styles.rows}>
                    <Text style={styles.infoTitle}>Passport No:  </Text>
                    <Text style={styles.infoSubtitle}>{i.PASSPORT_NUMBER}</Text>
                  </View>
                  <View style={_styles.rows}>
                    <Text style={styles.infoTitle}>Passport Expiry Date:  </Text>
                    <Text style={styles.infoSubtitle}>{i.PASSPORT_DOE}</Text>
                  </View>
                </View>
                <View style={{ marginTop: modules.BODY_HORIZONTAL_12 }}>
                  <Text style={[styles.title, { padding: modules.BODY_HORIZONTAL_12 }]}>Passport Photo</Text>
                </View>
                <View style={_styles.center}>
                  <Text style={styles.title}>Attach Scanned Copy of Passport</Text>
                  <Text style={[styles.infoSubtitle, { color: modules.SUB_LABEL }]}>{"Note: The attached copy passport\nmust include photo page"}</Text>
                  <PressableScale style={[styles.infoCard, _styles.center, _styles.rows, { height: 150, aspectRatio: 2 / 1 }]}>
                    <GlobalSvgMEMO
                      xml={xmlSvgs.PHOTO}
                      fill={modules.WHITE}
                      width={20}
                      height={20}
                      stroke={modules.WHITE}
                      strokeWidth={0.5}
                    />
                    <Text style={styles.title}>Passport Photo</Text>
                    {/* <Image resizeMode='cover' style={{ height: 150, width: 300, borderRadius: modules.CARD_RADIUS }} source={i.PASSPORT_PICTURE} /> */}
                  </PressableScale>
                </View>
              </View>

            )
          })
        }

        <View style={{ marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12 * 2, }}>
          <Text style={styles.title}>Meeting To Be Attended</Text>
        </View>
        <View style={[styles.infoCard]}>
          {
            Object.values(MEETINGLISTS)?.map((i, index) => {
              const isLastItem = index == MEETINGLISTS.length - 1;
              return (
                <View key={i.key} style={{ borderBottomColor: modules.SUB_LABEL, borderBottomWidth: isLastItem ? 0 : 0.5, marginHorizontal: modules.BODY_HORIZONTAL_24 }}>
                  <View style={[_styles.flx1, !isLastItem && { borderBottomWidth: 0 }, { paddingBottom: isLastItem ? modules.BODY_HORIZONTAL_12 / 2 : modules.BODY_HORIZONTAL_12, }]}>
                    <Text style={[styles.title,]}>{i.name}</Text>
                  </View>
                  {/* <View style={[styles.checkBox]}>
                    <CheckBox
                      disabled={false}
                      boxType='circle'
                      animationDuration={0}
                      onFillColor={modules.LINK}
                      onCheckColor={modules.WHITE}
                      value={false}
                    />
                  </View> */}
                </View>

              )
            })
          }
        </View>
        <View style={{ marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12 * 3 }}>
          <Text style={styles.title}>Bilateral Meeting Reservation Form</Text>
        </View>
        <View style={styles.infoCard}>
          <View style={_styles.rows}>
            <Text style={styles.infoTitle}>Day/Date: </Text>
            <Text style={styles.title}></Text>
          </View>
          <View style={_styles.rows}>
            <Text style={styles.infoTitle}>Time: </Text>
            <Text style={styles.title}></Text>
          </View>
          <View style={_styles.rows}>
            <Text style={styles.infoTitle}>Country: </Text>
            <Text style={styles.title}></Text>
          </View>
        </View>
        <View style={{ marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12 * 3 }}>
          <Text style={styles.title}>Travel Details</Text>
        </View>
        <TravelDetails />
        <View style={[styles.infoCard, _styles.rows, { marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12, gap: 5 }]}
        // onPress={() => dietaryRef.current?.open(dietaryValue)}
        >
          <Text style={[styles.infoTitle]}>Dietary Restrictions</Text>
          <Text style={[styles.infoSubtitle]}>{dietaryValue || 'Select Dietary Requirements'}</Text>
        </View>
        {/* <DietaryModal ref={dietaryRef} onSelect={(val) => setDietaryValue(val)} /> */}
        <View style={[styles.infoCard, _styles.rows, { marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12, gap: 5 }]}>
          <Text style={[styles.infoTitle]}>Other Activities:</Text>
          <Text style={[styles.infoSubtitle]}>Temple Visit</Text>
        </View>
        <View style={{ marginHorizontal: modules.BODY_HORIZONTAL_12 }}>
        </View>
        <PressableScale style={[_styles.rows, { marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12 * 3, gap: 5 }]}>
          <Text style={[styles.title]}>Accommodation</Text>
        </PressableScale>
        <View style={[styles.infoCard, _styles.rows, { marginHorizontal: modules.BODY_HORIZONTAL_12, gap: modules.BODY_HORIZONTAL_12 }]}>
          <Text style={[styles.infoTitle]}>Hotel:</Text>
          <Text style={styles.title}>Sokha Hotel</Text>
        </View>
        <View style={[{ flexDirection: 'row', marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12, gap: modules.BODY_HORIZONTAL_12 }]}>
          <Text style={[styles.title, { ...fontGSans }]}>Note* :</Text>
          <Text style={[styles.title, { ...fontGSans }]}>{"The hotel room will be organised\nby the host country"}</Text>
        </View>
        <View style={styles.infoCard}>
          <View style={[_styles.rows, { gap: modules.BODY_HORIZONTAL_12 }]}>
            <Text style={styles.infoTitle}>Check-in Date:</Text>
            <Text style={styles.title}></Text>
          </View>
          <View style={[_styles.rows, { gap: modules.BODY_HORIZONTAL_12 }]}>
            <Text style={styles.infoTitle}>Check-out Date:</Text>
            <Text style={styles.title}></Text>
          </View>
          <View style={[_styles.rows, { gap: modules.BODY_HORIZONTAL_12 }]}>
            <Text style={[styles.title, { ...fontGSans }]}>Note* :</Text>
            <Text style={[styles.title, { ...fontGSans }]}></Text>
          </View>
        </View>
        <View style={[{ marginHorizontal: modules.BODY_HORIZONTAL_12, marginTop: modules.BODY_HORIZONTAL_12 * 3, gap: 5 }]}>
          <Text style={[styles.title]}>Sovenir Shirt Measurements (For HODS)</Text>
          <PressableScale style={_styles.rows} onPress={() => navigation.navigate('DELAGATESHIRTS')}>
            <Text style={[styles.infoTitle, { textDecorationLine: 'underline' }]}>Press here for measurements details</Text>
            <GlobalSvgMEMO
              xml={xmlSvgs.CHEV_FOR}
              fill={modules.SUB_LABEL}
              width={15}
              height={15}
            />
          </PressableScale>
        </View>
        <View style={_styles.fake}></View>
      </ScrollView>
    </View >
  )
}

export default DelagatesInfo

const styles = StyleSheet.create({
  container: {
    backgroundColor: modules.FACEBOOK_BACKGROUND,
    flex: 1,
  },
  header: {
    // backgroundColor: modules.GLASS,
    backgroundColor: 'rgb(42, 42, 43)',
    ..._styles.rows,
    padding: modules.BODY_HORIZONTAL_12,
  },
  icon: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 100,
    padding: modules.BODY_HORIZONTAL_12 - 4,
  },
  title: {
    ...FontGSansBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.WHITE,
  },
  photoCard: {
    backgroundColor: modules.GLASS,
    // borderRadius: modules.CARD_RADIUS,
    ..._styles.center,
    // marginTop: modules.BODY_HORIZONTAL_12,
    gap: modules.BODY_HORIZONTAL_12,
    padding: modules.BODY_HORIZONTAL_12,
  },
  photoCardImg: {
    height: 150,
    aspectRatio: 1 / 1.1,
    borderRadius: 100,
  },
  infoCard: {
    backgroundColor: 'rgba(26, 58, 92, 0.73)',
    borderRadius: modules.CARD_RADIUS,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    padding: modules.BODY_HORIZONTAL_12,
    marginTop: modules.BODY_HORIZONTAL_12,
    gap: modules.BODY_HORIZONTAL_12 * 2,
  },
  infoTitle: {
    ...FontGSansBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.SUB_LABEL,
  },
  infoSubtitle: {
    ...FontGSansSemiBold,
    fontSize: modules.BODY_HORIZONTAL,
    color: modules.WHITE
  },
  checkBox: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], // Increases size by 50%
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  shirtCard: {},
  shirtImage: {
    height: 100,
    width: 350,
    borderRadius: modules.CARD_RADIUS
  },
})