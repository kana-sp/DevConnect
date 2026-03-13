import { FontGSansBold, HanumanBold } from '@customs/customFont';
import _styles from '@styles';
import modules, { IMAGES } from 'modules';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import PressableScale from './PressableScale';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  smallMeeting: any[]
}

export default function SmallMeeting({ smallMeeting }: Props) {
  return (
    <View style={styles.container}>

      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={['rgba(255,255,255,0.1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <Text style={styles.sectionTitle}>កាលវិភាគកម្មវិធី</Text>
      <View style={{ height: modules.BODY_HORIZONTAL / 2 }} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
        {
          smallMeeting?.map((i: any) => {
            return (
              <View style={styles.item} key={i?.key}>
                <PressableScale
                  key={i.key}
                  style={[styles.menu]}
                  onPress={() => { }}
                >
                  <View style={styles.menuButton}>
                    <View style={styles.iconContainer}>
                      <Image style={[styles.bgImg,]} source={{ uri: 'https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/b0/9f/1a/b09f1acd-e293-cb94-02b2-4b8b69eb0d61/1058038298.jpg/292x0w.webp' }} />
                      <MaskedView
                        style={StyleSheet.absoluteFill}
                        maskElement={
                          <LinearGradient
                            colors={['black', 'transparent', 'black',]} // Content is visible where it's black
                            locations={[1, 0.75, 1]} // Starts fading at 60% of the height
                            style={StyleSheet.absoluteFill}
                          />
                        }
                      >
                      </MaskedView>
                    </View>
                  </View>
                  <View style={styles.title}>
                    <Text style={[styles.menuLabel]}>{i.name || ''}</Text>
                  </View>
                </PressableScale>
              </View>
            )
          })}
      </ScrollView>
      <View style={{ height: modules.BODY_HORIZONTAL / 2 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    width: modules.BODY_HORIZONTAL,
  },
  menuLabel: {
    ...FontGSansBold,
    color: modules.WHITE,
    fontSize: modules.FONT_H4,
  },
  title: {
    width: '100%',
    position: 'absolute',
    bottom: modules.BODY_HORIZONTAL / 3,
    padding: modules.BODY_HORIZONTAL,
    textAlign: 'left',
  },
  bgImg: {
    width: '100%',
    height: '100%',
    borderRadius: modules.CARD_RADIUS
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    ..._styles.center,
  },
  menuButton: {
    width: '100%',
    height: '100%',
    borderRadius: modules.APPLE_CARD_RADIUS,
  },
  menu: {
    width: 155,
    aspectRatio: 1 / 1.3,
    ..._styles.newShadow,
  },
  container: {
    paddingVertical: modules.BODY_HORIZONTAL,
  },
  sectionTitle: {
    fontSize: 28,
    ...HanumanBold,
    color: modules.WHITE,
    paddingHorizontal: modules.BODY_HORIZONTAL,
    marginBottom: modules.BODY_HORIZONTAL,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: modules.BODY_HORIZONTAL,
  },
});