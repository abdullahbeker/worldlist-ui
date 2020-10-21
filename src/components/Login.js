import React, { useContext, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Keyboard
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import api from '../api'
import { UserDispatchContext } from '../contexes/UserContext'
import AsyncStorage from '@react-native-community/async-storage'

const USERNAME_TAKEN = 'This username is already taken'
const USERNAME_EMPTY = 'Please provide a username'

export default () => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const userDispatch = useContext(UserDispatchContext)

  const onButtonPress = async e => {
    Keyboard.dismiss()
    if (!username) {
      setErrorMessage(USERNAME_EMPTY)
      return
    }
    try {
      setLoading(true)
      const response = await api.post('/users/', { name: username })
      const { user } = response.data
      const { _id, name } = user
      const _user = {
        id: _id,
        username: name
      }
      AsyncStorage.setItem('@user', JSON.stringify(_user)).catch(err =>
        console.log(err)
      )
      userDispatch(_user)
    } catch (err) {
      if (err.response.status === 400) setErrorMessage(USERNAME_TAKEN)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'your username'}
        onChangeText={u => setUsername(u)}
        defaultValue={username}
        placeholderTextColor={'#fff'}
        editable={!loading}
        autoCapitalize='none'
        autoCorrect={false}
        onFocus={e => {
          if (errorMessage) setErrorMessage('')
        }}
      />

      <TouchableOpacity
        style={styles.iconWrapper(errorMessage)}
        onPress={onButtonPress}>
        {!loading ? (
          <AntDesign name='arrowright' size={24} color='white' />
        ) : (
          <ActivityIndicator
            size='small'
            color='white'
            style={{ padding: 2 }}
          />
        )}
      </TouchableOpacity>

      {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple'
  },
  input: {
    borderWidth: 0,
    height: 40,
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 25,
    marginTop: 70
  },
  iconWrapper: errorMessage => {
    return {
      marginTop: 40,
      marginBottom: errorMessage ? 21 : 40,
      borderWidth: 1,
      borderColor: 'white',
      padding: 10,
      borderRadius: 30
    }
  },
  errorMessage: {
    color: 'tomato'
  }
})
