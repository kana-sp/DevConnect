import { fontGSans, FontGSansBold } from '@customs/customFont';
import _styles from '@styles';
import modules from 'modules';
import React, { useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, ViewStyle, TextStyle, TouchableOpacity, } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation, SharedValue, scrollTo, useAnimatedRef, } from 'react-native-reanimated';
import SlideModal, { SlideModalRef } from './SlideModal';
import { useGlobal } from 'hooks/global.hooks';
import { runOnJS } from 'react-native-worklets';

// ─── Fixed dimensions ─────────────────────────────────────────────────────────
const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS; // 220

// ─── Types ────────────────────────────────────────────────────────────────────
export type WheelPickerModalRef = {
    open: (params: {
        data?: any[],
        title?: string,
        onSelected?: (date: Date) => void
    }) => void
    close: () => void
}

interface WheelPickerProps {
    data?: any[];
    selectedIndex?: number;
    containerStyle?: ViewStyle;
    itemTextStyle?: TextStyle;
    onSelect?: (item: any, index: number) => void;
}

interface MultiColumnPickerColumn {
    data: any[];
    selectedIndex?: number;
    onSelect?: (item: any, index: number) => void;
    /** flex ratio between columns, defaults to 1 */
    flex?: number;
}

interface MultiColumnWheelPickerProps {
    columns: MultiColumnPickerColumn[];
    containerStyle?: ViewStyle;
}

// ─── Single item row ──────────────────────────────────────────────────────────

const WheelPickerRow = React.memo(({ item, index, scrollY, }: { item: any; index: number; scrollY: SharedValue<number>; }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 2) * ITEM_HEIGHT,
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
            (index + 2) * ITEM_HEIGHT,
        ];

        const opacity = interpolate(
            scrollY.value,
            inputRange,
            [0.18, 0.45, 1, 0.45, 0.18],
            Extrapolation.CLAMP
        );

        const scale = interpolate(
            scrollY.value,
            inputRange,
            [0.72, 0.86, 1, 0.86, 0.72],
            Extrapolation.CLAMP
        );

        const rotateXDeg = interpolate(
            scrollY.value,
            inputRange,
            [-38, -20, 0, 20, 38],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [
                { perspective: 900 },
                { rotateX: `${rotateXDeg}deg` },
                { scale },
            ],
        };
    });

    return (
        <Animated.View style={[styles.item, animatedStyle]}>
            <Text style={styles.itemText} numberOfLines={1}>
                {item?.text || item?.name_en}
            </Text>
        </Animated.View>
    );
});

// ─── WheelPicker ──────────────────────────────────────────────────────────────

export const WheelPickerModal = forwardRef((props: WheelPickerProps, forwardedRef) => {
    const { data, selectedIndex = 0, } = props || {};
    const { responsive_list_styles } = useGlobal();
    const [params, setParams] = React.useState<any>(null);

    const modalRef = React.useRef<SlideModalRef | null>(null);
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const selected_data = React.useRef((params?.data || data)?.[selectedIndex]);
    const scrollY = useSharedValue(selectedIndex * ITEM_HEIGHT);
    const paddingVertical = ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2);

    const isMomentumScrolling = React.useRef(false);
    const dataRef = React.useRef(params?.data || data || []);


    useEffect(() => { dataRef.current = (params?.data || data || []); }, [params?.data, data]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            animatedRef.current?.scrollTo({
                y: selectedIndex * ITEM_HEIGHT,
                animated: false,
            });
        }, 50);
        return () => clearTimeout(timeout);
    }, []);

    // Keep shared value in sync for animations
    const handleScroll = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            scrollY.value = e.nativeEvent.contentOffset.y;
        },
        [scrollY]
    );

    // Single place where onSelect is resolved and fired
    const fireSelect = useCallback((offsetY: number) => {
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const clamped = Math.max(0, Math.min(index, dataRef.current?.length - 1));
        selected_data.current = dataRef.current[clamped];
    }, []);

    // Returns the snapped Y offset so callers can pass it straight to fireSelect
    const snapToNearest = useCallback(
        (offsetY: number, animated: boolean): number => {
            const index = Math.round(offsetY / ITEM_HEIGHT);
            const clamped = Math.max(0, Math.min(index, dataRef.current.length - 1));
            scrollTo(animatedRef, 0, clamped * ITEM_HEIGHT, animated);
            return clamped * ITEM_HEIGHT;
        },
        [animatedRef]
    );

    const handleScrollBeginDrag = useCallback(() => {
        isMomentumScrolling.current = false;
    }, []);

    const handleScrollEndDrag = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const snappedY = snapToNearest(e.nativeEvent.contentOffset.y, true);
            // If momentum kicks in within 80ms, MomentumScrollEnd owns the callback.
            // Otherwise (slow drag / last item / no velocity) we fire here.
            setTimeout(() => {
                if (!isMomentumScrolling.current) {
                    fireSelect(snappedY);
                }
            }, 80);
        },
        [snapToNearest, fireSelect]
    );

    const handleMomentumScrollBegin = useCallback(() => {
        isMomentumScrolling.current = true;
    }, []);

    const handleMomentumScrollEnd = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            isMomentumScrolling.current = false;
            const snappedY = snapToNearest(e.nativeEvent.contentOffset.y, false);
            fireSelect(snappedY);
        },
        [snapToNearest, fireSelect]
    );

    const _onSelected = (date: any) => {
        params?.onSelected && params.onSelected(date)
        modalRef.current?.close()
    }

    useImperativeHandle(forwardedRef, () => {
        return {
            open: (params: any) => {
                'worklet'
                modalRef.current?.open();
                runOnJS(setParams)(params);
            },
            close: () => {
                'worklet'
                modalRef.current?.close();
                runOnJS(setParams)(null);
            },
        };
    });

    return (
        <SlideModal
            ref={modalRef}
            style={styles.modal}
            onBackdropPress={() => null}
            containerStyle={[styles.containModal, responsive_list_styles]}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => modalRef?.current?.close()}>
                    <Text style={styles.headerText}>{'Cancel'}</Text>
                </TouchableOpacity>
                <View style={[_styles.flx1, _styles.center]}>
                    <Text style={styles.title}>{params?.title || ''}</Text>
                </View>
                <TouchableOpacity onPress={() => _onSelected(selected_data.current)}>
                    <Text style={[styles.headerText, { color: modules.LINK }]}>{'Confirm'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <View style={styles.container}>
                    {/* Top fade */}
                    <View style={[styles.fade, styles.fadeTop]} pointerEvents="none" />

                    {/* Selection band */}
                    <View style={styles.selectionBand} pointerEvents="none" />

                    {/* Bottom fade */}
                    <View style={[styles.fade, styles.fadeBottom]} pointerEvents="none" />

                    <Animated.ScrollView
                        ref={animatedRef}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        scrollEventThrottle={16}
                        onScroll={handleScroll}
                        onScrollBeginDrag={handleScrollBeginDrag}
                        onScrollEndDrag={handleScrollEndDrag}
                        onMomentumScrollBegin={handleMomentumScrollBegin}
                        onMomentumScrollEnd={handleMomentumScrollEnd}
                        contentContainerStyle={{ paddingVertical }}
                        bounces={false}
                    >
                        {(params?.data || data || []).map((item: any, index: number) => (
                            <WheelPickerRow
                                key={`${item.value}-${index}`}
                                item={item}
                                index={index}
                                scrollY={scrollY}
                            />
                        ))}
                    </Animated.ScrollView>
                </View>
            </View>
        </SlideModal>
    );
});

// ─── MultiColumnWheelPicker ───────────────────────────────────────────────────

export const MultiColumnWheelPicker: React.FC<MultiColumnWheelPickerProps> = ({
    columns,
    containerStyle,
}) => {
    return (
        <View style={[styles.multiContainer, containerStyle]}>
            <View style={styles.multiSelectionBand} pointerEvents="none" />

            {columns.map((col, colIndex) => (
                <View key={colIndex} style={[styles.columnWrapper, { flex: col.flex ?? 1 }]}>
                    <WheelPickerModal
                        data={col.data}
                        selectedIndex={col.selectedIndex ?? 0}
                        onSelect={col.onSelect}
                        containerStyle={styles.columnInner}
                    />
                </View>
            ))}
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    containModal: {
        margin: 0,
        padding: 0,
        justifyContent: 'flex-end',
    },
    modal: {
        height: 300,
        overflow: 'hidden',
        borderTopLeftRadius: modules.CARD_RADIUS,
        borderTopRightRadius: modules.CARD_RADIUS,
        backgroundColor: modules.BACKGROUND_PRIMARY,
    },
    header: {
        ..._styles.rows,
        backgroundColor: modules.WHITE,
        padding: modules.BODY_HORIZONTAL,
    },
    headerText: {
        ...fontGSans,
        color: modules.TEXT,
        fontSize: modules.FONT_H6,
    },
    title: {
        ...FontGSansBold,
        textAlign: 'center',
        color: modules.TEXT,
        fontSize: modules.FONT_H5,
    },
    box: {
        height: PICKER_HEIGHT,
        alignSelf: 'stretch',
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        overflow: 'hidden',
        position: 'relative',
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
        letterSpacing: -0.3,
        textAlign: 'center',
    },
    selectionBand: {
        position: 'absolute',
        left: 16,
        right: 16,
        top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
        height: ITEM_HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.07)',
        borderRadius: 10,
        zIndex: 1,
    },
    fade: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: ITEM_HEIGHT * 2,
        zIndex: 2,
    },
    fadeTop: {
        top: 0,
        backgroundColor: 'rgba(242,242,247,0.68)',
    },
    fadeBottom: {
        bottom: 0,
        backgroundColor: 'rgba(242,242,247,0.68)',
    },
    multiContainer: {
        flexDirection: 'row',
        height: PICKER_HEIGHT,
        backgroundColor: '#F2F2F7',
        borderRadius: 14,
        overflow: 'hidden',
        position: 'relative',
    },
    multiSelectionBand: {
        position: 'absolute',
        left: 8,
        right: 8,
        top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
        height: ITEM_HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.07)',
        borderRadius: 10,
        zIndex: 10,
    },
    columnWrapper: {
        overflow: 'hidden',
    },
    columnInner: {
        width: '100%',
        backgroundColor: 'transparent',
    },
});

export default WheelPickerModal;