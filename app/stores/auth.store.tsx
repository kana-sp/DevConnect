import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MMKV } from 'react-native-mmkv'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
} from '@react-native-firebase/auth'
import { doc, getDoc, onSnapshot } from '@react-native-firebase/firestore'
import {
    authRef,
    usersRef,
    batchRef,
    serverTimestampRef,
    toCreateFields,
} from '../services/data.service'

const storage = new MMKV()

const mmkvStorage = {
    getItem: (name: string) => storage.getString(name) ?? null,
    setItem: (name: string, value: string) => storage.set(name, value),
    removeItem: (name: string) => storage.delete(name),
}

let unsubscribeRefs: any = {}

function unsubscribeFun(ref: any) {
    if (ref && typeof ref === 'function') {
        ref()
    }
    return Promise.resolve()
}


const initial_state = {
    credential: null as FirebaseAuthTypes.User | null,
    user: null as any,
    role: null as string | null,
}

type IAuthStore = {
    credential: FirebaseAuthTypes.User | null
    user: any
    role: string | null

    setCredential: (credential: FirebaseAuthTypes.User | null) => void
    setUser: (user: any) => void
    setRole: (role: string | null) => void
    clearStore: () => void
}

export const useAuthStore = create(
    persist<IAuthStore>(
        (set, get) => ({
            ...initial_state,

            setCredential: (credential) => set({ credential }),
            setUser: (user) => set({ user }),
            setRole: (role) => set({ role }),
            clearStore: () => set({ ...initial_state }),
        }),
        {
            name: 'devconnect-auth',
            storage: createJSONStorage(() => mmkvStorage),
        },
    ),
)


export async function signIn(email: string, password: string) {
    const { setCredential } = useAuthStore.getState()

    try {
        const result = await signInWithEmailAndPassword(authRef(), email, password)
        setCredential(result.user)
        return result.user
    } catch (error: any) {
        console.log('Sign in error:', error.code)
        throw error
    }
}


export async function signUp(
    email: string,
    password: string,
    displayName: string,
) {
    const { setCredential } = useAuthStore.getState()

    const result = await createUserWithEmailAndPassword(authRef(), email, password)
    const uid = result.user.uid

    const batch = batchRef()
    batch.set(doc(usersRef(), uid), {
        key: uid,
        displayName,
        email,
        bio: '',
        skills: [],
        photoURL: '',
        role: 'user',
        ...toCreateFields(result.user),
    })
    await batch.commit()

    setCredential(result.user)
    return result.user
}


export function onSubscribeUser(uid: string) {
    const { setUser, setRole } = useAuthStore.getState()

    unsubscribeFun(unsubscribeRefs.userRef)

    unsubscribeRefs.userRef = onSnapshot(
        doc(usersRef(), uid),
        (snapshot) => {
            const userData = snapshot.data()
            setUser(userData)
            setRole(userData?.role ?? 'user')
        },
    )
}

export function listenToAuthState() {
    unsubscribeFun(unsubscribeRefs.authRef)

    unsubscribeRefs.authRef = onAuthStateChanged(
        authRef(),
        (firebaseUser) => {
            const { setCredential } = useAuthStore.getState()

            if (firebaseUser) {
                setCredential(firebaseUser)
                onSubscribeUser(firebaseUser.uid)
            } else {
                useAuthStore.getState().clearStore()
            }
        },
    )
}



export async function signOut() {
    await Promise.all(
        Object.values(unsubscribeRefs).map((ref) => unsubscribeFun(ref)),
    )
    unsubscribeRefs = {}
    await firebaseSignOut(authRef())
    useAuthStore.getState().clearStore()
}
