var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');


//store everything in main component states. make ajax call from here. submit on final component, which will call the ajax request in maincomponent
//clicking next set      s state
//boolean/text value stating what page you're on
var MainComponent = React.createClass({
	//organize pages into whatPage function or something like that, with each page as either boolean or string value to better organize switch statement in render
	getInitialState: function(){
		return {loggedIn: true, username: '', word1: '', word2: '', word3: '', worst: '', best: '', worry: '',
		confidence: 0, satisfaction: 0, stress: 0, sadness: 0, anger: 0, happiness: 0, funny: 0, thing1: '', thing2: '', thing3: '',
		page: ''}
	},
	//cycle through pages: first time event listener runs, make pageOne true. second time,
	firstPageInfo: function(page, word){
		var state = this.state;
		state.page = page;
		state.word1 = word.word1;
		state.word2 = word.word2;
		state.word3 = word.word3;
		this.setState(state)
	},
	worstInfo: function(page, worst){
		var state = this.state;
		state.page= page;
		state.worst = worst;
		state[worst] = worst
		this.setState(state);
	},
	bestInfo: function(page, best){
		var state = this.state;
		state.page= page;
		state.best = best;
		this.setState(state);
	},
	worryInfo: function(page, worry){
		var state = this.state;
		state.page = page;
		state.worry = worry;
		this.setState(state);
	},
	confidenceInfo: function(page, confidence){
		var state = this.state;
		state.page = page;
		state.confidence = confidence;
		this.setState(state);
	},
	satisfactionInfo: function(page, satisfaction){
		var state = this.state;
		state.page = page;
		state.satisfaction = satisfaction;
		this.setState(state);
	},
	stressInfo: function(page, stress){
		var state = this.state;
		state.page = page;
		state.stress = stress;
		this.setState(state);
	},
	sadnessInfo: function(page, sadness){
		var state = this.state;
		state.page = page;
		state.sadness = sadness;
		this.setState(state);
	},
	angerInfo: function(page, anger){
		var state = this.state;
		state.page = page;
		state.anger = anger;
		this.setState(state);
	},
	happinessInfo: function(page, happiness){
		var state = this.state;
		state.page = page;
		state.happiness = happiness;
		this.setState(state);
	},
	funnyInfo: function(page, funny){
		var state = this.state;
		state.page = page;
		state.funny = funny;
		this.setState(state);
	},
	thingInfo: function(page, thing){
		var state = this.state;
		state.page = page;
		state.thing1 = thing.thing1;
		state.thing2 = thing.thing2;
		state.thing3 = thing.thing3;
		this.setState(state);
	},
	render: function(){
		//post request with the button click will send the entries to the database
		//if page1 is false, render FirstScreen, else if page1 = true and page2 = false, render next screen
		//switch statement
		switch(this.state.page) {
			case 'pageOne':
				return (
					<SecondScreen worstInfo={this.worstInfo}/>
				)
			case 'pageTwo':
				return (
					<ThirdScreen bestInfo={this.bestInfo}/>
				)
			case 'pageThree':
				return (
					<FourthScreen worryInfo={this.worryInfo}/>
				)
			case 'pageFour':
				return (
					<FifthScreen confidenceInfo={this.confidenceInfo}/>
				)
			case 'pageFive':
				return (
					<SixthScreen satisfactionInfo={this.satisfactionInfo}/>
				)
			case 'pageSix':
				return (
					<SeventhScreen stressInfo={this.stressInfo}/>
				)
			case 'pageSeven':
				return (
					<EighthScreen sadnessInfo={this.sadnessInfo}/>
				)
			case 'pageEight':
				return (
					<NinthScreen angerInfo={this.angerInfo}/>
				)
			case 'pageNine':
				return (
					<TenthScreen happinessInfo={this.happinessInfo}/>
				)
			case 'pageTen':
				return (
					<EleventhScreen funnyInfo={this.funnyInfo}/>
				)
			case 'pageEleven':
				return (
					<TwelfthScreen thingInfo={this.thingInfo}/>
				)
			default:
				return (
					<FirstScreen firstPageInfo={this.firstPageInfo}/>
				)
		}
	}
});

var FirstScreen = React.createClass({
	getInitialState: function(){
		return {page: '', word1: '', word2: '', word3: ''}
	},
	handleWord: function(e){
		var state = this.state;
		state[e.target.name] = e.target.value
		this.setState(state);
	},
	handlePage: function(){
		state = this.state;
		state.page = 'pageOne'
		this.setState(state);
		this.props.firstPageInfo('pageOne', this.state)
		console.log(this.props)
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
		return {page: 'pageOne', worst: ''}
	},
	handleWorstInput: function(e){
		var state = this.state;
		state.worst = e.target.value;
		this.setState(state);
	},
	handleWorst: function(){
		var state = this.state;
		state.page = 'pageTwo'
		this.setState(state);
		this.props.worstInfo('pageTwo', this.state.worst)
	},
	render: function(){
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
		return {page: 'pageTwo', best: ''}
	},
	handleBestInput: function(e){
		var state = this.state;
		state.best = e.target.value;
		this.setState(state);
	},
	handleBest: function(){
		var state = this.state;
		state.page = 'pageThree'
		this.setState(state);
		this.props.bestInfo('pageThree', this.state.best)
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
		return {page: 'pageThree', worry: ''}
	},
	handleWorryInput: function(e){
		var state = this.state;
		state.worry = e.target.value;
		this.setState(state);
	},
	handleWorry: function(){
		var state = this.state;
		state.page = 'pageFour'
		this.setState(state);
		this.props.worryInfo('pageFour', this.state.worry)
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
});

var FifthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageFour', confidence: 0}
	},
	//add limitation on number of digits, i.e. make sure the number is from one to ten
	handleConfidenceInput: function(e){
		var state = this.state;
		state.confidence = e.target.value;
		this.setState(state);
	},
	handleConfidence: function(){
		var state = this.state;
		state.page = 'pageFive'
		this.setState(state);
		this.props.confidenceInfo('pageFive', this.state.confidence)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how confident do you feel?</h1>
				<input type="number" onChange={this.handleConfidenceInput} name="confidence" value={this.state.condfidence}/>
				<button onClick={this.handleConfidence}>Next</button>
			</div>
		)
	}
})

var SixthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageFive', satisfaction: 0}
	},
	//add limitation on number of digits, i.e. make sure the number is from one to ten
	handleSatisfactionInput: function(e){
		var state = this.state;
		state.satisfaction = e.target.value;
		this.setState(state);
	},
	handleSatisfaction: function(){
		var state = this.state;
		state.page = 'pageSix'
		this.setState(state);
		this.props.satisfactionInfo('pageSix', this.state.satisfaction)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how satisfied do you feel?</h1>
				<input type="number" onChange={this.handleSatisfactionInput} name="satisfaction" value={this.state.satisfaction}/>
				<button onClick={this.handleSatisfaction}>Next</button>
			</div>
		)
	}
})

var SeventhScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageSix', stress: 0}
	},
	//add limitation on number of digits, i.e. make sure the number is from one to ten
	handleStressInput: function(e){
		var state = this.state;
		state.stress = e.target.value;
		this.setState(state);
	},
	handleStress: function(){
		var state = this.state;
		state.page = 'pageSeven'
		this.setState(state);
		this.props.stressInfo('pageSeven', this.state.stress)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how stressed out do you feel?</h1>
				<input type="number" onChange={this.handleStressInput} name="stress" value={this.state.stress}/>
				<button onClick={this.handleStress}>Next</button>
			</div>
		)
	}
})

var EighthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageSeven', sadness: 0}
	},
	handleSadnessInput: function(e){
		var state = this.state;
		state.sadness = e.target.value;
		this.setState(state);
	},
	handleSadness: function(){
		var state = this.state;
		state.page = 'pageEight'
		this.setState(state);
		this.props.sadnessInfo('pageEight', this.state.sadness)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how sad do you feel?</h1>
				<input type="number" onChange={this.handleSadnessInput} name="sadness" value={this.state.sadness}/>
				<button onClick={this.handleSadness}>Next</button>
			</div>
		)
	}
})

var NinthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageEight', anger: 0}
	},
	handleAngerInput: function(e){
		var state = this.state;
		state.anger = e.target.value;
		this.setState(state);
	},
	handleAnger: function(){
		var state = this.state;
		state.page = 'pageNine'
		this.setState(state);
		this.props.angerInfo('pageNine', this.state.anger)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how angry do you feel?</h1>
				<input type="number" onChange={this.handleAngerInput} name="anger" value={this.state.anger}/>
				<button onClick={this.handleAnger}>Next</button>
			</div>
		)
	}
})

var TenthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageNine', happiness: 0}
	},
	handleHappinessInput: function(e){
		var state = this.state;
		state.happiness = e.target.value;
		this.setState(state);
	},
	handleHappiness: function(){
		var state = this.state;
		state.page = 'pageTen'
		this.setState(state);
		this.props.happinessInfo('pageTen', this.state.happiness)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how happy do you feel?</h1>
				<input type="number" onChange={this.handleHappinessInput} name="happiness" value={this.state.happiness}/>
				<button onClick={this.handleHappiness}>Next</button>
			</div>
		)
	}
})

var EleventhScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageTen', funny: 0}
	},
	handleFunnyInput: function(e){
		var state = this.state;
		state.funny = e.target.value;
		this.setState(state);
	},
	handleFunny: function(){
		var state = this.state;
		state.page = 'pageEleven'
		this.setState(state);
		this.props.funnyInfo('pageEleven', this.state.funny)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how funny do you feel?</h1>
				<input type="number" onChange={this.handleFunnyInput} name="funny" value={this.state.funny}/>
				<button onClick={this.handleFunny}>Next</button>
			</div>
		)
	}
})

var TwelfthScreen = React.createClass({
	getInitialState: function() {
		return {page: 'pageEleven', thing1: '', thing2: '', thing3: ''}
	},
	handleThingInput: function(e){
		var state = this.state;
		state[e.target.name] = e.target.value
		this.setState(state);
	},
	handleThing: function(){
		var state = this.state;
		state.page = 'pageTwelve'
		this.setState(state);
		this.props.thingInfo('pageTwelve', this.state)
	},
	render: function(){
		return (
			<div>
				<h1>
					Write three things you like about yourself.
				</h1>
					<input onChange={this.handleThingInput} name="thing1" type="text" value={this.state.thing1}/>
					<input onChange={this.handleThingInput} name="thing2" type="text" value={this.state.thing2}/>
					<input onChange={this.handleThingInput} name="thing3" type="text" value={this.state.thing3}/>
					<button onClick={this.handleThing}>Next</button>
			</div>
		)
	}
})


ReactDOM.render(<MainComponent/>, document.getElementById('container'));
