const express = require("express");

const router = express.Router();

const db = require("../db");

const Notes = db.get("notes");

const Schema = require("../models/Notes");

const fetchuser = require("../middlewares/fetchuser");

// Route 1 : Get all Notes
router.get("/getAllNotes", fetchuser, async (req, res) => {
  const items = await Notes.find({ user: req.user._id });
  res.json(items);
});

// Route 2 : Create a note
router.post("/createNote", fetchuser, async (req, res) => {
  try {
    // validate the body
    const user = await req.user._id;
    console.log(user);
    const { title, description, tag } = req.body;

    // if user is true
    if (user) {
      // validate the body
      const notes = await Schema.validateAsync({ title, description, tag });
      // insert to DB
      if (notes) {
        // insert to DB
        notes.created_on = new Date().toLocaleString();
        const createdNote = await Notes.insert({
          user,
          title,
          description,
          tag,
        });
        return res.status(201).json({
          message: "Note Created",
          value: createdNote,
        });
      }
      return res.status(422).json({
        messag: "Try to register notes with valid credentails",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Route 3 : Update a note
router.put("/updateNote/:id", fetchuser, async (req, res) => {
  try {
    const { id } = req.params; // parameter id
    // console.log(id);

    // await req.user._id;

    const value = await Schema.validateAsync(req.body);

    const item = await Notes.findOne({
      _id: id,
    });

    if (!item) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    const updated = await Notes.update(
      {
        _id: id,
      },
      {
        $set: value,
      }
    );
    return res.status(201).json({
      message: value,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Route 4 : Delete a note
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    //    find the note to for deletion
    const { id } = req.params;
    const item = await Notes.findOne({
      _id: id,
    });

    if (!item) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    // allow deletion if user owns this
    await Notes.remove({
      _id: id,
    });
    return res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
