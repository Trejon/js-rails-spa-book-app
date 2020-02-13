# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all

trejon = User.create(name: 'Trejon', email: 'Trejon@stallsworth.com', password: 'password')

summer = List.create(name: "Summer", description: "Books I want to read this summer.", user: trejon)
academic = List.create(name: "Academic", description: "Books I need to read this semester for school.", user: trejon)

the_four_agreements = Book.create(title: "The Four Agreements: A Practical Guide to Personal Freedom", author: 'Miguel Ruiz', genre: 'Self Help', description: 'A Practical Guide to Personal Freedom', page_count: 168, list: summer)
the_48_laws_of_power = Book.create(title: "The 48 Laws of Power", author: 'Robert Greene', genre: 'Nonfiction', description: 'Synthesizes the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz with the historical legacies of statesmen, warriors, seducers, and con men throughout the ages.', page_count: 452, list: academic)

review1 = Review.create(rating: 9, content: 'Great read highly recommended.', date: Time.now, user: trejon, book: the_four_agreements)
review2 = Review.create(rating: 8.6, content: 'Great book with tons of insight.', date: Time.now, user: trejon, book: the_48_laws_of_power)
