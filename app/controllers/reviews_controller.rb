class ReviewsController < ApplicationController
    before_action :authenticate_user!

    def index
        reviews = Review.all
        render json: reviews, include: [:book]
    end

    def show
        review = Review.find(params[:id])
        authorize_user_resource(review)
        render_resource(review, with: [:book])
    end

    def create
        review = Review.new(review_params)
        review.user = current_user
        review.save
        render_resource(review)
    end

    def update
        review = Review.find(params[:id])
        authorize_user_resource(review)
        review.update(review_params)
        render_resource(review)
    end

    def destroy
        review = Review.find(params[:id])
        authorize_user_resource(review)
        review.destory
        render_resource(review)
    end

  private

    def review_params
        params.require(:review).permit(:rating, :content, :date, :book_id, :book)
    end
end
