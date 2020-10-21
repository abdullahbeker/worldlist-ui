import React from 'react'
import Main from './src/Main'
import { StatusBar } from 'expo-status-bar'
import UserContext from './src/contexes/UserContext'

export default function App() {
  return (
    <UserContext>
      <Main />
      <StatusBar style='auto' />
    </UserContext>
  )
}
