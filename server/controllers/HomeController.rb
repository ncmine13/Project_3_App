class HomeController < ApplicationController

	get '/' do
		if session[:logged_in]
			@username = session[:username]
			erb :home
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

			redirect '/home'
		else
			@message = "login unsuccessful"
			erb :login
		end
	end

end
