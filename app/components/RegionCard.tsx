import { HanumanBold, HanumanRegular } from '@customs/customFont';
import _styles from '@styles';
import { LinearGradient } from 'expo-linear-gradient';
import modules from 'modules';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import PressableScale from './PressableScale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - modules.BODY_HORIZONTAL * 2;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const categories = [
  {
    title: 'សហភាពអឺរ៉ុប',
    landOrAir: 'ផ្លូវអាកាស',
    totalDelegates: 120,
    pictureDelegates: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/ca/94/ee/ca94ee35-57c1-9f26-2a89-7530f60797ac/9781668236536.jpg/626x0w.webp',
    flagImage: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/ca/94/ee/ca94ee35-57c1-9f26-2a89-7530f60797ac/9781668236536.jpg/626x0w.webp',
    flightNumber: 'FL123',
    arrivedTime: '10 December 2025, 10:30 AM',
    books: [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        color: '#f4a261',
        cover: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/ca/94/ee/ca94ee35-57c1-9f26-2a89-7530f60797ac/9781668236536.jpg/626x0w.webp',
      },
      {
        title: 'A Tale of Two Cities',
        author: 'Charles Dickens',
        color: '#e9c46a',
        cover: 'https://is1-ssl.mzstatic.com/image/thumb/Publication4/v4/0b/f8/ef/0bf8effc-c9e4-8eb6-541a-5266c94fcb5e/9780679604518.jpg/292x0w.webp',
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        color: '#a8dadc',
        cover: 'https://is1-ssl.mzstatic.com/image/thumb/Publication211/v4/e9/08/6e/e9086edf-7ac8-f047-89e9-80af7aa0b6e9/1057992214.jpg/292x0w.webp',
      },
    ],
  }
];

export default function RegionCard() {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={['rgba(255,255,255,0.1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <Text style={styles.sectionTitle}>បដិសណ្ឋារកិច្ច</Text>

      <View style={styles.content}>
        {
          categories.map((category) => (
            <PressableScale
              key={category.title}
              style={[styles.card]}
            >
              <View style={styles.cardContent}>
                {/* Category title */}
                <View style={{ width: '60%' }}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>

                  <View style={{ height: modules.BODY_HORIZONTAL }} />

                  <View style={{ paddingRight: modules.BODY_HORIZONTAL / 2 }}>
                    <View style={[_styles.rows]}>
                      <View style={styles.dot} />
                      <Text style={styles.detail}>ចុះតាម: {category.landOrAir}</Text>
                    </View>
                    <View style={{ height: modules.BODY_HORIZONTAL / 2 }} />
                    <View style={[_styles.rows]}>
                      <View style={styles.dot} />
                      <Text style={styles.detail}>ចំនួននាក់ចូលរួម: {category.totalDelegates} នាក់</Text>
                    </View>
                    <View style={{ height: modules.BODY_HORIZONTAL / 2 }} />
                    <View style={[_styles.rows]}>
                      <View style={styles.dot} />
                      <Text style={styles.detail}>លេខជើងហោះហើរ: {category.flightNumber}</Text>
                    </View>
                    <View style={{ height: modules.BODY_HORIZONTAL / 2 }} />
                    <View style={[_styles.rows]}>
                      <View style={styles.dot} />
                      <Text style={styles.detail}>ម៉ោងចុះចត: {category.arrivedTime}</Text>
                    </View>
                  </View>
                </View>
                {/* Stacked book covers */}
                <View style={styles.booksContainer}>
                  {category.books.map((book, bookIndex) => (
                    <View
                      key={book.title}
                      style={[
                        styles.bookWrapper,
                        {
                          transform: [
                            { translateX: bookIndex * 30 },
                            { translateY: bookIndex * (bookIndex === 0 || bookIndex === 2 ? -12 : 12) },
                          ],
                          zIndex: 3 - bookIndex,
                        },
                      ]}
                    >
                      <View style={[styles.bookShadow, { backgroundColor: book.color + '80' }]} />
                      <Image
                        source={{ uri: book.cover }}
                        style={styles.bookCover}
                        resizeMode="cover"
                      />
                    </View>
                  ))}
                </View>
              </View>
            </PressableScale>
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    color: modules.WHITE,
    marginLeft: 8,
    ...HanumanRegular,
    fontSize: modules.FONT_H6,
    flexShrink: 1,
  },
  dot: {
    width: 8,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: modules.WHITE,
  },
  container: {
    paddingVertical: modules.BODY_HORIZONTAL,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 28,
    ...HanumanBold,
    color: modules.WHITE,
    paddingHorizontal: modules.BODY_HORIZONTAL,
    marginBottom: modules.BODY_HORIZONTAL,
  },
  content: {
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: modules.BODY_HORIZONTAL,
    borderRadius: modules.CARD_RADIUS,
    backgroundColor: '#2E2E2E',
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 24,
    flexDirection: 'row',
  },
  booksContainer: {
    flex: 1,
  },
  bookWrapper: {
    position: 'absolute',
    height: CARD_HEIGHT * 0.8,
    aspectRatio: 0.7,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookShadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    transform: [{ scale: 1.04 }, { translateX: 4 }, { translateY: 6 }],
  },
  bookCover: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  categoryTitle: {
    ...HanumanBold,
    fontSize: 20,
    color: modules.WHITE,
  },
});