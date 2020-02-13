class HomeController < ApplicationController
    before_action :authenticate_owner!

    def index
      render json: { msg: 'Welcome Home!' }
    end

end
