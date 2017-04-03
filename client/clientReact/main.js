var React = require('react')
var ReactDOM = require('react-dom')
var request = require('superagent')

//store everything in main component states. make ajax call from here. submit on final component, which will call the ajax request in maincomponent
//clicking next set      s state
//boolean/text value stating what page you're on
var MainComponent = React.createClass({
	//organize pages into whatPage function or something like that, with each page as either boolean or string value to better organize switch statement in render
	getInitialState: function(){
		return {loggedIn: true, page1: false, username: '', word1: '', word2: '', word3: '', worst: '', best: '', worry: '', confidence: 0,
		satisfaction: 0, stress: 0, sadness: 0, anger: 0, happiness: 0, funny: 0, thing1: '', thing2: '', thing3: ''}
	},
	firstPageInfo: function(pageInfo, word){
		var state = this.state;
		state.page1 = pageInfo;
		state.word1 = word.word1;
		state.word2 = word.word2;
		state.word3 = word.word3;
		this.setState(state)
	},
	handlePage: function(){
		//if page is this, change it to this. if it's this, make it this.
	},
	render: function(){
		//post request with the button click will send the entries to the database
		//if page1 is false, render FirstScreen, else if page1 = true and page2 = false, render next screen
		var page1 = this.state.page1;
			if (page1) {
				return (
					<SecondScreen />
				)
			} else {
				return (
					<div>
						<FirstScreen firstPageInfo={this.firstPageInfo}/>
					</div>
				)
			}
	}
});

var FirstScreen = React.createClass({
	getInitialState: function(){
		return {word1: '', word2: '', word3: ''}
	},
	handleWord: function(e){
		var state = this.state;
		state[e.target.name] = e.target.value
		this.setState(state);
	},
	handlePage: function(){
		console.log(this.props)
		this.props.firstPageInfo(true, this.state)
	},
	render: function(){
		//switch statement
		return (
			<div>
				<h1>
					What are three words to describe how you're feeling today?
				</h1>
					<input onChange={this.handleWord} name="word1" type="text" value={this.state.word1}/>
					<input onChange={this.handleWord} name="word2" type="text" value={this.state.word2}/>
					<input onChange={this.handleWord} name="word3" type="text" value={this.state.word3}/>
					<button onClick={this.handlePage}>Next</button>
			</div>
		)
	}
});

var SecondScreen = React.createClass({
	getInitialState: function(){
		return {worst: ''}
	},
	render: function(){
		console.log(this.props)
		return (
			<div>
				<h1>What bummed you out today?</h1>
			</div>
		)
	}
})

ReactDOM.render(<MainComponent/>, document.getElementById('container'));
