import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

// default username: foo, password: bar

const Login = (props) => {
    const history = useNavigate();
    const [userName, addUserName] = useState('');
    const [password, addUserPassword] = useState('');
    const onClick = () => {
        if(userName === 'foo' && password === 'bar'){
            localStorage.setItem('isLoggedIn', true);
            history('/home');
        }
    }
    return (
        <div className="loginHome">
            <div className="loginInputDiv">
                <b>username</b>
                <input type="text" name="userName" placeholder="User Name" value={userName} onChange={(e) => addUserName(e.target.value)} className="loginInput"/>
            </div>
            <div className="loginInputDiv">
                <b>password</b>
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => addUserPassword(e.target.value)} className="loginInput"/>
            </div>
            <button type="submit" onClick={onClick}>Submit</button>
        </div>
    )
}

export default (Login);