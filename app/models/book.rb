class Book < ApplicationRecord
  belongs_to :list
  has_many :reviews, dependent: :destroy
  has_many :users, through: :lists
end
