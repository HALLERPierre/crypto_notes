import React from 'react'

class NotesList extends React.Component {
	componentWillMount() {
		this.props.fetchNotes()
	}
	render() {
		let list = this.props.notes.map((note) => (<li>{note}</li>))
		return (
			<ul>
				{list}
			</ul>
		)
	}
}

export default NotesList
