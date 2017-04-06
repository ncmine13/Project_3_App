class HomeController < ApplicationController

	#route is /home
	get ('/') do
		erb :home
	end
	#route is /home/cal
	get '/cal' do
		if session[:logged_in]
			@username = session[:username]
			@day_limit = session[:daylimit]
			erb :cal

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
		#add logic to make sure people have to make unique usernames
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

	post '/login' do
		username = params[:username]
		password = params[:password]

		user = User.find_by(username: username)
		if user && user.authenticate(password)
			session[:logged_in] = true
			session[:username] = username
			session[:user_id] = user.id
			session[:postsubmitted] = user.postsubmitted

			theVal = user.postsubmitted
			newVal = theVal.split()
			if newVal[1] == Time.now.to_s.slice(0, 10)
				if newVal[0] == "true"
					#hide dat button!
					@message = "thanks for completing the thing"
					session[:daylimit] = true
				end
			else
				session[:daylimit] = false
			end
			p session
			redirect '/home/cal'
		else
			@message = "login unsuccessful"
			erb :login
		end
	end

end
