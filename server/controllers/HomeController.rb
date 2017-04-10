class HomeController < ApplicationController

	#route is /home
	# if @day_limit == true
	# 	@button = false
	# 	@message = "Great job. See you tomorrow!"
	# 	erb :cal
	# elsif @day_limit == false && user.postsubmitted.split()[0] == "true"
	# 	@button = false
	# 	@message = "Great job. See you tomorrow!"
	# 	erb :cal
	# elsif @day_limit == false && user.postsubmitted.split()[0] == "false"
	# 	@button = true
	# 	@message = ""
	# 	erb :cal
	# end

	get ('/') do
		erb :home
	end
	#route is /home/cal
	#not working at the end of the route ugh, because session object isnt updated
	get '/cal' do
		# binding.pry
		# @button = false
		# || user.postsubmitted.split()[0] == "true"
		@today = session[:today]
		username = session[:username]
		user = User.find_by(username: username)
		if session[:logged_in]
			@username = session[:username]
			@day_limit = session[:daylimit]
			theVal = user.postsubmitted
			newVal = theVal.split()
			if newVal[1] == Time.now.to_s.slice(0, 10)
				if newVal[0] == "true"
					@message = "Great job. See you tomorrow!"
					session[:daylimit] = true
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
		# binding.pry
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
		#add logic to make sure people have to make unique usernames
		username = params[:username]
		userExists = User.find_by(username: username)

		if userExists
			@message = "Sorry, username taken."
			erb :register
		else
			user = User.new
			user.username = params["username"]
			user.password = params["password"]
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
