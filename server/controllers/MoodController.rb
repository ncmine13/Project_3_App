class MoodController < ApplicationController

	get ('/') do
		content_type :json
		@moods = Mood.all
		@moods.to_json
	end

	get ('/:id') do
		id = params[:id]

	end

	get ('/:user_id') do

	end

	post ('/') do

		p params
		p request.body.read
		content_type :json
		@mood = Mood.new
		@mood.word1 = params["word1"]
		@mood.word2 = params["word2"]
		@mood.word3 = params["word3"]
		@mood.worst = params["worst"]
		@mood.best = params["best"]
		@mood.worry = params["worry"]
		@mood.confidence = params[:confidence]
		@mood.satisfaction = params[:satisfaction]
		@mood.stress = params[:stress]
		@mood.sadness = params[:sadness]
		@mood.anger = params[:anger]
		@mood.happiness = params[:happiness]
		@mood.funny = params[:funny]
		@mood.thing1 = params["thing1"]
		@mood.thing2 = params["thing2"]
		@mood.thing3 = params["thing3"]
		@mood.user_id = session[:user_id]
		@mood.save
		@mood.to_json

		@user = User.find_by(id: session[:user_id])
		postsubmitted = @user.postsubmitted
		other = postsubmitted.split()
		other[0] = "true"
		other[1] = Time.now.to_s.slice(0, 10)
		newString = other*" "
		@user.postsubmitted = newString
		@user.save
		@user.to_json
	end

end
