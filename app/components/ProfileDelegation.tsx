import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, type LayoutChangeEvent, type ViewStyle, type StyleProp } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import KbachPattern from 'screens/Home/components/Kbachpattern'
import HostBannergradient from 'screens/Home/components/HostBannergradient'
import BlobBackground from 'screens/Home/components/BlobBackground'
import HostPhoto from 'screens/Home/components/Hostphoto'
import PressableScale from 'components/PressableScale'
import { FontGSansBold, SFProTextBold, SFProTextMedium } from '@customs/customFont'
import modules from 'modules'

type Props = {
    item: any
    onPress?: () => void
    isSmall?: boolean
    style?: StyleProp<ViewStyle>
}

const ProfileDelegation = ({ item, onPress, isSmall, style }: Props) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    const onLayout = useCallback((e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout
        setDimensions({ width, height })
    }, [])

    return (
        <PressableScale
            onPress={onPress}
            style={[styles.card, style]}
        >
            <View style={styles.content} onLayout={onLayout}>
                <MaskedView
                    style={StyleSheet.absoluteFillObject}
                    maskElement={
                        <LinearGradient
                            colors={['white', 'white', 'transparent']}
                            locations={[0, 0.40, 0.72]}
                            style={{ flex: 1 }}
                        />
                    }
                >
                    <KbachPattern
                        width={dimensions.width}
                        height={dimensions.height}
                        color="#B8CCE4"
                        opacity={0.65}
                        tileSize={isSmall ? 28 : 48}
                    />
                </MaskedView>

                <BlobBackground isSmall={isSmall} seed={item.full_name} />

                <HostPhoto source={typeof item?.photo?.downloadUrl === 'string' ? { uri: item.photo.downloadUrl } : item?.photo?.downloadUrl} />

                <HostBannergradient height={isSmall ? 45 : 35} />

                <View style={[styles.descriptionLayer, isSmall && styles.descriptionLayerSmall]}>
                    <View style={[
                        styles.descriptionContainer,
                        isSmall && styles.descriptionContainerSmall,
                    ]}>
                        <Text
                            style={[styles.nameKh, isSmall && styles.nameKhSmall]}
                            numberOfLines={isSmall ? 2 : undefined}
                        >
                            {item.full_name || ''}
                        </Text>
                        <Text
                            style={[styles.titleKh, isSmall && styles.titleKhSmall]}
                            numberOfLines={isSmall ? 1 : undefined}
                        >
                            {item?.form_type?.text || ''}
                        </Text>
                    </View>
                </View>
            </View>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 22,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 6,
    },
    content: {
        position: 'relative',
        overflow: 'hidden',
    },
    descriptionLayer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        paddingBottom: 28,
    },
    descriptionLayerSmall: {
        paddingBottom: 0,
    },
    descriptionContainer: {
        paddingHorizontal: modules.BODY_HORIZONTAL_24 - 4,
        alignItems: 'flex-start',
    },
    descriptionContainerSmall: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    nameKh: {
        ...FontGSansBold,
        fontSize: 24,
        color: modules.TEXT,
        lineHeight: 32,
        marginBottom: 4,
    },
    nameKhSmall: {
        fontSize: 11,
        lineHeight: 15,
        marginBottom: 1,
    },
    titleKh: {
        ...SFProTextBold,
        fontSize: modules.FONT_H5,
        color: modules.TEXT,
        lineHeight: 24,
        opacity: 0.85,
    },
    titleKhSmall: {
        ...SFProTextMedium,
        fontSize: 11,
        lineHeight: 14,
        opacity: 0.55,
    },
})

export default ProfileDelegation
