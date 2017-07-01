import { NotesList } from '../components'
import { fetchNotes } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        notes: state.notes.notes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotes: () => dispatch(fetchNotes())
    }
}

const Notes = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesList)

export default Notes
