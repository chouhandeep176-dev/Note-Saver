import { createSlice } from "@reduxjs/toolkit";
import { current } from "immer";
import toast from "react-hot-toast";

// previously created notes as "initial state" -->
const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [], // if no notes on local storage, we create empty ones.
};

/* 

notes : {
notes: "[note1, note2, new_note-> {......}]" - string 
}

*/

function similarNoteExist(allNotes, targetNote) {
  for (let i = 0; i < allNotes.length; i++) {
    if (
      targetNote.title.toLowerCase().trim() ===
        allNotes[i].title.toLowerCase().trim() &&
      targetNote.content.toLowerCase().trim() ===
        allNotes[i].content.toLowerCase().trim()
    ) {
      return true;
    }
  }

  return false;
}

function findIndexOfNote(allNotes, targetNote) {
  for (let i = 0; i < allNotes.length; i++) {
    if (targetNote._id == allNotes[i]._id) return i;
  }

  return -1;
}

export const noteSaverSlice = createSlice({
  // note saver -->
  name: "noteSaver",

  initialState,

  // operation on note saver -->
  reducers: {
    noteAdd: (state, action) => {

      console.log("Payload:", action.payload); 
      console.log("All Notes:", current(state.notes));

      const note = action.payload;

      // SAFE way to log notes
      // console.log("All Notes:", current(state.notes));

      // don't add duplicate notes -->
      if (similarNoteExist(state.notes, note)) {
        // same note exist ->
        toast.error("Similar note already exist");
        return;
      }

      if(note.title == "" || note.content == ""){
        toast.error("can't add empty note")
        return;
      }

      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note saved!");
    },

    noteUpdate: (state, action) => {
      const updatedNote = action.payload;

      let prevNoteIdx = findIndexOfNote(state.notes, updatedNote);

      // edge case -->
      if (prevNoteIdx == -1) {
        toast.error("Note doesn't exist");
        return;
      }

      state.notes[prevNoteIdx] = updatedNote;

      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note Updated");
    },

    noteDelete: (state, action) => {
      const noteToDelete = action.payload;

      let prevNoteIdx = findIndexOfNote(state.notes, noteToDelete);

      // edge case -->
      if (prevNoteIdx == -1) {
        toast.error("Note doesn't exist");
        return;
      }

      state.notes.splice(prevNoteIdx, 1);

      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note Deleted");
    },

    noteDeleteAll: (state) => {
      localStorage.removeItem("notes");
      state.notes = [];
      toast.success("All notes deleted!");
    },

    noteCopy: (state, action) => {

      const noteToCopyOnClipboard = action.payload;

      // alert for empty copied string -->
      if (noteToCopyOnClipboard.trim().length < 1){
        toast.error("note is empty!");
        return;
      }

        navigator.clipboard
          .writeText(noteToCopyOnClipboard)
          .then(() => toast.success("Note copied to clipboard!"))
          .catch((err) => toast.error("Failed to copy note!"));
    },

    noteView: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  noteAdd,
  noteDelete,
  noteUpdate,
  noteView,
  noteCopy,
  noteDeleteAll,
} = noteSaverSlice.actions;
export default noteSaverSlice.reducer;
