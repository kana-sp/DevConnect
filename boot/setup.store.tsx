import React from 'react'
import { LogBox, Platform, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import _styles from '@styles'

// Lazy load component
const Routes = React.lazy(() => import('../app/routes'))
export interface Props { }

export interface State {
    ready: boolean
}

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    "The writer you're trying to run",
    'Warning: componentWill',
    'new NativeEventEmitter() was called',
    "The onTouch property is deprecated and will be removed in the next Skia release.",
    "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package.",
    'This method is deprecated (as well as all React Native Firebase namespaced API)',
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
])

function App() {
    return class Setup extends React.Component<Props, State> {
        constructor(props: any) {
            super(props)
            this.state = {
                ready: true,
            }
            if (Platform.OS === 'android') {
                StatusBar.setTranslucent(true)
                StatusBar.setBackgroundColor('rgba(255, 255, 255, 0)')
            }
            StatusBar.setBarStyle('dark-content')
        }

        render() {
            const { ready } = this.state
            if (!ready) return <></>
            return (
                <SafeAreaProvider>
                    <GestureHandlerRootView style={_styles.flx1}>
                        <React.Suspense fallback={true}>
                            <Routes />
                        </React.Suspense>
                    </GestureHandlerRootView>
                </SafeAreaProvider>
            )
        }
    }
}

export default App
