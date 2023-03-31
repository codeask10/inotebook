
import React, { useContext, useState } from 'react'
import contextValue from "../context/notes/NoteContext";
import { useNavigate } from 'react-router-dom';


const AddNote = (props) => {
  const navigate = useNavigate()
  const context = useContext(contextValue);
  const { addNote } = context;

  const [note, setNote] = useState([{ title: "", description: "", tag: "" }]);

  const handleClick = (e) => {
    if (localStorage.getItem('token')) {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      props.showAlert("Note Added Successfully", "success")
      setNote({ title: "", description: "", tag: "default" })
    }
    else {
      navigate('/Login')
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setNote(node => {
      return {
        ...node, [name]: value
      };
    });
  }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note </h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="tittle" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
          </div>
          <button disabled={!note.description || !note.title} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote