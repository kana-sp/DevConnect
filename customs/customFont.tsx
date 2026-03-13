import { Platform } from 'react-native'

interface Props {
  weight: any
  family?: string
  familyIOS?: string
  lineHeight?: number
}

const font: any = {
  OpenSans: {
    weights: {
      Light: '300',
      Normal: '400',
      SemiBold: '600',
      Bold: '700',
      ExtraBold: '800',
    },
  },
  GoogleSans: {
    weights: {
      Bold: '700',
      SemiBold: '600',
      Normal: '400',
    },
  },
  Moul: {
    weights: {
      Regular: '400',
    },
  },
  Battambang: {
    weights: {
      Regular: '400',
      Bold: '700',
    },
  },
  SFProText: {
    weights: {
      Light: '200',
      Regular: '300',
      Medium: '400',
      Semibold: '500',
      Bold: '600',
      Heavy: '700',
    },
  },
  Georgia: {
    weights: {
      Regular: '400',
      Bold: '700',
    },
  },
  Hanuman: {
    weights: {
      Regular: '300',
      Bold: '600',
    },
  },
  KohSantepheap: {
    weights: {
      Regular: '400',
      Bold: '700',
    },
  },
}

const fontMaker = ({ weight = '400', family = 'OpenSans', familyIOS = 'Open Sans', lineHeight }: Props) => {
  const { weights } = font?.[family]
  if (Platform.OS === 'android') {
    const suffix = weights?.[weight] ? weight : ''
    return { fontFamily: family + (suffix.length ? `-${suffix}` : ''), }
  } else {
    weight = weights?.[weight] || weights?.Normal
    if (lineHeight) {
      return { lineHeight, fontWeight: weight, fontFamily: familyIOS }
    }
    return { fontWeight: weight, fontFamily: familyIOS }
  }
}

export const fontLight = fontMaker({ weight: 'Light' })
export const fontNormal = fontMaker({ weight: 'Normal' })
export const fontSemiBold = fontMaker({ weight: 'SemiBold' })
export const fontBold = fontMaker({ weight: 'Bold' })
export const fontExtraBold = fontMaker({ weight: 'ExtraBold' })
export const fontGeorgiaBold = fontMaker({ weight: 'Bold', family: 'Georgia', familyIOS: 'Georgia-Bold' })
export const fontGeorgia = fontMaker({ weight: 'Normal', family: 'Georgia', familyIOS: 'Georgia' })

export const fontGSans = fontMaker({
  weight: 'Normal',
  family: 'GoogleSans',
  familyIOS: 'Google Sans',
})
export const FontGSansSemiBold = fontMaker({
  weight: 'SemiBold',
  family: 'GoogleSans',
  familyIOS: 'Google Sans',
})
export const FontGSansBold = fontMaker({
  weight: 'Bold',
  family: 'GoogleSans',
  familyIOS: 'Google Sans',
})

export const Battambang = fontMaker({
  weight: 'Regular',
  family: 'Battambang',
  familyIOS: 'Battambang-Regular',
})
export const BattambangBold = fontMaker({
  weight: 'Bold',
  family: 'Battambang',
  familyIOS: 'Battambang-Bold',
})

export const SFProTextLight = fontMaker({
  weight: 'Light',
  family: 'SFProText',
  familyIOS: 'SFProText-Light',
})
export const SFProTextMedium = fontMaker({
  weight: 'Medium',
  family: 'SFProText',
  familyIOS: 'SFProText-Medium',
})
export const SFProTextRegular = fontMaker({
  weight: 'Regular',
  family: 'SFProText',
  familyIOS: 'SFProText-Regular',
})
export const SFProTextSemibold = fontMaker({
  weight: 'Semibold',
  family: 'SFProText',
  familyIOS: 'SFProText-Semibold',
})
export const SFProTextBold = fontMaker({
  weight: 'Bold',
  family: 'SFProText',
  familyIOS: 'SFProText-Bold',
})
export const SFProTextHeavy = fontMaker({
  weight: 'Heavy',
  family: 'SFProText',
  familyIOS: 'SFProText-Heavy',
})

export const Moul = fontMaker({
  weight: 'Regular',
  family: 'Moul',
  familyIOS: 'Moul',
})
export const HanumanRegular = fontMaker({
  weight: 'Regular',
  family: 'KohSantepheap',
  familyIOS: 'KohSantepheap-Regular',
})
export const HanumanBold = fontMaker({
  weight: 'Bold',
  family: 'KohSantepheap',
  familyIOS: 'KohSantepheap-Bold',
})
