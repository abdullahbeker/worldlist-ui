import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'

export default ({ word }) => {
  return (
    <Card containerStyle={{ padding: 5 }}>
      <Card.Title style={{ marginBottom: 5 }}>
        {word.en.toUpperCase()}
      </Card.Title>
      <Card.Divider style={{ marginBottom: 0 }} />
      <Text style={{ textAlign: 'center', marginTop: 5 }}>
        {word.tr.toUpperCase()}
      </Text>
    </Card>
  )
}
