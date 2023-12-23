import React from 'react'
import { View, Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
 
import styles from './nearbyjobs.style'
import useFetch from '../../../hooks/useFetch'
import { COLORS,SIZES } from '../../../constants'
import { isLoading } from 'expo-font'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
const Nearbyjobs = () => {
 
const {isLoading,error,data} = useFetch('search',{
  query:'React developer',
  num_pages:1
})
  
 const router = useRouter()
  // const data =[1,2,3,4,5,6]
  return (
    <View style={styles.container}>
      <View style={styles.header}>
    
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      
      </View>
     <View style={styles.cardsContainer}>
      {
        isLoading ? (<ActivityIndicator size="large" color={COLORS.primary} />):error ? (<Text>Something went wrong {JSON.stringify(error)}</Text>): (
        
          data?.map((job) =>(
            <NearbyJobCard 
            job={job}
            key={`nearby-job-${job?.job_id}`}
            handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))

        )
      }
      {/* <Text>{JSON.stringify(data)}</Text> */}
     </View>
    </View>
  )
}

export default Nearbyjobs