class ListsController < ApplicationController
    before_action :authenticate_user!

    def index
      lists = current_user.lists
      render json: lists.to_json(include: [:books] )
    end
end
