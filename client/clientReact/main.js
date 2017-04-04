var React = require('react')
var ReactDOM = require('react-dom')
var request = require('superagent')

//store everything in main component states. make ajax call from here. submit on final component, which will call the ajax request in maincomponent
//clicking next set      s state
//boolean/text value stating what page you're on
var MainComponent = React.createClass({
	//organize pages into whatPage function or something like that, with each page as either boolean or string value to better organize switch statement in render
	getInitialState: function(){
		return {loggedIn: true, username: '', word1: '', word2: '', word3: '', worst: '', best: '', worry: '',
		confidence: 0, satisfaction: 0, stress: 0, sadness: 0, anger: 0, happiness: 0, funny: 0, thing1: '', thing2: '', thing3: '',
		page: {pageOne: false, pageTwo: false, pageThree: false, pageFour: false, pageFive: false, pageSix: false, pageSeven: false, pageEight: false, pageNine: false, pageTen: false, pageEleven: false, pageTwelve: false, pageThirteen: false}}
	},
	//cycle through pages: first time event listener runs, make pageOne true. second time,
	firstPageInfo: function(pageOne, word){
		var state = this.state;
		state.page.pageOne = pageOne;
		state.word1 = word.word1;
		state.word2 = word.word2;
		state.word3 = word.word3;
		this.setState(state)
	},
	worstInfo: function(pageTwo, worst){
		var state = this.state;
		state.page.pageOne = false;
		state.page.pageTwo = pageTwo;
		state.worst = worst;
		this.setState(state);
	},
	bestInfo: function(pageThree, best){
		var state = this.state;
		state.page.pageTwo = false;
		state.page.pageThree = pageThree;
		state.best = best;
		this.setState(state);
	},
	worryInfo: function(){

	},
	render: function(){
		//post request with the button click will send the entries to the database
		//if page1 is false, render FirstScreen, else if page1 = true and page2 = false, render next screen
		//switch statement
		var page = this.state.page;
		if (page.pageOne) {
			return (
				<SecondScreen worstInfo={this.worstInfo}/>
			)
		} else if (page.pageTwo) {
			return (
				<ThirdScreen bestInfo={this.bestInfo}/>
			)
		} else if (page.pageThree) {
			return (
				<FourthScreen worryInfo={this.worryInfo}/>
			)
		} else {
			return (
				<FirstScreen firstPageInfo={this.firstPageInfo}/>
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
	handleWorstInput: function(e){
		var state = this.state;
		state.worst = e.target.value;
		this.setState(state);
	},
	handleWorst: function(){
		console.log(this.props)
		this.props.worstInfo(true, this.state.worst)
	},
	render: function(){
		console.log(this.props)
		return (
			<div>
				<h1>What bummed you out today?</h1>
				<input onChange={this.handleWorstInput} name="worst" value={this.state.worst}/>
				<button onClick={this.handleWorst}>Next</button>
			</div>
		)
	}
});

var ThirdScreen = React.createClass({
	getInitialState: function(){
		return {best: ''}
	},
	handleBestInput: function(e){
		var state = this.state;
		state.best = e.target.value;
		this.setState(state);
	},
	handleBest: function(){
		console.log(this.props);
		this.props.bestInfo(true, this.state.best)
	},
	render: function(){
		console.log(this.props)
		return (
			<div>
				<h1> Describe the best thing that happened to you today. </h1>
				<input onChange={this.handleBestInput} name="best" value={this.state.best}/>
				<button onClick={this.handleBest}>Next</button>
			</div>
		)
	}
});

var FourthScreen = React.createClass({
	getInitialState: function(){
		return {worry: ''}
	},
	handleWorryInput: function(e){
		var state = this.state;
		state.worry = e.target.value;
		this.setState(state);
	},
	handleWorry: function(){
		this.props.worryInfo(true, this.state.worry)
	},
	render: function(){
		return (
			<div>
				<h1>What is one thing you’re worried about? </h1>
				<input onChange={this.handleWorryInput} name="worry" value={this.state.worry}/>
				<button onClick={this.handleWorry}>Next</button>
			</div>
		)
	}

})

ReactDOM.render(<MainComponent/>, document.getElementById('container'));
