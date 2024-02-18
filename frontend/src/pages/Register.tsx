import  { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const registerUser = async(e: { preventDefault: () => void }) => {
        e.preventDefault()
        // first need to destructure the data
        const { name, email, password } = data;
        try {
            const { data } = await axios.post('/register', {
                name , email,password
            })
            if (data.error) {
                toast.error(data.error);
            }
            else {
                setData({
                    name: '',
                    email: '',
                    password: '',
                })
                toast.success('Login Successfull. Welcome!')
                navigate('/login');
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
      <div>
          <form onSubmit={registerUser}>
              <label>Name</label>
              <input type='text' placeholder='enter your name' value={data.name} onChange={(e)=>setData({...data,name :e.target.value})}/>
              <label>Email</label>
              <input type='email' placeholder='enter your Email'  value={data.email} onChange={(e)=>setData({...data,email :e.target.value})} />
              <label>Password</label>
              <input type='text' placeholder='Password'  value={data.password} onChange={(e)=>setData({...data,password :e.target.value})} />
              <button type='submit'>Submit</button>
          </form>
    </div>
  )
}

export default Register