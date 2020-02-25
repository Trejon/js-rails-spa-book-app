class User{
  constructor(user){
    const { id, email, name, lists, reviews, books } = user
      this.id = id
      this.email = email
      this.name = name
      this.lists = lists.map(list => new List(list))
      this.reviews = reviews.map(review => new Review(review))
      this.books = books.map(book => new Book(book))
    }

    get profileHTML() {
      const uniqueBooks = Array.from(new Set(this.books.map(book => book.id)))
        .map(id => {
      return this.books.find(a => a.id === id)
     })
      return (`
          <h2>Welcome ${this.name}!</h2>

          <h4>Your Created Lists:</h4>
          <ul id="lists">
              ${this.lists.map(list => list.profileLiAndLinkHTML).join('')}
          </ul>

          <h4>Books In Your Collection:</h4>
          <ul id="books">
              ${uniqueBooks.map(book => book.profileLiAndLinkHTML).join('')}
          </ul>
        `)
    }

    get formHTML() {
        return List.formHTML(this)
      }
}
