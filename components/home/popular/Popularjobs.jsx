import React from 'react'
import { View, Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import PopularJobCard from "../../common/cards/popular/PopularJobCard"
import styles from './popularjobs.style'
import useFetch from '../../../hooks/useFetch'
import { COLORS,SIZES } from '../../../constants'
import { isLoading } from 'expo-font'
const Popularjobs = () => {
 
const {isLoading,error,data} = useFetch('search',{
  query:'React developer',
  num_pages:1
})
  
 const router = useRouter()
  // const data =[1,2,3,4,5,6]
  return (
    <View style={styles.container}>
      <View style={styles.header}>
    
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      
      </View>
     <View style={styles.cardsContainer}>
      {
        isLoading ? (<ActivityIndicator size="large" color={COLORS.primary} />):error ? (<Text>Something went wrong {JSON.stringify(error)}</Text>): (<FlatList 
        data={data}
        renderItem={({item}) =>(
          <PopularJobCard item={item}
          handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
           />
        )}
        keyExtractor={item => item?.job_id}
        contentContainerStyle={{columnGap:SIZES.medium}}
        horizontal
        />)
      }
      {/* <Text>{JSON.stringify(data)}</Text> */}
     </View>
    </View>
  )
}

export default Popularjobs