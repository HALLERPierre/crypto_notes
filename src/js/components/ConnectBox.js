import React from 'react'
import PropTypes from 'prop-types'

const style = {
    loginPage: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        background: '#D7737A'
    },
    form: {
        background: '#FFFFFF',
        width: '360px',
        margin: 'auto',
        padding: '45px',
        textAlign: 'center',
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
    },
    input: {
        width: '100%',
        margin: '0 0 15px',
        padding: '15px',
        border: '0',
        background: '#f2f2f2',
        boxSizing: 'border-box',
        fontSize: '14px'
    },
    button: {
        width: '100%',
        textTransform: 'uppercase',
        outline: '0',
        background: '#D7737A',
        border: '0',
        padding: '15px',
        color: '#FFFFFF',
        transition: 'all 0.3 ease',
        fontSize: '14px',
        cursor: 'pointer'
    },
    title: {
        color: '#302D30'
    }
};

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
            <div style={style.loginPage}>
                <div style={style.form}>
                    <form>
                        <h1 style={style.title}>Crypto notes</h1>
                        <input style={style.input} type="text" placeholder="username" value={this.state.user} onChange={this.updateUsername} required />
                        <input style={style.input} type="password" placeholder="password" value={this.state.password} onChange={this.updatePassword} required />
                        <button style={style.button} disabled={this.props.disabled} onClick={this.handleConnect}>login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ConnectBox;