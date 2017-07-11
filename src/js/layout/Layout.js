import React from 'react'
import { Notes } from '../containers';

const DefaultLayout = ({ ...props }) => (
    <div className="DefaultLayout">
        {props.children}
    </div>
);

const HeaderLayout = ({ ...props }) => (
    <header>
        <h1>Crypto notes</h1>
        <input type="search" placeholder="search" />
    </header>
);

const NewNoteLayout = ({ ...props }) => (
    <div>
        <textarea name="text" placeholder="Take a note..."></textarea>
        <button>Done</button>
    </div>
);

const NotesLayout = ({ component: Component, ...props }) => (
    <DefaultLayout {...props}>
        <HeaderLayout />
        <NewNoteLayout />
        <Notes />
    </DefaultLayout>
);

export default NotesLayout;
