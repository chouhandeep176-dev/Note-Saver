import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import {
  noteAdd,
  noteDelete,
  noteUpdate,
  noteView,
  noteCopy,
  noteDeleteAll,
} from "../features/noteSaver";
import { useNavigate } from 'react-router-dom';

const Notes = () => {

  // get notes from globle state object -->
  const notes = useSelector((state) => state.noteSaver.notes);
  // console.log(notes)

  // useDIspatch() -->
  const dispatch = useDispatch();

  // use navigate -->
  const navigate = useNavigate();

  // track searched term -->
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div id="notes-container" className="w-[40rem] h-auto mt-4">
      {/* serach bar part container --> */}
      <div
        id="searchbar-container"
        className="w-full h-auto flex gap-2 justify-between"
      >
        {/* search icon and search notes container -->*/}
        <div
          tabIndex={0}
          id="searchbar"
          className="w-[80%] h-auto flex gap-2 justify-between items-center px-3 py-1 border-1 border-gray-500 rounded-md transition-all duration-100 hover:bg-gray-700 focus-within:outline-blue-500 focus-within:outline-2"
        >
          {/* search icon --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="22px"
            viewBox="0 -960 960 960"
            width="22px"
            fill="#848485"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>

          {/* search notes input tag --> */}
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="w-full placeholder:font-light outline-none focus:outline-none"
            type="text"
            placeholder="Search note by title"
          />
        </div>

        {/* delete all notes button */}
        <button
          onClick={(e) => {
            dispatch(noteDeleteAll());
          }}
          className="w-[18%] px-3 py-1 bg-white text-black! font-semibold border-1 border-gray-500 rounded-md hover:bg-gray-400 transition-all duration-100"
        >
          Delete All
        </button>
      </div>

      {/* all notes container -->  */}
      <div
        id="all-notes-container"
        className="w-full min-h-[5rem] mt-4 mb-4 pb-6 border-1 border-gray-500 rounded-md flex flex-col gap-6 justify-start items-center"
      >
        {/* all notes heading --> */}
        <h1
          id="all-notes"
          className="px-4 py-3 w-full h-auto text-4xl text-left font-bold tracking-wider border-b-1 border-gray-500"
        >
          All Notes
        </h1>

        {/* dynamically rendring notes from global sate object -->  */}

        {notes
          .filter((note, i) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((note, i) => (
            <div
              key={i}
              id="note"
              className="w-[93%] h-[8rem] border-1 border-gray-500 rounded-md flex transition-all duration-100  hover:bg-gray-800 hover:scale-[1.03]"
            >
              {/* note left box --> */}
              <div
                id="note-left-box"
                className="w-[63%] h-full flex flex-col justify-start items-start p-4"
              >
                <h2
                  id="note-title"
                  className="text-left min-h-[38px] max-h-[38px] overflow-hidden text-3xl font-bold tracking-wider"
                >
                  {note.title}
                </h2>

                <p
                  id="note-content"
                  className="overflow-hidden mt-3 font-light text-[14px] text-gray-300 tracking-wide"
                >
                  {note.content}
                </p>
              </div>

              {/* note right box -->  */}
              <div
                id="note-right-box"
                className=" w-[35%] h-full flex flex-col gap-4 justify-start items-end pt-6"
              >
                {/* edit, delete, view button -->  */}
                <div
                  id="utility-btn-container"
                  className=" w-full h-[2rem] flex gap-4 justify-end items-center"
                >
                  {/* svg utility buttons -->  */}

                  {/* // edit note -->  */}
                  <svg
                    onClick={(e) => {
                      navigate("/" + note._id);
                    }}
                    className=" border-1 border-gray-500 rounded-md box-content py-[.4rem] px-[.4rem] transition-all duration-100  hover:border-1 hover:border-blue-400 hover:bg-blue-400 hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#e3e3e3"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>

                  {/* // delete note -->  */}
                  <svg
                    onClick={(e) => {
                      dispatch(noteDelete(note));
                    }}
                    className="border-1 border-gray-500 rounded-md box-content py-[.4rem] px-[.4rem] transition-all duration-100 hover:border-1 hover:border-red-400 hover:bg-red-400 hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#e3e3e3"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>

                  {/* // copy the note -->  */}
                  <svg
                    onClick={(e) => {
                      dispatch(noteCopy(note.title + "\n" + note.content));
                    }}
                    className="border-1 border-gray-500 rounded-md box-content py-[.4rem] px-[.4rem] transition-all duration-100 hover:border-1 hover:border-green-400 hover:bg-green-400 hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#e3e3e3"
                  >
                    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                  </svg>

                  {/* view the note only --> */}
                  <svg
                    onClick={(e) => {
                      navigate("/" + note._id, {
                        state: { viewOnly: true },
                      });
                    }}
                    className="border-1 border-gray-500 rounded-md box-content py-[.4rem] px-[.4rem] transition-all duration-100 hover:border-1 hover:border-purple-400 hover:bg-purple-400 hover:fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#e3e3e3"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                </div>

                {/* date and calender icon -->  */}
                <div className="w-full h-auto flex gap-2 justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#e3e3e3"
                  >
                    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
                  </svg>

                  <p className="text-end font-semibold text-[14px] text-gray-300">
                    {note.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
  
export default Notes
