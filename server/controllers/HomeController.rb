class HomeController < ApplicationController

	#route is /home
	get ('/') do
		erb :home
	end
	#route is /home/cal
	get '/cal' do
		if session[:logged_in]
			@username = session[:username]
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
			p session

			redirect '/home/cal'
		else
			@message = "login unsuccessful"
			erb :login
		end
	end

end
