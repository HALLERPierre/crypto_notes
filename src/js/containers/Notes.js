import { NotesList } from '../components'
import { connect } from 'react-redux'

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
