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
              ${this.lists.map(list => list.profileLiAndLinkHTML).join('')}
          </ul>

          <h4>Books In Your Collection:</h4>
          <ul id="books">
              ${this.books.map(book => book.profileLiAndLinkHTML).join('')}
          </ul>
        `)
    }


    get formHTML() {
        return List.formHTML(this)
      }

      renderNewForm() {
        this.container.innerHTML += `<form id="new-list-form">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Name"  required >
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="description">Description</label>
                 <textarea class="form-control" id="description" rows="3"></textarea>
              </div>
            </div>
          <button id="new-list" type="submit" class="btn btn-primary">Add New List</button>
        </form>`
      }

}
