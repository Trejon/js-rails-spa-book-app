# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Book.destroy_all

trejon = User.create(name: 'Trejon', email: 'Trejon@stallsworth.com', password: 'password')

the_four_agreements = Book.create(title: "The Four Agreements: A Practical Guide to Personal Freedom", author: 'Miguel Ruiz', genre: 'Self Help', description: 'A Practical Guide to Personal Freedom', page_count: 168)
the_48_laws_of_power = Book.create(title: "The 48 Laws of Power", author: 'Robert Greene', genre: 'Nonfiction', description: 'Synthesizes the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz with the historical legacies of statesmen, warriors, seducers, and con men throughout the ages.', page_count: 452)
to_kill_a_mockingbird = Book.create(title: "To Kill a Mockingbird", author: 'Harper Lee', genre: 'Classics', description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.
', page_count: 324)
how_to = Book.create(title: "How To: Absurd Scientific Advice for Common Real-World Problems", author: 'Randall Munroe', genre: 'Nonfiction', description: 'The world\'s most entertaining and useless self-help guide, from the brilliant mind behind the wildly popular webcomic xkcd and the #1 New York Times bestsellers What If? and Thing Explainer', page_count: 307)
mamas_last_hug = Book.create(title: "Mama's Last Hug: Animal Emotions and What They Tell Us about Ourselves", author: ' Frans de Waal', genre: 'Nonfiction', description: 'New York Times best-selling author and primatologist Frans de Waal explores the fascinating world of animal and human emotions.', page_count: 336)
digital_minimalism = Book.create(title: "Digital Minimalism: Choosing a Focused Life in a Noisy World", author: 'Cal Newport', genre: 'Nonfiction', description: 'The key to living well in a high tech world is to spend much less time using technology.', page_count: 304)

summer = List.create(name: "Summer", description: "Books I want to read this summer.", user: trejon, books: [the_four_agreements, the_48_laws_of_power])
academic = List.create(name: "Academic", description: "Books I need to read this semester for school.", user: trejon, books: [to_kill_a_mockingbird])
fun = List.create(name: "Fun", description: "Books I want to read when I have free time.", user: trejon, books: [mamas_last_hug, how_to, digital_minimalism])


review1 = Review.create(rating: 9, content: 'Great read highly recommended.', date: Time.now, user: trejon, book: the_four_agreements)
review2 = Review.create(rating: 8.6, content: 'Great book with tons of insight.', date: Time.now, user: trejon, book: the_48_laws_of_power)
review3 = Review.create(rating: 9.2, content: 'Really good book gave me entirely new perspective.', date: Time.now, user: trejon, book: to_kill_a_mockingbird)
review4 = Review.create(rating: 7.9, content: 'Hard to follow at points but definitely an interesting book.', date: Time.now, user: trejon, book: how_to)
review5 = Review.create(rating: 9.5, content: 'Really makes you think about our evolution and how we\'ve adapted over time.', date: Time.now, user: trejon, book: mamas_last_hug)
review6 = Review.create(rating: 9.2, content: 'Good book with advice I think we should all follow in this day and age.', date: Time.now, user: trejon, book: digital_minimalism)
