import { useState } from 'react'
import FormUsernamePassword from '../../components/form-username-password'
import Title from '../../components/title'
import './index.css'
import './media-query.css'

function Cadastro() {
  function onSubmit(user) {
    const newUser = user

    fetch('http://localhost:8001/users', 
    {
      method:'POST',
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => console.log(response.statusText))
    .then(
      window.location.assign('http://localhost:5173/')
    )
    .catch(error => console.error(error))
  }
  

    return (
      <div className="cadastro">
        <Title title="WR.Bank" subtitle="Cadastro"/>
        <FormUsernamePassword onSubmit={onSubmit}/>
      </div>
    )
}
  
export default Cadastro
