# Load the Rails application.
require_relative 'application'

# set timezone to universal
ENV['TZ'] = 'utc'

# Initialize the Rails application.
Rails.application.initialize!
