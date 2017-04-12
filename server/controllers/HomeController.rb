class HomeController < ApplicationController

	#route is /home
	get ('/') do
		erb :home
	end

	get ('/users') do
		content_type :json
		@users = User.all
		@users.to_json
	end
	#route is /home/cal
	get '/cal' do
		@today = session[:today]
		@name = session[:first]
		username = session[:username]
		user = User.find_by(username: username)
		if session[:logged_in]
			theVal = user.postsubmitted
			newVal = theVal.split()
			if newVal[1] == Time.now.to_s.slice(0, 10)
				if newVal[0] == "true"
					@message = "Great job. See you tomorrow!"
					session[:daylimit] = true
					erb :cal
				else
					@button = true
					erb :cal
				end
			else
				session[:daylimit] = false
				@button = true
				erb :cal
			end
		else
			@message = "you are not logged in"
			erb :login
		end
	end

	get '/register' do
		erb :register
	end

	get '/login' do
		erb :login

	end

	get '/logout' do
		session.destroy
		redirect '/home/login'
	end

	get ('/cal') do
		erb :cal
	end

	post '/register' do
		username = params[:username]
		userExists = User.find_by(username: username)

		if userExists
			@message = "Sorry, username taken."
			erb :register
		else
			user = User.new
			user.username = params["username"]
			user.password = params["password"]
			user.first = params[:first]
			user.last = params[:last]
			time = Time.now.to_s.slice(0, 10)
			submitted = "false "
			theVal = submitted + time
			user.postsubmitted = theVal
			user.save
			redirect '/home/login'
		end
	end

	post '/login' do
		username = params[:username]
		password = params[:password]

		user = User.find_by(username: username)
		if user && user.authenticate(password)
			session[:logged_in] = true
			session[:username] = username
			session[:user_id] = user.id
			session[:postsubmitted] = user.postsubmitted
			session[:first] = user.first
			time = Time.new
			today = time.wday
			session[:today] = today
			session[:daylimit] = false

			#make sure to reset date

			p session
			redirect '/home/cal'
		else
			@message = "Login unsuccessful. Try again!"
			erb :login
		end
	end

end
