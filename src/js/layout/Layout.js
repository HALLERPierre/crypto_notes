import React from 'react';
import { Link } from 'react-router-dom';
import { Notes } from '../containers';

const style = {
    container: {
        padding: "0 10%"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        background: "#D7737A"
    },
    title: {
        color: "#302D30",
        textDecoration: "none"
    },
    search: {
        border: "none",
        height: "24px",
        padding: "11px 0 11px 16px"
    },
    newNote: {
        background: "#e8e8e8",
        paddingTop: "1.5em",
        paddingBottom: "1em"
    },
    takeNote: {
        display: "block",
        margin: "0 auto",
        maxWidth: "35em",
        height: "1.5em",
        border: "none",
        width: "100%",
        padding: ".5em"
    },
    buttonAddNote: {
        border: "none",
        display: "block",
        margin: "1em auto 0",
        padding: ".35em 1em",
        textTransform: "uppercase",
        background: "#D7737A",
        color: "#FFFFFF",
        fontSize: "14px",
        cursor: "pointer"
    }
}

const DefaultLayout = ({ ...props }) => (
    <div className="DefaultLayout">
        {props.children}
    </div>
);

const HeaderLayout = ({ ...props }) => (
    <header style={{...style.container, ...style.header}}>
        <h1><Link to="/" style={style.title}>Crypto notes</Link></h1>
        <form style={style.search} method="get">
            <input type="search" name="search" placeholder="Search" />
        </form>
    </header>
);

const NewNoteLayout = ({ ...props }) => (
    <div style={{...style.container, ...style.newNote}}>
        <textarea style={style.takeNote} placeholder="Take a note..."></textarea>
        <button style={style.buttonAddNote}>Done</button>
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
