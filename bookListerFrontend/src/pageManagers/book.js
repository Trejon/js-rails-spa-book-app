class BookPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new BookAdapter(adapter)
    this.books = [];
  }

  initBindingsAndEventListeners(){
    const form = this.container.querySelector('form')
    if (form){
    form.addEventListener('submit', this.handleBookSubmit.bind(this))
    this.container.querySelector('a#books-list')}

    const booksList = this.container.querySelector('ul#books')
    if(booksList){
    booksList.addEventListener('click', this.handleBookClick.bind(this))}

    // const deleteButtons = this.container.querySelectorAll('button#delete')
    // if(deleteButtons){
    //   for (var i = 0 ; i < deleteButtons.length; i++) {
    //     deleteButtons[i].addEventListener('click' , this.handleDelete.bind(this), false ) ;
    //   }
    // }
  }

  // handleDelete(e){
  //   e.preventDefault()
  //   const liId = e.target.parentNode.parentNode.getAttribute('data-id')
  //   const listItem = this.getBookById(liId)
  //   delete this.books[listItem]
  //   console.log(this.books)
  // }

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
        const book_id = e.target.querySelectorAll('input')[0].value
        const book = this.getBookById(book_id)
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
                book.reviews.push(review)
                this.renderBook(book)
                // this.redirect('book')
             }catch(err)  {
               this.handleError(err)
             }
             this.fetchAndRenderPageResources()
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

  handleBookClick(e) {
    if(e.target.tagName === 'A'){
      const bookId = e.target.parentNode.getAttribute('data-id')
      const book = this.getBookById(bookId)
      this.renderBook(book)
      }
    }

    renderBook(book) {
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
      this.container.innerHTML += `<h1>Add New Book</h1>`
      this.renderNewForm()
    }

    booksHTML(books) {
       return (`
         <h2>Welcome to your books page</h2>
         <h4>Books In Your Library:</h4>
         <ul id="books">
             ${books.map(book => book.liAndLinkHTML).join('')}
         </ul>
         `)
     }

    async handleBookSubmit(e) {
         e.preventDefault()
         const title = e.target.getElementsByTagName('textarea')[0].value
         const author = e.target.getElementsByTagName('textarea')[1].value
         const genre = e.target.getElementsByTagName('textarea')[2].value
         const description = e.target.getElementsByTagName('textarea')[3].value
         const page_count = e.target.querySelector('input').value
         const params = {
             book: {
                title, author, genre, description, page_count
             }
         }
         try{
            await this.adapter.createBook(params)
            this.redirect('book')
         }catch(err)  {
           this.handleError(err)
         }
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
