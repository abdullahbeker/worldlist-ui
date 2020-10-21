import React, { useContext, useEffect } from 'react'
import { UserContext, UserDispatchContext } from './contexes/UserContext'
import AsyncStorage from '@react-native-community/async-storage'

import Login from './components/Login'
import List from './components/List'

export default () => {
  const userDispatch = useContext(UserDispatchContext)
  const user = useContext(UserContext)

  useEffect(() => {
    AsyncStorage.getItem('@user')
      .then(u => {
        userDispatch(JSON.parse(u))
      })
      .catch(err => console.log(err))
  }, [])

  return user ? <List /> : <Login />
}
