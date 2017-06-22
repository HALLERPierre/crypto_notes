import { connect } from 'react-redux'
import { NotesList } from '../components'

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const Notes = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesList)

export default Notes
