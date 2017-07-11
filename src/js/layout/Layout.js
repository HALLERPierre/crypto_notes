import React from 'react'
import { Notes } from '../containers';

const style = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        background: "#D7737A",
        padding: "0 10%"
    },
    title: {
        color: "#302D30"
    },
    search: {
        border: "none",
        height: "24px",
        padding: "11px 0 11px 16px"
    }
}

const DefaultLayout = ({ ...props }) => (
    <div className="DefaultLayout">
        {props.children}
    </div>
);

const HeaderLayout = ({ ...props }) => (
    <header style={style.header}>
        <h1 style={style.title}>Crypto notes</h1>
        <form style={style.search} method="get">
            <input type="search" name="search" placeholder="Search" />
        </form>
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
