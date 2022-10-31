
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[users,setUsers]=useState([])

  useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res=>res.json())
  .then(data=>setUsers(data))
  },[])

const handleSubmit=(event)=>{
event.preventDefault()
const name= event.target.name.value;
const email= event.target.email.value;
const user= {name,email}
fetch('http://localhost:5000/users',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body: JSON.stringify(user)
})
.then(res=>res.json())
.then(data=>{
  console.log(data)
  const newData= [...users,data]
  setUsers(newData)
})
event.target.reset()
console.log(user)
}

  return (
    <div className="App">

      <form onSubmit = {handleSubmit}>
         <input type="text"  name='name'id='name' placeholder='Name' />
         <br></br>
         <input type="email"  name='email'id='email' placeholder='Email' />
         <br/>
         <button type='submit'>Add user</button>
      </form>

      <h2>User:{users.length}</h2>
      {users.map(user=><p key={user._id}>{user.name}{user.email}</p>)}
    </div>
  );
}

export default App;
