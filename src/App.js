import NotesList from "./components/NotesList";
import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [mnotes, setNotes] = useState([
    {
      id: nanoid(),
      text: " this is my first notes app!",
      date: "12/4/2022",
    },
    {
      id: nanoid(),
      text: " this is my second notes app!",
      date: "0/22/2022",
    },
    {
      id: nanoid(),
      text: " this is my third  notes app!",
      date: "2/7/2022",
    },

  ])

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(mnotes)
    );
  }, [mnotes]);

  const addNotes = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...mnotes, newNote]; // spread operator for copt the current array of mnotes 
    setNotes(newNotes);
  }
  const deleteNote = (id) => {
    const newNotes = mnotes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={mnotes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNotes}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
