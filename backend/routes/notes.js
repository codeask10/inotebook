const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require("../modals/notes");
const { body, validationResult } = require('express-validator');

// Route 1 :- Get LoogedIn a user Details using :Get "api/notes/fetchAllNotes",  login required 
router.get("/fetchAllNotes", fetchuser,async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

// Route 2 :- add  a notes using: Post "api/notes/addnotes",  login required 
router.post("/addnote", fetchuser, [
    body('title', 'Enter the Title atleast size of 3').isLength({ min: 3 }),
    body('description', 'Enter the Description atlease 5 words').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request  and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // saving the notes 
        const savenote = await note.save();
        res.json(savenote);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

//  Route  :- update an existing  notes using: Put "api/notes/update    ",  login required 
router.put("/update/:id", fetchuser, async (req, res) => {
    try {
        
        const {title, description,tag}= req.body;
    
        //creating a new node object    
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
         
        //Find the note to updated and update: checking the content is already available or not
        let note =  await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        
        // Allow updation only if user owns this note 
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id,{$set :newNote}, {new:true })
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})
//  Route 4 :- Delete an existing  notes using: Delete "api/notes/delete    ",  login required 
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        let note =  await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
        
    
        // Allow the deletion only if user owns this note
    
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Notes.findByIdAndRemove(req.params.id)
        res.json( {"Success":"Note has been deleted ",note:note });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Internal server error occured");
    }
})

module.exports = router; 