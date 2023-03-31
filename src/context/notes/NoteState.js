import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial=[];
  const [notes, setNotes] = useState(notesInitial)

  
  //Get All  a notes
  const getNotes = async() => {
    //To do API call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }  
    });
    const json= await response.json();
    setNotes(json);
      
  }
  
  //adding a notes
  const addNote = async(title, description, tag) => {
    //To do API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const note=  await response.json();
    // console.log(Json);
   
    // const note = {
    //   "_id": "63391fab8a57b3bb7a0ef58893",
    //   "user": "6337e6ada04f214247b36c20",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-10-02T05:20:43.475Z",
    //   "__v": 0
    // }
    setNotes(notes.concat(note))
  }


  //deleting a notes
  const deleteNote =  async(id) => {
    //todo API call
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const Json= await response.json();
    console.log(Json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //updating a notes

  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const Json=  await response.json();
    console.log(Json)
    //Logic to edit in client
    const newNote= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id ===id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
      setNotes(newNote);
    }
  }



  return (
    <NoteContext.Provider value={{ notes,getNotes,addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
