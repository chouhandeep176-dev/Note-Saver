import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  noteAdd,
  noteUpdate,
  noteCopy,
} from "../features/noteSaver";

function findNote(allNotes, noteId) {
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i]._id == noteId) {
      return allNotes[i];
    }
  }

  return null;
}

const Home = () => {

  // get note id while viewing or edition a note -->
  const { noteId } = useParams();

  // get notes from globle state object -->
  const notes = useSelector((state) => state.noteSaver.notes);

  // get viewOnly flag from location -->
  const location = useLocation();
  const viewOnly = location.state?.viewOnly;

  // useDIspatch() -->
  const dispatch = useDispatch();

  // store title for storing and fetching it from local storage -->
  const [noteTitle, setNoteTitle] = useState(
    noteId ? findNote(notes, noteId).title : ""
  );

  const [noteContent, setNoteContent] = useState(
    noteId ? findNote(notes, noteId).content : ""
  );

  // useeffect to reset title and content --> 
    useEffect(() => {

      // Reset when not editing/viewing ->
      if (!noteId) {
        setNoteTitle("");
        setNoteContent("");
      }

    }, [noteId]);

  // create or Update note -->
  function createUpdateNote() {
    // current time -->
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date().toLocaleDateString("en-GB", options);

    // note object -->
    const note = {
      title: noteTitle,
      content: noteContent,
      date: date,
      _id: noteId || crypto.randomUUID(),
    };

    // console.log(note);

    if (noteId) {
      dispatch(noteUpdate(note)); // update note by dispatching "noteUpdate" action
    } else {
      dispatch(noteAdd(note)); // create note by dispatching "noteAdd" action
    }

    // clear title and content from UI -->
    setNoteTitle("");
    setNoteContent("");
  }

  return (
    <div id="home" className="w-[40rem] h-auto mt-4">

      {/* title and create/Update note -->  */}
      <div id="upperBar" className="w-full h-auto flex gap-3">
        <input
          readOnly={viewOnly}
          value={noteTitle}
          className={`${viewOnly? "w-[100%]! cursor-not-allowed": ""} px-3 py-1 border-1 border-gray-500 rounded-md w-[80%] placeholder:font-light hover:bg-gray-700 focus-within:outline-blue-500 focus-within:outline-2`}
          type="text"
          placeholder="Enter Title"
          onChange={(e) => {
            setNoteTitle(e.target.value);
          }}
        />

        {/* create or update note  */}
        <button
          disabled={viewOnly}
          onClick={createUpdateNote}
          className={` ${viewOnly? "hidden": ""} px-3 py-1 border-1 w-[20%] border-gray-500 rounded-md text-black! bg-white hover:bg-gray-400`}
        >
          {noteId ? "Update Note" : "Create Note"}
        </button>
      </div>

      {/* note content box --> */}
      <div
        id="note-content-container"
        className="bg-[#0f0f0f] overflow-x-hidden w-full h-auto mt-4 border-[1.5px] border-[#333333] rounded-md placeholder:font-light"
      >
        {/* copy bar --> */}
        <div
          id="copy-bar"
          className="w-full h-[2rem] flex justify-between items-center bg-[#333333]"
        >
          <div
            id="copy-bar-balls-container"
            className="flex justify-evenly gap-[.4rem] ml-2"
          >
            <span className="size-[14px] rounded-full bg-[#ff5f57] border-1 border-transparent"></span>
            <span className="size-[14px] rounded-full bg-[#febc2e] border-1 border-transparent"></span>
            <span className="size-[14px] rounded-full bg-[#2dc842] border-1 border-transparent"></span>
          </div>

          <svg
            onClick={(e) => {
              dispatch(noteCopy(noteTitle + "\n" + noteContent));
            }}
            className="fill-white hover:fill-blue-400 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
          </svg>
        </div>

        {/* note actual content --> */}
        <textarea
          readOnly={viewOnly}
          value={noteContent}
          rows={15}
          name="noteContent"
          id="note-content"
          className={`w-full ${viewOnly ? "cursor-not-allowed" : ""} bg-[#0f0f0f] text-[.9rem] font-semibold p-2 resize-none focus:outline-none focus:ring-0 focus:border-none`}
          onChange={(e) => {
            setNoteContent(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
