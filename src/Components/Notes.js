import React, { useContext, useEffect, useRef, useState } from 'react'
import contextValue from "../context/notes/NoteContext";
import Noteitem from './Noteitem';
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom' ;


const Notes = (props) => {
    const context = useContext(contextValue);
    const { notes, getNotes, editNote} = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            
             navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const ref = useRef(null);
    const [note, setNote] = useState({eid: "", etitle: "", edescription: "", etag: ""})
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }
    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        e.preventDefault();
        props.showAlert("Updated succesfully","success")

        
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.edescription.length<5 || note.etitle.length<5} onClick={handleClick} data-bs-dismiss='modal' className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length===0 && 'No notes to display '} 
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes