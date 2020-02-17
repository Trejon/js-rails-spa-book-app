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
to_kill_a_mockingbird = Book.create(title: "To Kill a Mockingbird", author: 'Harper Lee', genre: 'Classics', description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.
', page_count: 324, list: summer)

review1 = Review.create(rating: 9, content: 'Great read highly recommended.', date: Time.now, user: trejon, book: the_four_agreements)
review2 = Review.create(rating: 8.6, content: 'Great book with tons of insight.', date: Time.now, user: trejon, book: the_48_laws_of_power)
review3 = Review.create(rating: 9.2, content: 'Really good book gave me entirely new perspective.', date: Time.now, user: trejon, book: to_kill_a_mockingbird)
