import React from 'react'
import { Notes } from '../containers';

const DefaultLayout = ({ ...props }) => (
    <div className="DefaultLayout">
        <header>Header</header>
        {props.children}
        <footer>Footer</footer>
    </div>
);

const NotesLayout = ({ component: Component, ...props }) => (
    <DefaultLayout {...props}>
        <Notes />
    </DefaultLayout>
);

export default NotesLayout;
