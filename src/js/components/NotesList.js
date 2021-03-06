import React from 'react';

class NotesList extends React.Component {
	componentWillMount() {
		this.props.fetchNotes();
	}

	render() {
		let list = this.props.notes.map((note, index) => (<li key={index}>{note}</li>), '');
		return (
			<ul>
				{list}
			</ul>
		);
	}
}

export default NotesList;
