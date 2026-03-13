import FastImageFire from 'components/FastImageFire';
import modules from 'modules';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BlurAndView from './BlurAndView';
import _styles from '@styles';

interface HostPhotoProps {
    source: any;
    backgroundImage?: any;
}

const HostPhotoV2: React.FC<HostPhotoProps> = ({ source, backgroundImage }) => {
    return (
        <View style={styles.container}>
            {/* <TiledPattern /> */}
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <FastImageFire
                    source={backgroundImage}
                    style={{ flex: 1 }}
                    size={'400'}
                />
            </View>
            <BlurAndView
                tint={'light'}
                intensity={2}
                androidBackground={modules.WHITE}
                style={StyleSheet.absoluteFill}
            />
            <View style={[
                StyleSheet.absoluteFill,
            ]}>
                <FastImageFire
                    size={'1024'}
                    source={source}
                    style={{ width: '100%', height: '100%', borderRadius: modules.CARD_RADIUS, alignSelf: 'center' }}
                    resizeMode={'contain'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden', // clips tiles that go outside bounds
    },
});

export default HostPhotoV2;