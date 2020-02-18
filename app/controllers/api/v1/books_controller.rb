class Api::V1::BooksController < ApplicationController
  before_action :authenticate_user!

    def index
        books = current_user.books
        render json: books.to_json(include: [:reviews] )
    end

    def show
        book = Book.find(params[:id])
        authorize_user_resource(book)
        render_resource(book, with: [:reviews])
    end

    def create
        book = Book.new(book_params)
        book.user = current_user
        book.save
        render_resource(book)
    end

    def update
        book = Book.find(params[:id])
        authorize_user_resource(book)
        book.update(book_params)
        render_resource(book)
    end

    def destroy
        book = Book.find(params[:id])
        authorize_user_resource(book)
        book.destory
        render_resource(book)
    end

  private

    def book_params
        params.require(:book).permit(:title, :author, :genre, :description, :page_count, :list, :reviews)
    end
end