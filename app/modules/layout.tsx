import { Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

const layout = {
  TAB_ICON_SIZE: 26,
  GRID_SPACING: 8,
  BODY_HORIZONTAL: 15,
  BODY_HORIZONTAL_24: 24,
  BODY_HORIZONTAL_ACTION: 30,
  BODY_HORIZONTAL_18: 18,
  BODY_HORIZONTAL_12: 12,
  PADDING: 15,
  SPACE: 4,
  SPACE5: 5,
  BIG_SPACE: 6,
  RADIUS: 6,
  RADIUS_BUTTON: 50,
  RADIUS_MESSAGE: 18,
  VIEW_PORT_WIDTH: viewportWidth,
  VIEW_PORT_HEIGHT: viewportHeight,
  PADDING_BAR: 45,
  HEADER_ICON_BUTTON: 40,
  CARD_HEADER: 120,
  AVATAR_LIST: 38,
  VALUE: 24,
  AVATAR_GRID: 65,
  ACTIVE_HIGHLIGHT: 0.7,
  START_LINE_GRADIENT: { x: 0.25, y: 0 },
  END_LINE_GRADIENT: { x: 0.5, y: 0.5 },
  START_LINE_GRADIENT_V: { x: 0, y: 0.1 },
  END_LINE_GRADIENT_V: { x: 1, y: 0.9 },
  START_LINE_GRADIENT_V2: { x: 1, y: 0.5 },
  END_LINE_GRADIENT_V2: { x: 1, y: 0 },
  START_LINE_GRADIENT_V4: { x: 1, y: -0.5 },
  END_LINE_GRADIENT_V4: { x: 0, y: 1 },
  CARD: 350,
  CARD_RADIUS: 12,
  APPLE_CARD_RADIUS: 18,
  CARD_PENDING: 20,
  FONT_H1: 34,
  FONT_H2: 28,
  FONT_H3: 22,
  FONT_H4: 20,
  FONT_H5: 17,
  FONT_H6: 16,
  FONT_H7: 14,
  FONT_P: 13,
  FONT_S: 12,
  SMALL: 11,
  FONT: 15,
  FONT_BIG: 32,
  IPAD_PADDING: 100,
  IPAD_PADDING_V2: '12%',
  IPAD_PADDING_HORIZONTAL: '15%',
  HOME_SCREEN_BORDER: 28,
  FOLD_PADDING: '10%',
  FOLD_PADDING_HORIZONTAL: '10%',



  SHADOW_MENU: {
    shadowColor: '#CFCCDC',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 2
  },

  BOX_RADIUS: 24,
  ACTIVE_OPACITY: 0.5,

  HEADER_HEIGHT: 100,
  BACKGROUND_HEIGHT: 50
} as const

export default layout
