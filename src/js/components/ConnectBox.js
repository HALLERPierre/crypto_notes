import React from 'react'
import PropTypes from 'prop-types'

class ConnectBox extends React.Component {

    static propTypes = {
        disabled: PropTypes.bool,
        connect: PropTypes.func.isRequired,
    }

    static defaultProps = {
        disabled: false,
    }

    state = {
        user: '',
        password: '',
    }

    handleConnect = () => {
        this.props.connect(this.state.user, this.state.password);
    }

    updateUsername = (event) => {
        this.setState({ user: event.target.value });
    }

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className="Welcoming">
                <h2>Welcome on crypto-notes !</h2>
                <label>Username </label>: <input className="text" value={this.state.user} onChange={this.updateUsername} />
                <br />
                <label>Password </label>: <input className="text" value={this.state.password} onChange={this.updatePassword} />
                <h2>Click here to begin : <button disabled={this.props.disabled} onClick={this.handleConnect}>CONNECT</button></h2>
            </div>
        );
    }
}

export default ConnectBox;