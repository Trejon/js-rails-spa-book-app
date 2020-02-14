class HomeController < ApplicationController
    # before_action :authenticate_user!

    def index
      render json: { msg: 'Welcome Home!' }
    end

end
