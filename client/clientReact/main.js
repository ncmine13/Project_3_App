var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');

var MainComponent = React.createClass({

	getInitialState: function(){
		return {loggedIn: true, username: '', word1: '', word2: '', word3: '', worst: '', best: '', worry: '',
		confidence: 0, satisfaction: 0, stress: 0, sadness: 0, anger: 0, happiness: 0, playful: 0, thing1: '', thing2: '', thing3: '',
		page: '', finished: false}
	},
	firstPageInfo: function(page, word){
		var state = this.state;
		state.page = page;
		state.word1 = word.word1;
		state.word2 = word.word2;
		state.word3 = word.word3;
		this.setState(state)
	},
	mostInfo: function(page, prop){
		var state = this.state;
		var key = Object.keys(prop)[0]
		state[key] = prop[key];
		state.page = page;
		this.setState(state);
	},
	thingInfo: function(page, thing){
		var state = this.state;
		state.page = page;
		state.thing1 = thing.thing1;
		state.thing2 = thing.thing2;
		state.thing3 = thing.thing3;
		state.finished = true
		this.setState(state);
	},
	postInformation: function(){
		var state = this.state;
		var self = this;
		$('.checkIn').addClass('hidden')
		request.post('/mood')
		.type('form')
		.send(self.state)
		.end(function(err, data){
			console.log(data.body)
			window.location = '/home/cal'
		})

	},
	componentWillUpdate: function(){
		console.log(this.state.finished, ' state .finished')
		this.state.finished ? this.postInformation() : false
	},
	render: function(){
		console.log(this.state)

		switch(this.state.page) {
			case 'pageOne':
				return (
					<SecondScreen mostInfo={this.mostInfo}/>
				)
			case 'pageTwo':
				return (
					<ThirdScreen mostInfo={this.mostInfo}/>
				)
			case 'pageThree':
				return (
					<FourthScreen mostInfo={this.mostInfo}/>
				)
			case 'pageFour':
				return (
					<FifthScreen mostInfo={this.mostInfo}/>
				)
			case 'pageFive':
				return (
					<SixthScreen mostInfo={this.mostInfo}/>
				)
			case 'pageSix':
				return (
					<SeventhScreen mostInfo={this.mostInfo}/>
				)
			case 'pageSeven':
				return (
					<EighthScreen mostInfo={this.mostInfo}/>
				)
			case 'pageEight':
				return (
					<NinthScreen mostInfo={this.mostInfo}/>
				)
			case 'pageNine':
				return (
					<TenthScreen mostInfo={this.mostInfo}/>
				)
			case 'pageTen':
				return (
					<EleventhScreen mostInfo={this.mostInfo}/>
				)
			case 'pageEleven':
				return (
					<TwelfthScreen thingInfo={this.thingInfo}/>
				)
			default:
				return (
					<div>
						<FirstScreen />
						<ButtonComponent firstPageInfo={this.firstPageInfo}/>
					</div>
				)
		}
	}
});

var ButtonComponent = React.createClass({
	getInitialState: function(){
		return {page: ''}
	},
	handlePage: function(){
		// console.log("clicckkkee")
		state = this.state;
		state.page = 'pageOne'
		this.setState(state);
		this.props.firstPageInfo('pageOne', this.state)
		console.log(this.props)
	},
	render: function(){
		return (
			<div className="nextDiv"><button className="next" onClick={this.handlePage}>Next</button></div>
		)
	}
})


var FirstScreen = React.createClass({
	getInitialState: function(){
		return {page: '', word1: '', word2: '', word3: ''}
	},
	handleWord: function(e){
		var state = this.state;
		state[e.target.name] = e.target.value
		this.setState(state);
	},
	render: function(){
		return (
			<div>
				<div className="testing">
					<h1>
						What are three words to describe how you're feeling today?
					</h1>
				</div>
				<div className="threeWords">
					<input className="word" onChange={this.handleWord} name="word1" type="text" value={this.state.word1}/>
					<br/>
					<input className="word" onChange={this.handleWord} name="word2" type="text" value={this.state.word2}/>
					<br/>
					<input className="word" onChange={this.handleWord} name="word3" type="text" value={this.state.word3}/>
					<br/>
				</div>
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
		state[e.target.name] = e.target.value;
		this.setState(state);
	},
	handleWorst: function(){
		var obj = {worst: this.state.worst}
		this.props.mostInfo('pageTwo', obj)
	},
	render: function(){
		return (

			<div>
				<div>
					<h1>What bummed you out today?</h1>
					<input className="shortAnswer" onChange={this.handleWorstInput} name="worst" value={this.state.worst}/>
					<div className="nextDiv"><button className="next" onClick={this.handleWorst} name="worst">Next</button></div>
				</div>
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
		var obj = {best: this.state.best}
		this.props.mostInfo('pageThree', obj)
	},
	render: function(){
		return (
			<div>
				<div>
					<h1> Describe the best thing that happened to you today. </h1>
					<input className="shortAnswer" onChange={this.handleBestInput} name="best" value={this.state.best}/>
					<div className="nextDiv"><button className="next" onClick={this.handleBest}>Next</button></div>
				</div>
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
		var obj = {worry: this.state.worry}
		this.props.mostInfo('pageFour', obj)
	},
	render: function(){
		return (
			<div>
				<div>
					<h1>What is one thing you’re worried about? </h1>
					<input className="shortAnswer" onChange={this.handleWorryInput} name="worry" value={this.state.worry}/>
					<div className="nextDiv"><button className="next" onClick={this.handleWorry}>Next</button></div>
				</div>
			</div>
		)
	}
});

var FifthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageFour', confidence: 0}
	},
	handleConfidenceInput: function(e){
		var state = this.state;
		state.confidence = e.target.value;
		this.setState(state);
	},
	handleConfidence: function(){
		var obj = {confidence: this.state.confidence}
		this.props.mostInfo('pageFive', obj)
	},
	render: function(){
		return (
			<div>
				<div>
					<h1>On a scale of 1 to 10, how confident do you feel?</h1>
					<input className="number" type="number" onChange={this.handleConfidenceInput} name="confidence" value={this.state.condfidence}/>
					<div className="nextDiv"><button className="next" onClick={this.handleConfidence}>Next</button></div>
				</div>
			</div>
		)
	}
})

var SixthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageFive', satisfaction: ''}
	},
	//add limitation on number of digits, i.e. make sure the number is from one to ten
	handleSatisfactionInput: function(e){
		var state = this.state;
		state.satisfaction = e.target.value;
		this.setState(state);
	},
	handleSatisfaction: function(){
		var obj = {satisfaction: this.state.satisfaction}
		this.props.mostInfo('pageSix', obj)
	},
	render: function(){
		return (
			<div>
				<div>
					<h1>On a scale of 1 to 10, how satisfied do you feel?</h1>
					<input className="number" type="number" onChange={this.handleSatisfactionInput} name="satisfaction" value={this.state.satisfaction}/>
					<div className="nextDiv"><button className="next" onClick={this.handleSatisfaction}>Next</button></div>
				</div>
			</div>
		)
	}
})

var SeventhScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageSix', stress: ''}
	},
	//add limitation on number of digits, i.e. make sure the number is from one to ten
	handleStressInput: function(e){
		var state = this.state;
		state.stress = e.target.value;
		this.setState(state);
	},
	handleStress: function(){
		var obj = {stress: this.state.stress}
		this.props.mostInfo('pageSeven', obj)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how stressed out do you feel?</h1>
				<input className="number" type="number" onChange={this.handleStressInput} name="stress" value={this.state.stress}/>
				<div className="nextDiv"><button className="next" onClick={this.handleStress}>Next</button></div>
			</div>
		)
	}
})

var EighthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageSeven', sadness: ''}
	},
	handleSadnessInput: function(e){
		var state = this.state;
		state.sadness = e.target.value;
		this.setState(state);
	},
	handleSadness: function(){
		var obj = {sadness: this.state.sadness}
		this.props.mostInfo('pageEight', obj)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how sad do you feel?</h1>
				<input className="number" type="number" onChange={this.handleSadnessInput} name="sadness" value={this.state.sadness}/>
				<div className="nextDiv"><button className="next" onClick={this.handleSadness}>Next</button></div>
			</div>
		)
	}
})

var NinthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageEight', anger: ''}
	},
	handleAngerInput: function(e){
		var state = this.state;
		state.anger = e.target.value;
		this.setState(state);
	},
	handleAnger: function(){
		var obj = {anger: this.state.anger}
		this.props.mostInfo('pageNine', obj)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how angry do you feel?</h1>
				<input className="number" type="number" onChange={this.handleAngerInput} name="anger" value={this.state.anger}/>
				<div className="nextDiv"><button className="next" onClick={this.handleAnger}>Next</button></div>
			</div>
		)
	}
})

var TenthScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageNine', happiness: ''}
	},
	handleHappinessInput: function(e){
		var state = this.state;
		state.happiness = e.target.value;
		this.setState(state);
	},
	handleHappiness: function(){
		var obj = {happiness: this.state.happiness}
		this.props.mostInfo('pageTen', obj)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how happy do you feel?</h1>
				<input className="number" type="number" onChange={this.handleHappinessInput} name="happiness" value={this.state.happiness}/>
				<div className="nextDiv"><button className="next" onClick={this.handleHappiness}>Next</button></div>
			</div>
		)
	}
})

var EleventhScreen = React.createClass({
	getInitialState: function(){
		return {page: 'pageTen', playful: ''}
	},
	handlePlayfulInput: function(e){
		var state = this.state;
		state.playful = e.target.value;
		this.setState(state);
	},
	handlePlayful: function(){
		var obj = {playful: this.state.playful}
		this.props.mostInfo('pageEleven', obj)
	},
	render: function(){
		return (
			<div>
				<h1>On a scale of 1 to 10, how playful do you feel?</h1>
				<input className="number" type="number" onChange={this.handlePlayfulInput} name="playful" value={this.state.playful}/>
				<div className="nextDiv"><button className="next" onClick={this.handlePlayful}>Next</button></div>
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
					<input className="thing" onChange={this.handleThingInput} name="thing1" type="text" value={this.state.thing1}/>
					<input className="thing" onChange={this.handleThingInput} name="thing2" type="text" value={this.state.thing2}/>
					<input className="thing" onChange={this.handleThingInput} name="thing3" type="text" value={this.state.thing3}/>
					<div><button className="submit" onClick={this.handleThing}>Submit.</button></div>
			</div>
		)
	}
})


ReactDOM.render(<MainComponent/>, document.getElementById('container'));
