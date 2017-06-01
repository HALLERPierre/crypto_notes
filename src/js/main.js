import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { noteApp } from './reducers'
import { App } from './components'

// import { Router } from 'react-router'
// import routes from './routes'
// import createHistory from 'history/createBrowserHistory'


// Port to communicate with python api. set it in conf file later
const PORT_PYTHON = 52525;
const URL = 'http://127.0.0.1:' + PORT_PYTHON;


const store = createStore(noteApp)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)




class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {connected: false, title: "", text: "", edit:"false", currentState:0};
		this.connect = this.connect.bind(this);
		this.displayNote = this.displayNote.bind(this);
		this.newNote = this.newNote.bind(this);
	}
	connect (res) {
		this.setState({connected: true});
	}
	displayNote(title) {
		let _this = this;
		loadNote(title, function(title, text) {
			let nextState = _this.state.currentState + 1;
			_this.setState({title: title, text: text, edit:"true", currentState:nextState});
		});
	}
	newNote() {
		let nextState = this.state.currentState + 1;
		this.setState({title:"", text:"", edit:"false", currentState:nextState});
	}
	render () {
		if (!this.state.connected)
			return (<Welcome name="User" onConnect={this.connect}/>)
		else {
			return (
				<div>
					<WriteNote title={this.state.title} text={this.state.text} edit={this.state.edit} currentState={this.state.currentState} />
					<button onClick={this.newNote}>New note</button>
					<ListAllNotes displayCallback={this.displayNote}/>
				</div>
			)
		}
	}
}

function Welcome(props) {
	return (
		<div className="Welcoming">
			<h1>Hello, {props.name}</h1>
			<h2>Welcome on crypto-notes !</h2>
			<label>Username </label>: <input className="text"/>
			<br/>
			<label>Password </label>: <input className="text"/>
			<h2>Click here to begin : <button onClick={() => connectToApi(props.onConnect)}>CONNECT</button></h2>
		</div>
	)
}

class WriteNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {text: props.text, title: props.title, edit: props.edit, currentState: props.currentState};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAreaChange = this.handleAreaChange.bind(this);
	}
	handleInputChange(event) {
   		this.setState({title: event.target.value});
  	}
	handleAreaChange(event) {
   		this.setState({text: event.target.value});
  	}
  	render () {
  		let titleDisable = this.props.edit === "true";
  		let refreshState = this.state.currentState != this.props.currentState;
  		if (refreshState) {
  			this.state = this.props;
  		}
  		return (
  			<div>
  				<h1>Write a note here :</h1>
  				<label>Title</label> : <input className="text" value={this.state.title} onChange={this.handleInputChange} disabled={titleDisable}/>
  				<br/>
  				<textarea id="note" value={this.state.text} rows="4" cols="50"
  					placeholder="My bitcoin wallet" onChange={this.handleAreaChange}>
  				</textarea>
  				<br/>
  				<button onClick={() => saveNote(this.state.title, this.state.text)}>SAVE</button>
  			</div>
  		)
  	}
}

class ListAllNotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {notes: [], displayCallback:props.displayCallback };
		this.componentDidMount = this.componentDidMount.bind(this);
	}
	componentDidMount() {
		let this_ = this;
	    requestApi('/api/getAllTitles', 'GET', {}, function (res) {
	    	let titles = JSON.parse(res);
	    	this_.setState({notes: titles})
	    })
	}
	render () {
		let allNotes = [];
		if (this.state.notes.length < 1){
			return (<p>"Loading"</p>);
		}
		allNotes = this.state.notes.map((title, index) => <ListNote key={index} title={title} displayCallback={this.state.displayCallback} />);
		return (
			<div className="listNotes">
				<h1>All your notes :</h1>
				<ul>{allNotes}</ul>
			</div>
		)
	}
}

function ListNote(props) {
	return (
		<li><a href="javascript:void(0)" onClick={() => props.displayCallback(props.title)}>{props.title}</a></li>
	)
}

function connectToApi(callback) {
	requestApi('/api/connect', 'GET', {}, function(res) {
		callback(res);
	});
}

function saveNote(title, note) {
	requestApi('/api/encrypt', 'POST', {title: title, note: note}, function(res) {
		alert("Note ciphered and stored");
	});
}

function loadNote(title, callback) {
	requestApi('/api/decrypt/' + title, 'GET', {}, function(res) {
		let text = res;
		callback(title, text);
	});
}

function requestApi(route, method, body, callback) {
	let url = URL + route;
	let data = {};
	let request = {
		headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
    	method: method
    };
    if (method == 'POST') {
    	request.body = JSON.stringify(body);
    }
	fetch(url, request)
	.then(function(res) {
		if (res.status !== 200) {
			console.log("Error during api call :" + route);
			return callback(res.status, "");
		}
		res.text().then(function(data) {
			callback(data);
		});
	})
	.catch(function(res) {
		console.log(res);
	});
}

// ReactDOM.render(
// 	<Main />,
// 	document.getElementById('root')
// );

// const customHistory = createHistory()
//
// ReactDOM.render(
//     	<Router history={customHistory}>
//             { routes }
//         </Router>
//     ,
// 	document.getElementById('root')
// );
