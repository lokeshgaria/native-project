import { useEffect, useState } from "react";
 
import axios from "axios"
const useFetch = (endpoint,query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {...query
      
    },
    headers: {
      'X-RapidAPI-Key': 'd6a0abb75amsh2f844f507f3ad31p11b1a3jsnc26d9668d74d',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  const fetchData = async () =>{
    setIsLoading(true);

    try {
       
        const response = await axios.request(options)

        setData(response.data.data);
        
    } catch (error) {
        setError(error)
        alert('there is a error')
    }finally{
setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const refetch = () =>{
    setIsLoading(true)
    fetchData()
  }

  return {refetch,data,isLoading,error}
};

export default useFetch;
