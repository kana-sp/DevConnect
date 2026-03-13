import { Platform, StyleSheet } from 'react-native'
import modules from 'modules'
import { HanumanBold } from '@customs/customFont'

const _styles = StyleSheet.create({
  filter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(200,200,200,.2)',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: modules.SLIGHT_BLACK,
  },
  full: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  half_top: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '60%',
    position: 'absolute',
  },
  full_absolute: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: modules.WHITE,
  },
  border: {
    borderBottomColor: modules.BORDER_COLOR,
    borderBottomWidth: 0.5,
  },
  borderTop: {
    borderTopColor: modules.BORDER_COLOR,
    borderTopWidth: 1,
  },
  borderItem: {
    backgroundColor: modules.BORDER,
    height: 0.8,
  },
  borderTab: {
    borderBottomColor: modules.BORDER,
    borderBottomWidth: 1,
    width: '100%',
    height: 1,
    zIndex: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  containItems: {
    paddingTop: modules.BODY_HORIZONTAL,
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: modules.BORDER_COLOR,
  },
  contentModal: {
    backgroundColor: 'white',
    padding: modules.BODY_HORIZONTAL,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  imgFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flx2: {
    flex: 2,
  },
  column: {
    justifyContent: 'center',
  },
  org: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: modules.BODY_HORIZONTAL,
  },
  avatar: {
    width: 50,
    height: 50,
    borderColor: '#ebebeb',
    borderWidth: 1,
    borderRadius: 50 / 2,
  },
  fake: {
    height: 80,
  },
  fakeWidth: {
    width: 80,
  },
  fake168: {
    height: 168,
  },
  iconTabContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: modules.SPACE,
  },
  TopTabActive: {
    color: modules.WHITE,
    fontSize: 15,
  },
  TopTab: {
    fontSize: 15,
    color: modules.WHITE_SUB,
  },
  labelTabActive: {
    color: modules.PRIMARY,
    fontSize: 11,
  },
  labelTab: {
    fontSize: 11,
    color: modules.PRIMARY_TAB,
  },
  body: {
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  bodyIcon: {
    paddingHorizontal: modules.BODY_HORIZONTAL - 10,
  },
  containerWhite: {
    flex: 1,
    backgroundColor: modules.WHITE,
  },
  bgWhite: {
    backgroundColor: modules.WHITE,
  },
  topTab: {
    backgroundColor: modules.WHITE,
    flexDirection: 'column',
    flex: 1,
  },
  containModal: {
    backgroundColor: '#FFF',
    paddingVertical: modules.BODY_HORIZONTAL / 2,
  },
  containerPrimary: {
    flex: 1,
    backgroundColor: modules.BACKGROUND_WALL,
  },

  containerColorPrimary: {
    flex: 1,
    backgroundColor: modules.BACKGROUND_PRIMARY,
  },
  flx1: {
    flex: 1,
  },
  flx_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerMode: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: modules.BODY_HORIZONTAL,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    // backgroundColor:"#FFF",
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,.15)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 10,
        shadowOpacity: 2,
      },
      android: {
        elevation: 10,
      }
    }),
  },
  cardCppShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      }
    }),
    // borderRadius: modules.CARD_RADIUS,
  },
  cardCppTapShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      }
    }),
    // borderRadius: modules.CARD_RADIUS,
  },
  shadowTop: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,.15)',
        shadowOffset: {
          width: 10,
          height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 10,
      },
      android: {
        elevation: 0,
      }
    }),
  },
  shadowBottom: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,.15)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 10,
        shadowOpacity: 10,
      },
      // android: {
      //   elevation: 1,
      // }
    }),
  },
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#CFCCDC',
        shadowOffset: {
          width: 0,
          height: 15,
        },
        shadowRadius: 20,
        shadowOpacity: 0.65,
      },
      android: {
        elevation: 15,
      }
    }),
  },
  shadowSmall: {
    shadowColor: '#CFCCDC',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowOpacity: 0.5,
    elevation: 8,
  },
  shadowBlackSmall: {
    shadowColor: 'rgba(0,0,0,.01)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowOpacity: 0.5,
    elevation: 8,
  },
  statisticContainer: {
    backgroundColor: modules.WHITE,
    marginBottom: modules.BODY_HORIZONTAL / 2,
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  dark_shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,.1)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 10,
        shadowOpacity: 2,
      },
      android: {
        elevation: 10,
      }
    }),
  },
  super_dark_shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 10,
        shadowOpacity: 2,
      },
      android: {
        elevation: 10,
      }
    }),
  },
  tabletModalContainer: {
    margin: 0,
    justifyContent: 'center',
  },
  tabletModal: {
    width: '100%',
    maxHeight: 500,
    alignSelf: 'center',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
  },
  tabletSection: {
    overflow: 'hidden',
    borderRadius: modules.CARD_RADIUS,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  tabletCard: {
    overflow: 'hidden',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
    marginVertical: modules.BODY_HORIZONTAL_12,
  },
  tabletBgCard: {
    borderRadius: modules.CARD_RADIUS,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  shadow_facebook: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      }
    }),
  },
  newShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,.15)',
        shadowOffset: {
          width: 1,
          height: 0
        },
        shadowRadius: 3,
        shadowOpacity: 2,
      },
      android: {
        elevation: 10,
      }
    }),
  },
  shadow_facebook2: {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.3)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.30,
        // shadowRadius: 1.41,
      },
      android: {
        elevation: 9,
      }
    }),
  },
  homeCardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#CFCCDC',
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 15,
      }
    })
  },
  absoluteTop: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  topShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      }
    }),
  },
  shadowDark: {
    // backgroundColor:"#FFF",
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.35)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 15,
        shadowOpacity: 1,
      },
      android: {
        elevation: 10,
      }
    }),
  },
  shadowDarkToLow: {
    // backgroundColor:"#FFF",
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.35)',
        shadowOffset: {
          width: 0,
          height: 15,
        },
        shadowRadius: 15,
        shadowOpacity: 1,
      },
      android: {
        elevation: 10,
      }
    }),
  },
  card: {
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0,0.3)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      }
    }),
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  floatButtonShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.35)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      }
    }),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    marginHorizontal: 2,
    backgroundColor: modules.LINK
  },
  section: {
    ...Platform.select({
      ios: {
        shadowColor: '#CFCCDC',
        shadowOffset: {
          width: 0,
          height: 15,
        },
        shadowRadius: 20,
        shadowOpacity: 0.65,
      },
      android: {
        elevation: 15,
      }
    }),
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
    marginTop: modules.BODY_HORIZONTAL_12,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  sectionBox: {
    overflow: 'hidden',
    backgroundColor: modules.WHITE,
    borderRadius: modules.CARD_RADIUS,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: modules.BODY_HORIZONTAL_12,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
  },
  sectionLabel: {
    flex: 1,
    ...HanumanBold,
    color: modules.ACTIVE_LABEL,
    fontSize: modules.FONT_H5,
  },
  sectionTitle: {
    ...HanumanBold,
    fontSize: modules.FONT_H4,
    color: modules.ACTIVE_LABEL,
  },
  sectionSubTitle: {
    ...HanumanBold,
    fontSize: modules.FONT_H6,
    color: modules.ORANGE_RED,
  },
  sectionIcon: {
    fontSize: modules.FONT_H4,
    color: modules.ORANGE_RED,
    marginRight: modules.BODY_HORIZONTAL_12 / 2,
    transform: [{ translateY: -2 }],
  },
  loadingMargin: {
    margin: modules.BODY_HORIZONTAL
  },
  star: {
    color: modules.ORANGE_RED,
    fontSize: modules.FONT_H4,
  },
  list: {
    flex: 1,
    width: '100%',
    height: '100%',
    minWidth: 100,
    minHeight: 100,
  },
  shadow_light: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255,255,255,.5)',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 2,
      }
    }),
  },
  flex_center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default _styles

