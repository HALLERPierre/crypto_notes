import React from 'react';
import ReactDOM from 'react-dom';

// Port to communicate with python api. set it in conf file later
const PORT_PYTHON = 52525;
const URL = 'http://127.0.0.1:' + PORT_PYTHON;



function Welcome(props) {
	return (
		<div className="Welcoming">
			<h1>Hello, {props.name}</h1>
			<h2>Welcome on crypto-notes !</h2>
			<label>Username </label>: <input className="text"/>
			<br/> 
			<label>Password </label>: <input className="text"/>
			<h2>Click here to begin : <button onClick={connectToApi}>CONNECT</button></h2>
		</div>
	)
}

class WriteNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAreaChange = this.handleAreaChange.bind(this);
	}
	handleInputChange(event) {
   		this.setState({valueInput: event.target.value});
  	}
	handleAreaChange(event) {
   		this.setState({valueArea: event.target.value});
  	}
  	render () {
  		return (
  			<div>
  				<h1>Write a note here :</h1>
  				<label>Title</label> : <input className="text" onChange={this.handleInputChange}/><br/>
  				<textarea id="note" rows="4" cols="50" placeholder="My bitcoin wallet" onChange={this.handleAreaChange}></textarea>
  				<br/>
  				<button onClick={() => saveNote(this.state.valueInput, this.state.valueArea)}>SAVE</button>
  				<br/>
  				<br/>
  				<button onClick={seeAllNotes}>See my notes</button>
  			</div>
  		)
  	}
}

class ListAllNotes extends React.Component {
	constructor(props) {
		super(props);
	}
	render () {
		let allNotes = [];
		allNotes = this.props.notes.map((title, index) => <ListNote key={index} title={title}/>);
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
		<li><a href="javascript:void(0)" onClick={() => showNote(props.title)}>{props.title}</a></li>
	)
}

function connectToApi() {
	requestApi('/api/connect', 'GET', {}, function(res) {
		ReactDOM.render(
			<WriteNote name="User"/>,
			document.getElementById('root')
		);
	});
}

function saveNote(title, note) {
	requestApi('/api/encrypt', 'POST', {title: title, note: note}, function(res) {
		alert("Note ciphered and stored");
	});
}

function seeAllNotes() {
	requestApi('/api/getAllTitles', 'GET', {}, function (res) {
		let titles = JSON.parse(res);
		ReactDOM.render(
			<ListAllNotes notes={titles} />,
			document.getElementById('root')
		);
	})
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

ReactDOM.render(
	<Welcome name="User"/>,
	document.getElementById('root')
);