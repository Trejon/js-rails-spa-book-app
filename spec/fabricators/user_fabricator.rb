Fabricator(:user) do
  name { Faker::Name.name }
  email { Faker::Internet.email }
  password { Faker::Games::Pokemon.name }
  lists(count: 2)
end
