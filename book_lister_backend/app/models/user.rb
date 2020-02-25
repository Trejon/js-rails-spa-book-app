class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  has_many :lists, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :books, through: :reviews

  validates :name, presence: true
  validates :email, presence: true

  devise :database_authenticatable,
          :jwt_authenticatable,
          :registerable,
          jwt_revocation_strategy: JwtBlacklist
end
