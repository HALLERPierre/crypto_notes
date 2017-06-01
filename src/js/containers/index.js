import { connect } from 'react-redux'
import { login } from '../actions'
import { ConnectBox } from '../components'

const mapStateToProps = (state) => {
    return {
        name: state.user.username,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        connect: (username, password) => {
            dispatch(login(username, password))
        }
    }
}

const UserCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectBox)

export {
    UserCard
}
