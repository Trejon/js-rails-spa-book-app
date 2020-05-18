class BookPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new BookAdapter(adapter)
    this.books = [];
  }

  initBindingsAndEventListeners(){
    const form = this.container.querySelector('form')
    if (form){
    form.addEventListener('submit', this.handleBookSubmit.bind(this))}

    const booksList = this.container.querySelector('ul#books')
    if(booksList){
    booksList.addEventListener('click', this.handleBookClick.bind(this))}

    const deleteButtons = this.container.querySelectorAll('button#delete')
    if(deleteButtons){
      for (var i = 0 ; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click' , this.handleDelete.bind(this), false ) ;
      }
    }
  }

  handleDelete(e){
    e.preventDefault()
    const liId = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'))
    const listItem = this.getBookById(liId)
    this.books = this.books.filter(book => book.id != liId)
    this.adapter.deleteBook(listItem)
    e.target.parentNode.parentNode.remove()
  }

  bookBindingsAndEventListeners() {
    const editButton = this.container.querySelector('button#edit-book')
    if(editButton){
    editButton.addEventListener('click', this.formalizeBook.bind(this))}

    const form = this.container.querySelector('form')
    if (form){
    form.addEventListener('submit', this.handleReviewSubmit.bind(this))}
  }

  async handleReviewSubmit(e) {
      e.preventDefault()
<<<<<<< HEAD
        const book_id = this.book.id
=======
        const book_id = e.target.querySelectorAll('input')[0].value
        const book = this.getBookById(book_id)
>>>>>>> ccb61d97d80a6b40e144cda4719cfea4df171142
        const rating = e.target.querySelectorAll('input')[1].value
        const content = e.target.querySelector('textarea').value
        const date = e.target.querySelectorAll('input')[2].value
        const params = {
                 review: {
                    book_id, rating, content, date
                 }
             }
             try{
              const review = await this.adapter.createReview(params)
<<<<<<< HEAD
                this.book.reviews.push(review)
                this.renderBook(this.book)
=======
                book.reviews.push(review)
                this.renderBook(book)
>>>>>>> ccb61d97d80a6b40e144cda4719cfea4df171142
             }catch(err)  {
               this.handleError(err)
             }
  }

  bookFormBindingsAndEventListeners() {
    const form = this.container.querySelector('#edit-book-form')
    form.addEventListener('submit', this.handleUpdateBook.bind(this))
  }

  formalizeBook(e) {
    e.preventDefault()
    const id = e.target.dataset.id
    const book = this.getBookById(id)
      if(book){
          this.container.innerHTML = book.formHTML
          this.bookFormBindingsAndEventListeners()
      } else {
          this.handleError({
            type: "404 Not Found",
            msg: "List was not found"
          })
        }
  }

  async handleBookClick(e) {
    if(e.target.tagName === 'A'){
      const bookId = e.target.parentNode.dataset.id
      const bookObj = await this.adapter.getBookById(bookId)
      this.book = new Book(bookObj)
      this.renderBook(this.book)
      }
    }

    renderBook(book) {
<<<<<<< HEAD
=======
      debugger
>>>>>>> ccb61d97d80a6b40e144cda4719cfea4df171142
      if(book){
        this.container.innerHTML = book.showHTML
        this.bookBindingsAndEventListeners()
      } else {
        this.handleError({
          type: "404 Not Found",
          msg: "List was not found"
        })
      }
    }

    getBookById(id) {
      return this.books.find(book => book.id == id)
    }

  get staticHTML() {
    return (`
      <div class="loader"></div>
    `)
  }

  async fetchAndRenderPageResources() {
      try {
        const booksObj = await this.adapter.getBooks()
        .then(books => {
            books.forEach(book => this.books.push(new Book(book)))
          })
        .then(() => this.renderBooks(this.books))
        .then(() => this.initBindingsAndEventListeners())
      } catch(err) {
          this.handleError(err)
      }
    }

    renderBooks() {
      const uniqueBooks = Array.from(new Set(this.books.map(book => book.id)))
        .map(id => {
      return this.books.find(a => a.id === id)
     })
      this.container.innerHTML += this.booksHTML(uniqueBooks)
    }

    booksHTML(books) {
       return (`
         <h2>Welcome to your books page</h2>
         <h4>Your Library Of Finished Books:</h4>
         <ul id="books">
             ${books.map(book => book.liAndLinkHTML).join('')}
         </ul>
         `)
     }

     async handleUpdateBook(e){
           e.preventDefault()
           const id = this.container.querySelector('#hidden').value
           const page_count = this.container.querySelector('#page_count').value
           const [title, author, genre, description] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)

           const params = { title, author, genre, description, page_count, id }

           const book = this.getBookById(id)

           const oldBook = new Book({id, title, author, genre, description, page_count})
             book.title = title
             book.author = author
             book.genre = genre
             book.description = description
             this.renderBook(book)
             try{
                 const {id, title, author, genre, description, page_count} = await this.adapter.updateBook(params)
             }catch(err){
                 book.title = oldBook.title
                 book.author = oldBook.author
                 book.genre = oldBook.genre
                 book.description = oldBook.description
                 book.page_count = oldBook.page_count
                 this.renderBook(book)
                 this.handleError(err)
             }
       }
}
