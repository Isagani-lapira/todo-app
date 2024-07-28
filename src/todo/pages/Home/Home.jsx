
import { useContext, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../security/AuthContext';

export default function Home(){

    const [username, setUsername] = useState('rar');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();


    function handleUsername(event){
        setUsername(event.target.value)
    }

    function handlePassword(event){
        setPassword(event.target.value);
    }

    async function login(){
        if(username!=='' && password!==''){
            const result =  await auth.authenticate(username,password)

            if(result) navigate(`/welcome/${username}`)
            
        }
    }
    return (
        <div className="home">
            <div>
                {isAuth && <p className='successMsg'>Success authentication</p>}   
                {isError && <p className='errorMsg'>Failed authentication</p>}
            </div>

            <div className='loginInput'>
                <label htmlFor="">Username</label>
                <input type="text" id="username" 
                name="username" value={username}
                onChange={handleUsername} />
            </div>
            <div className='loginInput'>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={password} 
                onChange={handlePassword}/>
            </div>

            <button onClick={login} className='btn btn-primary'>Login</button>
        </div>
    )
}