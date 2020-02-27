class ListsController < ApplicationController
    before_action :authenticate_user!

    def index
        lists = current_user.lists
        render json: lists.to_json(include: [:books] )
    end

    def show
        list = current_user.lists.find(params[:id])
        authorize_user_resource(list)
        render_resource(list, with: [:books])
    end

    def create
        list = List.new(list_params)
        list.user = current_user
        list.save
        render_resource(list)
    end

    def update
        list = List.find(params[:id])
        authorize_user_resource(list)
        list.update(list_params)
        render_resource(list)
    end

    def destroy
        list = List.find(params[:id])
        authorize_user_resource(list)
        list.destroy
        render_resource(list)
    end

  private

    def list_params
        params.require(:list).permit(:name, :description)
    end
end
