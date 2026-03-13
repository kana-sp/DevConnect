import React from 'react';
import { View, StyleSheet, LayoutChangeEvent, ScrollView, } from 'react-native';
import Animated, { useSharedValue, useAnimatedReaction, } from 'react-native-reanimated';
import { FontGSansBold, FontGSansSemiBold } from '@customs/customFont';
import modules from 'modules';
import ViewPressableScale from 'components/PressableScale';
import { Ionicons } from '@expo/vector-icons';
import GlobalSvgMEMO from 'components/GlobalSvg';
import Bubble, { TabLayout } from './Bubble';
import { runOnJS, runOnUI } from 'react-native-worklets';

interface Props {
  tabData: any[]
  selectedKey: any
  onSelectedTab: (tab: any) => void
}

const BubbleIconTabBar = React.memo(({ tabData, selectedKey, onSelectedTab }: Props) => {

  const scrollViewRef = React.useRef<ScrollView>(null)
  const tabLayouts = useSharedValue<TabLayout[]>([])
  const selectedTab = useSharedValue<TabLayout>(tabLayouts.value?.[0])

  function scrollToTab(tab: TabLayout) {
    if (scrollViewRef.current && tab && tab.x !== undefined) {
      scrollViewRef.current.scrollTo({
        x: Math.max(0, tab.x - 20),
        animated: true
      })
    }
  }

  const measureLayout = (e: LayoutChangeEvent, route: any) => {
    'worklet'

    const { x, y, width, height } = e.nativeEvent.layout
    if (route?.key === selectedKey)
      selectedTab.value = { init: true, key: route.key, x, y, width, height }

    if (!tabLayouts.value?.find(f => f?.key === route?.key)) {
      tabLayouts.modify((value) => {
        'worklet';

        value.push({ init: true, key: route.key, x, y, width, height });
        return value;
      });
    }
  }

  useAnimatedReaction(() => selectedKey, result => {
    if (result !== selectedTab.value?.key) {
      const tab = tabLayouts.value.find(f => f?.key === result)
      if (tab) {
        selectedTab.value = tab
        runOnJS(scrollToTab)(tab)
      } else {
        selectedTab.value = tabLayouts.value?.[0]
      }
    }
  }, [tabLayouts.value, selectedKey])

  function _onSelectedTab(route: any) {
    const foundTab = tabLayouts?.value?.find(f => f?.key === route?.key)
    if (!foundTab) return

    runOnUI(() => {
      'worklet'
      selectedTab.value = foundTab
    })()
    scrollToTab(foundTab)
    onSelectedTab(route)
  }

  return (
    <View style={styles.tabBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <Bubble color={'#FFFFFF'} selectedTab={selectedTab} />
        {tabData.map((route: any, index: any) => {
          return (
            <BubbleTab
              route={route}
              key={route?.key || index}
              selectedKey={selectedKey}
              measureLayout={measureLayout}
              onPress={() => _onSelectedTab(route)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
});

interface BubbleTabType {
  route: any
  selectedKey: string
  onPress: () => void
  measureLayout: (e: any, r: any) => void
}

const BubbleTab = React.memo(({ route, selectedKey, onPress, measureLayout }: BubbleTabType) => {
  const is_selected = route?.key === selectedKey
  return (
    <ViewPressableScale
      haptic
      activeScale={0.95}
      style={styles.tab}
      onPress={onPress}
      onLayout={(e) => measureLayout(e, route)}
    >
      {
        route?.hideIcon ? null :
          route?.svgXml ?
            <GlobalSvgMEMO xml={route?.svgXml} fill={is_selected ? modules.LINK : '#8896A6'} />
            :
            <Ionicons style={[styles.icon, is_selected && styles.iconActive]} name={route?.icon} />
      }
      <Animated.Text style={[styles.text, is_selected && styles.textActive]}>
        {route?.label || route?.text || route?.name || ''}
      </Animated.Text>
    </ViewPressableScale>
  )
})
export default BubbleIconTabBar;

const styles = StyleSheet.create({
  tabBar: {
    // backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(250, 249, 249, 0.12)', // Nearly invisible background
    borderRadius: modules.BODY_HORIZONTAL_24,
    marginBottom: modules.BODY_HORIZONTAL_12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 0.5, // Much thinner line
    borderColor: 'rgba(255, 255, 255, 0.63)', // Brighter, but thinner
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    minWidth: 72,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  text: {
    ...FontGSansSemiBold,
    color: modules.WHITE,
    fontSize: modules.BODY_HORIZONTAL_12,
  },
  textActive: {
    ...FontGSansBold,
    color: modules.LINK,
    fontSize: modules.BODY_HORIZONTAL_12 + 2,
  },
  icon: {
    color: '#8896A6',
    fontSize: 18,
  },
  iconActive: {
    color: modules.LINK,
  },
})
