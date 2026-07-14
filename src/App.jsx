<link rel="stylesheet" href="src\globle.css"></link>;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ import toast

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Notes from "./components/Notes";
import ViewNote from "./components/ViewNote";

const router = createBrowserRouter([
  // home page -->
  {
    path: "/",
    element: (
      <div className="w-full max-w-[60rem] px-4 mt-[2rem]">
        <Navbar />
        <Home />
      </div>
    ),
  },

  {
    path: "/:noteId",
    element: (
      <div className="w-full max-w-[60rem] px-4 mt-[2rem]">
        <Navbar />
        <Home />
      </div>
    ),
  },

  // all notes -->
  {
    path: "/notes",
    element: (
      <div className="w-full max-w-[60rem] px-4 mt-[2rem]">
        <Navbar />
        <Notes />
      </div>
    ),
  },

  // editing a particuler page -->
  {
    path: "/notes/:noteId",
    element: (
      <div className="w-full max-w-[60rem] px-4 mt-[2rem]">
        <Navbar />
        <ViewNote />
      </div>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" /> {/* ✅ Add this */}
    </>
  );
};


export default App;
