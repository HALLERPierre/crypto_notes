import React from 'react'


class ConnectBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: ''
        }
    }

    render() {
        const updateUsername = (event) => {
            this.setState({user: event.target.value})
        }
        const updatePassword = (event) => {
            this.setState({password: event.target.value})
        }

        return (
    		<div className="Welcoming">
    			<h2>Welcome on crypto-notes !</h2>
    			<label>Username </label>: <input className="text" value={this.state.user} onChange={updateUsername}/>
    			<br/>
    			<label>Password </label>: <input className="text" value={this.state.password} onChange={updatePassword}/>
    			<h2>Click here to begin : <button onClick={this.props.connect}>CONNECT</button></h2>
    		</div>
        )
    }
}

const App = () => (
  <div>
    <ConnectBox />
  </div>
)

export {
    ConnectBox,
    App
}
