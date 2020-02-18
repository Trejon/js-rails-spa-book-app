class BookPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new BookAdapter(adapter)
    this.books = [];
  }

  initBindingsAndEventListeners(){
    return null
  }

  get staticHTML() {
    return (`
      <h2>Welcome to your books page</h2>
      <h4>Your books:</h4>
    `)
  }

  async fetchAndRenderPageResources() {
      try {
        const booksObj = await this.adapter.getBooks()
        .then(books => {
            books.forEach(book => this.books.push(new Book(book)))
          })
        .then(() => this.renderBooks(this.adapter.books))
      } catch(err) {
          this.handleError(err)
      }
    }

    renderBooks() {
      const uniqueBooks = Array.from(new Set(this.books.map(l => l.id)))
        .map(id => {
      return this.books.find(a => a.id === id)
     })
      this.container.innerHTML += uniqueBooks.map(book => book.liAndLinkHTML).join('')
      this.container.innerHTML += `<h1>Add New Book</h1>`
      this.renderNewForm()
    }

    async handleUpdateBook(e){
          e.preventDefault()
          const id = this.container.querySelector('#hidden').value
          const [title, author, genre, description] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)

          const params = { title, author, genre, description, id }
          const book = this.getBookById(id)
          const oldBook = new Book({id, title, author, genre, description})
            book.title = title
            book.author = author
            book.genre = genre
            book.description = description
            this.renderBook(book)
            try{
                const {id, title, author, genre, description} = await this.adapter.updateBook(params)
            }catch(err){
                book.title = oldBook.title
                book.author = oldBook.author
                book.genre = oldBook.genre
                book.description = oldBook.description
                this.renderBook(book)
                this.handleError(err)
            }
            this.fetchAndRenderPageResources()
      }

      renderNewForm() {
        this.container.innerHTML += `
          <form id="new-book-form">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="title">Title</label>
                  <textarea class="form-control" id="title" rows="3"></textarea>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="author">Author</label>
                  <textarea class="form-control" id="author" rows="3"></textarea>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="genre">Genre</label>
                   <textarea class="form-control" id="genre" rows="3"></textarea>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="description">Description</label>
                   <textarea class="form-control" id="description" rows="3"></textarea>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="page_count">Pages</label>
                  <input type="text" class="form-control" id="page_count" placeholder="Pages" required >
                </div>
              </div>
            <button type="submit" class="btn btn-primary">Add New Book</button>
          </form>`
      }
}
