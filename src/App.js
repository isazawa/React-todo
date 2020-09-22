import { Button, FormControl, InputLabel, Input,} from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
        timestamp: doc.data().timestamp,
      })))
    });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      content: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    // setTodos([...todos, {
    //   id: todos.length + 1,
    //   content: input
    // }]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Todo アプリ</h1>

      <form>
        <FormControl>
          <InputLabel>✔︎todo追加</InputLabel>
          <Input
            value = {input}
            onChange = {event => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          onClick = {addTodo}
        >ADD
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo
          todo={todo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
