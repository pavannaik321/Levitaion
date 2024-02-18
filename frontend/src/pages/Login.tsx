import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const loginUser = async(e:{ preventDefault:()=>void}) => {
        e.preventDefault()
        const { email, password } = data;
        try {
            const { data } = await axios.post('/login', {
                email,
                password
            })
            if (data.error) {
                toast.error(data.error);
            }
            else {
                setData({
                    "email": '',
                    "password" : ''
                })
                toast.success("User Login Successfull")
                navigate('/')
            }
        } catch (error) {
            
        }
    }
  return (
      <div>
          <form onSubmit={loginUser}>
              <label>Email</label>
              <input type='email' placeholder='enter Email' value={data.email} onChange={(e) => setData({ ...data  ,email:e.target.value})} />
              <label>Password</label>
              <input type='text' placeholder='enter your name' value={data.password} onChange={(e)=>setData({...data ,password:e.target.value})}/>
              <button type='submit'>Login</button>
          </form>
    </div>
  )
}

export default Login