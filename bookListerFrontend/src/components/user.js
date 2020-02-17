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
      return (`
          <h2>Welcome ${this.name}!</h2>
          
          <h4>Your Created Lists:</h4>
          <ul id="lists">
              ${this.lists.map(list => list.liAndLinkHTML).join('')}
          </ul>

          <h4>Reviews You've Made:</h4>
          <ul id="reviews">
              ${this.reviews.map(review => review.liAndLinkHTML).join('')}
          </ul>

          <h4>Books In Your Collection:</h4>
          <ul id="books">
              ${this.books.map(book => book.liAndLinkHTML).join('')}
          </ul>
          <button class="btn btn-primary">Create</button>
        `)
    }


}
