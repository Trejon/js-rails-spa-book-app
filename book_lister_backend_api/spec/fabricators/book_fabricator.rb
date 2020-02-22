Fabricator(:book) do
  title { Faker::Book.title }
  author { Faker::Book.author }
  genre { Faker::Book.genre }
  description { Faker::Lorem.paragraph }
  page_count {Faker::Number.number(digits: 3)}
end
