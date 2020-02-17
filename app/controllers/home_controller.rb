class HomeController < ApplicationController
    before_action :authenticate_user!

    def index
      render json: { msg: 'Welcome Home!' }
    end

    def profile
      user = current_user
      render_resource(user, with: [:lists, :reviews, :books])
    end

end
