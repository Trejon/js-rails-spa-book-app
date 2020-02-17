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
      console.log(this.books)
      return (`
          <h2>Welcome ${this.name}!</h2>
          <h3>Your Lists:</h3>
          <ul>
              ${this.lists.map(list => list.liAndLinkHTML).join('')}
          </ul>
          <h3>Your Reviews:</h3>
          <ul>
              ${this.reviews.map(review => review.liAndLinkHTML).join('')}
          </ul>
          <h3>Your Books:</h3>
          <ul>
              ${this.books.map(book => book.liAndLinkHTML).join('')}
          </ul>
          <button class="btn btn-primary">Create</button>
        `)
    }

    get reviewsHTML() {
      return (`
        <h2>Welcome ${this.name}!</h2>
        `)
    }


}
