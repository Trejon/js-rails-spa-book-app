# signup_spec
require 'rails_helper'

RSpec.describe 'GET /lists', type: :request do

    let(:user) { Fabricate(:user) }
    let(:user2) { Fabricate(:user) }
    let(:url) { '/login' }
    let(:params) do
      {
        user: {
          email: user.email,
          password: user.password
        }
      }
  end
  let(:params2) do
    {
      user: {
        email: user2.email,
        password: user2.password
      }
    }
  end


  context 'you must be authorized to perform any crud on lists' do
    it "doesn't allow any unathorized requests to the lists controller" do
      get '/lists'
      expect(response.status).to eq 401
      get '/lists/1'
      expect(response.status).to eq 401
      post '/lists', params: { list: {name: 'DNE', description: "none"}}
      expect(response.status).to eq 401
      patch '/lists/1', params: { list: {name: 'DNE'}}
      expect(response.status).to eq 401
      delete '/lists/1'
      expect(response.status).to eq 401
    end

  end

  context 'authenticated users can only create/update their resources' do
    let(:listsURL) { '/lists' }
    before do

      post '/login', params: params
      @token = response.headers['Authorization']
      post '/login', params: params2
      @token2 = response.headers['Authorization']
    end

    it 'returns a 404 for unfound lists' do
      get '/lists/1000', headers: { Authorization: @token}
      expect(response.status).to eq 404
    end

    it 'allows an user to view only their own lists' do
      get listsURL, headers: { Authorization: @token }
      body1 = JSON.parse(response.body)
      #puts body1
      expect(body1.length).to eq 2
      expect(body1.first['user_id']).to eq 1
      expect(body1.last['user_id']).to eq 1

      get listsURL, headers: { Authorization: @token2 }
      body2 = JSON.parse(response.body)
      #puts body2
      expect(body2.length).to eq 2
      expect(body2.first['user_id']).to eq 2
      expect(body2.last['user_id']).to eq 2
    end

    it 'prevents an user from updating a list which is not theirs' do
      patch '/lists/3', params: {list: {name: "DNE"}}, headers: {Authorization: @token}
      expect(response.status).to eq 401
    end

    it 'allows an user to update their list' do
      patch '/lists/1', params: {list: {name: "Bubba"}}, headers: {Authorization: @token}
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body["name"]).to eq("Bubba")
    end

    it 'stops someone who is not the owner from deleting a list' do
      delete '/lists/3', headers: { Authorization: @token}
      expect(response.status).to eq 401
    end

    it 'prevents someone from viewing a list which is not theirs' do
      get '/lists/1', headers: { Authorization: @token2 }
      expect(response.status).to eq 401
    end
  end
end
