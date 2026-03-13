// app/services/data.service.ts

import { getApp } from '@react-native-firebase/app'
import { getAuth } from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import {
    collection,
    doc,
    FirebaseFirestoreTypes,
    getFirestore,
    initializeFirestore,
    writeBatch,
    serverTimestamp,
} from '@react-native-firebase/firestore'

const app = getApp()
const db = getFirestore(app)
const auth = getAuth(app)
initializeFirestore(app, { ignoreUndefinedProperties: true })

export type FireDocsType =
    FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
export type FireQueryType =
    FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>

export function authRef() {
    return auth
}

export function storageRef() {
    return storage()
}

export function usersRef() {
    return collection(db, 'users')
}

export function projectsRef() {
    return collection(db, 'projects')
}

export function reviewsRef() {
    return collection(db, 'reviews')
}

export function chatsRef() {
    return collection(db, 'chats')
}

export function likesRef() {
    return collection(db, 'likes')
}

export function batchRef() {
    return writeBatch(db)
}

export function serverTimestampRef() {
    return serverTimestamp()
}

export function createId() {
    const { id } = doc(collection(db, '_'))
    return id
}

// === Audit Trail ===
export const toCreateBy = (user: any) => ({
    key: user?.key ?? user?.uid ?? '',
    displayName: user?.displayName ?? '',
    photoURL: user?.photoURL ?? '',
})

export const toCreateFields = (user: any) => ({
    create_by: toCreateBy(user),
    create_date: serverTimestampRef(),
})

export const toUpdateFields = (user: any) => ({
    update_by: toCreateBy(user),
    update_date: serverTimestampRef(),
})