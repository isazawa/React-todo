import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Modal, Input } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

import db from './firebase';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const deleteTodo = (event) => {
    event.preventDefault();
    db.collection('todos').doc(props.todo.id).delete();
  }

  const updateTodo = (event) => {
    event.preventDefault();

    db.collection('todos').doc(props.todo.id).set({
        content:input
    }, {merge: true});

    handleClose()
  }

    const handleOpen = () => {
        setOpen(true);
    };
        const handleClose = () => {
        setOpen(false);
    };

  return (
    <div className="todo">
      <Modal
      open={open}
      onClose={handleClose}
      >
        <div className = {classes.paper}>
            <Input
            value = {input}
            onChange = {event => setInput(event.target.value)}
            placeholder={props.todo.content}
          />

        <Button
            onClick={updateTodo}
        >
            Update
        </Button>

        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={props.todo.content} secondary='締め切り' />
        </ListItem>
      </List>
      <Button
      onClick={handleOpen}
      >Edit
      </Button>
      <Button onClick={deleteTodo}>
        <DeleteForeverIcon />
      </Button>
    </div>
  )
}

export default Todo;
