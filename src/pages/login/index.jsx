import { Navigate } from 'react-router-dom'
import FormUsernamePassword from '../../components/form-username-password'
import Title from '../../components/title'
import PrivateRoute from '../../utils/private-routes'
import './index.css'
import './media-query.css'


function Login() {
  
  function onSubmit(user) {

    fetch('http://localhost:8001/auth/login', 
    {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      const token = data.token;
      
      localStorage.setItem("token", token);
      
      window.location.assign('http://localhost:5173/dashboard');
      }
    )
    .catch(error => console.error(error))
  }

    return (
      <div className="login">
        <Title title="WR.Bank" subtitle="Login"/>
        <FormUsernamePassword onSubmit={onSubmit}/>
      </div>
    )
}
  
export default Login
