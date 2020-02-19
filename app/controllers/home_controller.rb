class Api::V1::HomeController < ApplicationController
    before_action :authenticate_user!

    def index
      render json: { msg: 'Welcome Home!' }
    end

    def profile
      user = current_user
      render_resource(user, with: [:lists, :reviews, :books])
    end

    def books
      user = current_user
      books = user.books
      render_resource(books, with: [:reviews])
    end

end
