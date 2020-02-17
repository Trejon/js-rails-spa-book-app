class BookPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new BookAdapter(adapter)
    this.books = null;
  }

  initBindingsAndEventListeners(){
    return null
  }

  get staticHTML() {
    return (`
    <h1>Your Books:</h1>
    `)
  }

  async fetchAndRenderPageResources() {
      try {
        const booksObj = await this.adapter.getBooks()
        this.books = new Book(booksObj)
        this.renderBooks(this.adapter.books)
      } catch(err) {
          this.handleError(err)
      }
    }

    renderBooks() {
      this.container.innerHTML = this.books.booksHTML
    }

}
