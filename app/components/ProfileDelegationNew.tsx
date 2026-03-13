import React, { } from 'react'
import { View, Text, StyleSheet, type ViewStyle, type StyleProp } from 'react-native'
import HostBannergradient from 'screens/Home/components/HostBannergradient'
import PressableScale from 'components/PressableScale'
import { FontGSansBold, SFProTextBold, SFProTextMedium } from '@customs/customFont'
import modules, { IMAGES } from 'modules'
import HostPhotoV2 from './HostPhotoV2'
import _styles from '@styles'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    item: any
    isSmall?: boolean
    style?: StyleProp<ViewStyle>

    onPress?: () => void
}

const ProfileDelegationNew = ({ item, onPress, isSmall, style }: Props) => {
    const { profile, name, title, position, profileBackground } = item || {}
    const full_name = [title, name].filter(Boolean).join('\n')
    return (
        <PressableScale
            onPress={onPress}
            disabled={!onPress}
            style={[styles.card, style]}
        >
            <View style={styles.content}>
                <HostPhotoV2
                    backgroundImage={typeof profileBackground?.fileUrl === 'string' ? { uri: profileBackground?.fileUrl } : IMAGES.AVATAR_ACCOUNT}
                    source={typeof profile?.fileUrl === 'string' ? { uri: profile?.fileUrl } : IMAGES.AVATAR_ACCOUNT}
                />

                <HostBannergradient
                    height={40}
                    // [0, 0.3, 0.6, 1]
                    //LinearGradient colors and locations props should be arrays of the same length Error Stack
                    locations={[0, 0.3, 0.6, 1, 1, 1]}
                    colors={[
                        'rgba(4, 23, 32, 0)',    // Start fully transparent
                        'rgba(4, 23, 32, 0.8)',  // Quick transition to semi-opaque
                        'rgba(4, 23, 32, 1)',    // Solid white for the text background
                        'rgba(4, 23, 32, 1)',    // Solid white for the text background
                        'rgba(4, 23, 32, 1)',    // Solid white for the text background
                        'rgba(4, 23, 32, 1)',    // Solid white for the text background
                    ]}
                />

                <View style={[styles.descriptionLayer, isSmall && styles.descriptionLayerSmall]}>
                    <View style={[styles.descriptionContainer, isSmall && styles.descriptionContainerSmall]}>
                        <Text style={[styles.nameKh, isSmall && styles.nameKhSmall]} numberOfLines={isSmall ? 2 : undefined}>
                            {full_name || ''}
                        </Text>
                        <View style={_styles.rows}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.titleKh, isSmall && styles.titleKhSmall]} numberOfLines={isSmall ? 1 : undefined}>
                                    {position || ''}
                                </Text>
                            </View>
                            {
                                onPress && (
                                    <View style={styles.iconPlayConatain}>
                                        <Ionicons name={'play'} size={16} color={modules.WHITE} />
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        </PressableScale>
    )
}

const styles = StyleSheet.create({
    iconPlayConatain: {
        backgroundColor: modules.BLUE,
        width: 30,
        aspectRatio: 1,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    card: {
        width: '100%',
        borderRadius: 22,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    content: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        aspectRatio: 1 / 1.1,
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
        color: modules.WHITE,
        // color: modules.TEXT,
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
        color: modules.WHITE,
        // color: modules.TEXT,
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

export default ProfileDelegationNew
