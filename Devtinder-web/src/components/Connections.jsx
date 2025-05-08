import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'

const Connections = () => {

    const Connection = async () => {
        try {
            const res = await axios.get( 
                BASE_URL + "/user/connections",
                {withCredentials:true}
            )
            
        } catch (err) {
            //handel err
        }
    }

  return (
    <>
      
    </>
  )
}

export default Connections
