class ApplicationController < Sinatra::Base
	require 'bundler'
	Bundler.require

	ActiveRecord::Base.establish_connection(
		:adapter => 'postgresql',
		:database => ''
	)

	not_found do
		"Page Not Found"
	end
end
