require 'sinatra/base'

require './controllers/ApplicationController'
require './controllers/HomeController'
require './controllers/MoodController'

require './models/UserModel'
require './models/MoodModel'

map('/') {run ApplicationController}
map('/home') {run HomeController}
map('/mood') {run MoodController}
