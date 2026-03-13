import React, { useEffect, useRef, useState } from 'react'
import storage, { getDownloadURL, getStorage, ref } from '@react-native-firebase/storage'
// import { Image, ImageProps, Source, ImageErrorEventData } from 'expo-image'
import Image, { Source, FastImageProps, OnErrorEvent } from '@d11/react-native-fast-image'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlowView } from './PlaceholderLoading'
import { FullScreenImageViewer } from './FullScreenImageViewer'

// Example:=======================================
//
//  <FastImageFire
//     style={styles.img}
//     size="400"
//     isForceResize
//     source={{ uri: firebase url image }}
//  />
//
// ===============================================
type memoType = {
  [key: string]: any
}
export type ImageSizeType = '400' | '720' | '1024'

// const blurhash = 'U8PZ$Hxu00Rl00WB%LWB~Vj[%Lt64payxtaz'; // blurhash for placeholder

interface Props extends FastImageProps {
  size: ImageSizeType // resize size
  source: number | Source // image source
  blurHash?: string // blurhash for placeholder
  isForceResize?: boolean // if cache has original size force to resize
}

const ImageMemo = React.memo((props: Props) => {
  const { source, size, isForceResize } = props

  const [transformSource, setSource] = useState<number | Source | null>(() => TransformImageSameTokenNo(source, size))
  const [error, setError] = useState<number>(0)
  const _mounted = useRef(false)
  const _error = useRef(false)

  useEffect(() => {
    _mounted.current = true
    if (_mounted.current) {
      setError(0)
      setSource(TransformImageSameTokenNo(source, size))
    }
    return () => {
      _mounted.current = false
    }
  }, [source, size, isForceResize])

  const _onError = (e: OnErrorEvent) => {
    _error.current = true
    if (props.onError) props.onError(e)
    if (error === 0) {
      if (typeof source !== 'number' && 'uri' in source && source.uri) {
        const { uri } = source
        TransformImage(uri, props.size)
          .then((url) => {
            if (_mounted.current) setSource({ uri: url })
          })
          .catch(() => {
            if (_mounted.current) setSource(source)
          })
      } else {
        if (_mounted.current) setSource(source)
      }
    } else if (error === 1) {
      if (_mounted.current) setSource(source)
    }
    if (_mounted.current) setError((prev) => prev + 1)
  }

  if (!transformSource || (typeof transformSource !== 'number' && !transformSource?.uri)) {
    return <View {...props} />
  }
  return <Image {...props} style={styles.img} source={transformSource} onError={_onError} />
}, memoIsEquivalent)

const FastImageWithViewing = React.memo(({ style, ...props }: Props) => {
  const [showLoading, setShowLoading] = useState(false)
  const loadedRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadedRef.current) setShowLoading(true)
    }, 250)

    return () => clearTimeout(timer)
  }, [])

  const hideLoading = () => {
    loadedRef.current = true
    setShowLoading(false)
  }
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  return (
    <View style={[style, styles.overflow]}>
      <TouchableOpacity
        // style={props.style}
        activeOpacity={0.85}
        onPress={() => setSelectedPhoto(props.source?.uri!)}
      >
        <ImageMemo {...props}
          onLoadEnd={hideLoading}
          onError={hideLoading}
        />
      </TouchableOpacity>

      {
        showLoading && (
          <GlowView style={styles.glowOverlay} tans={true} pointerEvents="none" />
        )
      }

      {selectedPhoto && (
        <FullScreenImageViewer
          imageUri={selectedPhoto}
          visible={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </View >
  )
})

export default FastImageWithViewing

const styles = StyleSheet.create({
  overflow: { overflow: 'hidden' },
  img: { width: '100%', height: '100%' },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(232,232,232,0.35)',
  },
})

// ====================================================================
//
// ====================================================================
function memoIsEquivalent(a: memoType, b: memoType) {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    if (propName !== 'children' && JSON.stringify(a[propName]) !== JSON.stringify(b[propName])) {
      return false
    }
  }

  return true
}

function TransformImage(storagePath: string, size?: ImageSizeType) {
  return new Promise<string>((resolve, reject) => {
    if (!storagePath) reject()
    const isUrl = checkUrl(storagePath)
    const [pathUrl] = isUrl ? UrlToPath(storagePath) : [storagePath]
    const [path, name] = fileNameAddSize(pathUrl, size)
    const pathName = size ? `${path}/thumbs/${name}` : `${path}/${name}`

    // ✅ Modular API: ref(storageInstance, path) instead of storage().ref(path)
    const storageInstance = getStorage()
    const storageRef = ref(storageInstance, pathName)

    getDownloadURL(storageRef)
      .then((url) => {
        resolve(url)
      })
      .catch((e) => {
        if (isUrl) {
          resolve(storagePath)
        } else if (size) {
          TransformImage(storagePath).then(resolve).catch(reject)
        } else reject(e)
      })
  })
}
// function TransformImageSameToken(storagePath: string, size?: ImageSizeType) {
//     return new Promise<string>((resolve, reject) => {
//         if (!storagePath) reject()
//         const isUrl = checkUrl(storagePath)
//         if (isUrl) {
//             const [pathUrl, token, rawPath] = UrlToPath(storagePath)
//             const [path, name] = fileNameAddSize(pathUrl, size)
//             const pathName = size ? `${path ? `${path}/` : ""}thumbs/${name}` : `${path ? `${path}/` : ""}${name}`
//             const ref = encodeURIComponent(pathName)
//             resolve(`${rawPath}${ref}?${token}`)
//         } else {
//             if (size) { TransformImageSameToken(storagePath).then(resolve).catch(reject) }
//             else TransformImage(storagePath, size).then(resolve).catch(reject)
//         }
//     })
// }

export function TransformImageSameTokenNo(source: number | Source, size: ImageSizeType) {
  if (typeof source !== 'number' && source?.uri) {
    const { uri } = source
    if (checkData(uri)) {
      return source
    } else {
      const isUrl = checkUrl(uri)
      if (isUrl) {
        const [pathUrl, token, rawPath] = UrlToPath(uri)
        const [path, name] = fileNameAddSize(pathUrl, size)
        const pathName = size ? `${path ? `${path}/` : ''}thumbs/${name}` : `${path ? `${path}/` : ''}${name}`
        const ref = encodeURIComponent(pathName)
        return { uri: `${rawPath}${ref}?${token}` }
      } else if (checkIsPath(uri)) {
        return source
      } else {
        return null
      }
    }
  } else {
    return source
  }
}

function checkUrl(url: string | number) {
  const expression = /^(http(s)?(:\/\/))/gi
  const regex = new RegExp(expression)
  if (typeof url === 'string') {
    const result = url.match(regex)
    if (result) {
      return true
    }
    return false
  } else {
    return false
  }
}
function checkData(url: string | number) {
  const expression = /^data:/gi
  const regex = new RegExp(expression)
  if (typeof url === 'string') {
    const result = url.match(regex)
    if (result) {
      return true
    }
    return false
  } else {
    return false
  }
}

function checkIsPath(url: string | number) {
  const expression = /(^\/)|(^file:\/\/)/gi
  const regex = new RegExp(expression)
  if (typeof url === 'string') {
    const result = url.match(regex)
    if (result) {
      return true
    }
    return false
  } else {
    return false
  }
}

function UrlToPath(url: string) {
  const rawSplit = url?.split('/').pop()?.split('?')
  const rawPath = url.replace(url?.split('/').pop() ?? '', '')
  if (Array.isArray(rawSplit) && rawSplit.length > 0) {
    return [decodeURIComponent(rawSplit[0]), rawSplit[1], rawPath]
  }
  return ['', '', '']
}

function fileNameAddSize(pathUrl: string, size?: ImageSizeType) {
  const imgname = pathUrl.split('/').pop()?.split('.').slice(0, -1).join('.') || pathUrl.split('/').pop() || ''
  const path = pathUrl.split('/').slice(0, -1).join('/')
  const urlWithoutExt = pathUrl.replace(/\.[^/.]+$/, '') || ''
  const ext = pathUrl.replace(urlWithoutExt, '') || ''
  const imgSize = size ? `_${size}x${size}` : ''
  const name = `${imgname}${imgSize}${ext}`
  return [path, name]
}
