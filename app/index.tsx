import {  Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'

const Welcome = () => {
  return (
    <SafeAreaView>
      <Text>Welcome</Text>
      <Link href="/home" style={{color:"blue"}}>
      Go Home</Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
       container:{
        backgroundColor:Colors.primary,
        
       }
  });

export default Welcome