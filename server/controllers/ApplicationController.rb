class ApplicationController < Sinatra::Base
	enable :sessions

	require 'bundler'
	Bundler.require

	ActiveRecord::Base.establish_connection(
		:adapter => 'postgresql',
		:database => 'moodtracker'
	)

	set :views, File.expand_path('../../views', __FILE__)
	set :public_dir, File.expand_path('../../public', __FILE__)
	set :session_secret, 'test'

	not_found do
		"Page Not Found"
	end
end
