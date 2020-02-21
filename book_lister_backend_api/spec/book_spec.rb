# # signup_spec
# require 'rails_helper'
#
# RSpec.describe 'GET /books', type: :request do
#
#     let(:user) { Fabricate(:user) }
#     let(:user2) { Fabricate(:user) }
#     let(:url) { '/login' }
#     let(:params) do
#       {
#         user: {
#           email: user.email,
#           password: user.password
#         }
#       }
#   end
#   let(:params2) do
#     {
#       user: {
#         email: user2.email,
#         password: user2.password
#       }
#     }
#   end
#
#
#   context 'you must be authorized to perform any crud on books' do
#     it "doesn't allow any unathorized requests to the books controller" do
#       get '/books'
#       expect(response.status).to eq 401
#       get '/books/1'
#       expect(response.status).to eq 401
#       post '/books', params: { book: {name: 'DNE', description: "none"}}
#       expect(response.status).to eq 401
#       patch '/books/1', params: { book: {name: 'DNE'}}
#       expect(response.status).to eq 401
#       delete '/books/1'
#       expect(response.status).to eq 401
#     end
#
#   end
#
#   context 'authenticated users can only create/update their resources' do
#     let(:booksURL) { '/books' }
#     before do
#
#       post '/login', params: params
#       @token = response.headers['Authorization']
#       post '/login', params: params2
#       @token2 = response.headers['Authorization']
#     end
#
#     it 'returns a 404 for unfound books' do
#       get '/books/1000', headers: { Authorization: @token}
#       expect(response.status).to eq 404
#     end
#
#     it 'allows an user to view only their own books' do
#       get booksURL, headers: { Authorization: @token }
#       body1 = JSON.parse(response.body)
#       #puts body1
#       expect(body1.length).to eq 2
#       expect(body1.first['user_id']).to eq 1
#       expect(body1.last['user_id']).to eq 1
#
#       get booksURL, headers: { Authorization: @token2 }
#       body2 = JSON.parse(response.body)
#       #puts body2
#       expect(body2.length).to eq 2
#       expect(body2.first['user_id']).to eq 2
#       expect(body2.last['user_id']).to eq 2
#     end
#
#     it 'prevents an user from updating a book which is not theirs' do
#       patch '/books/3', params: {book: {name: "DNE"}}, headers: {Authorization: @token}
#       expect(response.status).to eq 401
#     end
#
#     it 'allows an user to update their book' do
#       patch '/books/1', params: {book: {name: "Bubba"}}, headers: {Authorization: @token}
#       expect(response.status).to eq 200
#       body = JSON.parse(response.body)
#       expect(body["name"]).to eq("Bubba")
#     end
#
#     it 'stops someone who is not the owner from deleting a book' do
#       delete '/books/3', headers: { Authorization: @token}
#       expect(response.status).to eq 401
#     end
#
#     it 'prevents someone from viewing a book which is not theirs' do
#       get '/books/1', headers: { Authorization: @token2 }
#       expect(response.status).to eq 401
#     end
#   end
# end
