import React, { useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { UserContext } from '../contexes/UserContext'
import { AntDesign } from '@expo/vector-icons'
import Consts from 'expo-constants'
import api from '../api'
import WordCard from './WordCard'
import AddWordModal from './AddWordModal'

export default () => {
  const user = useContext(UserContext)
  const [showAddWordModal, setShowAddWordModal] = useState(false)
  const [wordsLoading, setWordsLoading] = useState(false)
  const [words, setWords] = useState([])

  useEffect(() => {
    setWordsLoading(true)
    api
      .get(`/posts/${user.username}`)
      .then(res => {
        setWords(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setWordsLoading(false)
      })
  }, [])

  return (
    <View style={styles.container(wordsLoading)}>
      {wordsLoading ? (
        <ActivityIndicator color='purple' size='large' />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}>
          {words.map(word => {
            return <WordCard word={word} key={word._id} />
          })}
        </ScrollView>
      )}
      {showAddWordModal && (
        <AddWordModal
          setShowAddWordModal={setShowAddWordModal}
          words={words}
          setWords={setWords}
        />
      )}
      <TouchableHighlight
        style={styles.fab}
        onPress={e => {
          setShowAddWordModal(true)
        }}>
        <AntDesign size={32} name='plus' color='#f9f9f9' />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: wordsLoading => {
    let base = {
      flex: 1,
      backgroundColor: '#f9f9f9',
      marginTop: Consts.statusBarHeight
    }
    if (wordsLoading)
      base = StyleSheet.flatten([
        base,
        {
          justifyContent: 'center',
          alignItems: 'center'
        }
      ])
    return base
  },
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    backgroundColor: 'purple',
    borderRadius: 30,
    padding: 10
  }
})
