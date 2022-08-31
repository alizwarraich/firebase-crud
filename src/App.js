import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './App.css';

function App() {
  // States
  const [input, setInput] = useState({
    name: '',
    age: 0,
  });
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  // Functions

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
    if(e.target.name==='age'){
      setInput({...input, [e.target.name]: Number(e.target.value)});
    }
  }

  // -- Add User
  const addUser = async () => {
    const { name, age } = input;
    const user = { name, age };
    setInput({name:'',age:0});
    await addDoc(usersCollectionRef,user);
  }

  // -- Update User Details
  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = {age: age+1}
    await updateDoc(userDoc, newFields);
  }

  // -- Delete User
  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  }


  // Effect to get Users Data
  useEffect(()=>{
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
    }
    getUsers();
  },[usersCollectionRef])

  return (
    <div className="App">
      <input value={input.name} onChange={handleChange} 
        name="name" type="text" placeholder='Name...' />
      <input value={input.age} onChange={handleChange}
        name="age" type="number" placeholder='Age...' />
      <button onClick={addUser}>Create User</button>
      {users.map((user)=>{
        return (
          <div key={user.id}>
            <h3>Name: {user.name}</h3>
            <p>Age: {user.age}</p>
            <button onClick={()=>updateUser(user.id, Number(user.age))}>Increase Age</button>
            <button onClick={()=>deleteUser(user.id)}>Delete User</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
