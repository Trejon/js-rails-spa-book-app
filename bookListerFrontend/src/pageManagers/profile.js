class ProfilePage extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = new ProfileAdapter(adapter);
        this.user = null;
    }

    initBindingsAndEventListeners() {
      return null
    }

    profileBindingAndEventListeners() {
      const userList = this.container.querySelector('ul#lists')
      userList.addEventListener('click', this.handleListClick.bind(this))

      const userBooks = this.container.querySelector('ul#books')
      userBooks.addEventListener('click', this.handleBookClick.bind(this))

      const deleteButtons = this.container.querySelectorAll('button#delete')
      if(deleteButtons){
        for (var i = 0 ; i < deleteButtons.length; i++) {
          deleteButtons[i].addEventListener('click' , this.handleDelete.bind(this), false ) ;
        }
    //
    //   // const userReviews = this.container.querySelector('ul#reviews')
    //   // userReviews.addEventListener('click', this.handleReviewClick.bind(this))
    }
  }
    //
    handleDelete(e){
      debugger
      e.preventDefault()
      const liId = e.target.parentNode.parentNode.getAttribute('data-id')
      if (e.target.parentNode.parentNode.parentNode.id == 'lists'){
        const listItem = this.getListById(liId)
        this.adapter.deleteList(listItem)
      } else {
        const listItem = this.getBookById(liId)
        this.adapter.deleteBook(listItem)
      }
      e.target.parentNode.parentNode.remove()
    }

    // listBindingsAndEventListeners() {
    //   const editButton = this.container.querySelector('button')
    //   editButton.addEventListener('click', this.formalizeList.bind(this))
    // }
    //
    // listFormBindingsAndEventListeners(){
    //   const form = this.container.querySelector('form')
    //   form.addEventListener('submit', this.handleUpdateList.bind(this))
    // }
    //
    // bookBindingsAndEventListeners() {
    //   const editButton = this.container.querySelector('button')
    //   editButton.addEventListener('click', this.formalizeBook.bind(this))
    // }
    //
    // bookFormBindingsAndEventListeners(){
    //   const form = this.container.querySelector('#edit-book-form')
    //   form.addEventListener('submit', this.handleUpdateBook.bind(this))
    // }
    //
    // reviewBindingsAndEventListeners() {
    //   const editButton = this.container.querySelector('button')
    //   editButton.addEventListener('click', this.formalizeReview.bind(this))
    // }
    //
    // reviewFormBindingsAndEventListeners() {
    //   const form = this.container.querySelector('#edit-review-form')
    //   form.addEventListener('submit', this.handleUpdateReview.bind(this))
    // }

    handleListClick(e) {
      if(e.target.tagName === 'A'){
        const listId = e.target.parentNode.getAttribute('data-id')
        const list = this.getListById(listId)
        this.renderList(list)
      }
    }

    handleBookClick(e) {
      if(e.target.tagName === 'A'){
        const bookId = e.target.parentNode.getAttribute('data-id')
        const book = this.getBookById(bookId)
        this.renderBook(book)
      }
    }

    handleReviewClick(e) {
      if(e.target.tagName === 'A'){
        const reviewId = e.target.parentNode.getAttribute('data-id')
        const review = this.getReviewById(reviewId)
        this.renderReview(review)
      }
    }

    // formalizeReview(e){
    //   e.preventDefault()
    //   const id = e.target.dataset.id
    //   const review = this.user.reviews.find(review => review.id == id)
    //     if(review){
    //       this.container.innerHTML = review.formHTML
    //       this.reviewFormBindingsAndEventListeners()
    //     } else {
    //         this.handleError({
    //           type: "404 Not Found",
    //           msg: "List was not found"
    //         })
    //     }
    // }
    //
    // formalizeList(e){
    //   e.preventDefault()
    //   const id = e.target.dataset.id
    //   const list = this.user.lists.find(list => list.id == id)
    //     if(list){
    //       this.container.innerHTML = list.formHTML
    //       this.listFormBindingsAndEventListeners()
    //     } else {
    //         this.handleError({
    //           type: "404 Not Found",
    //           msg: "List was not found"
    //         })
    //     }
    // }
    //
    // formalizeBook(e){
    //   e.preventDefault()
    //   const id = e.target.dataset.id
    //   const book = this.user.books.find(book => book.id == id)
    //     if(book){
    //       this.container.innerHTML = book.formHTML
    //       this.bookFormBindingsAndEventListeners()
    //     } else {
    //         this.handleError({
    //             type: "404 Not Found",
    //             msg: "List was not found"
    //         })
    //       }
    //     }

        // async handleUpdateList(e){
        //   e.preventDefault()
        //   const id = e.target.querySelector('input').value
        //   const [name, description] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)
        //
        //   const params = { name, description, id }
        //   const list = this.getListById(id)
        //   const oldList = new List({id, name, description})
        //   list.name = name
        //   list.description = description
        //   this.renderList(list)
        //     try{
        //       const {id, name, description} = await this.adapter.updateList(params)
        //     }catch(err){
        //       list.name = oldList.name
        //       list.description = oldList.description
        //       this.renderList(list)
        //       this.handleError(err)
        //     }
        //       this.fetchAndRenderPageResources()
        // }
        //
        // async handleUpdateBook(e){
        //   e.preventDefault()
        //   const id = this.container.querySelector('#hidden').value
        //   const page_count = this.container.querySelector('#page_count').value
        //   const [title, author, genre, description] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)
        //
        //   const params = { title, author, genre, description, page_count, id }
        //   const book = this.getBookById(id)
        //   const oldBook = new Book({id, title, author, genre, description, page_count})
        //     book.title = title
        //     book.author = author
        //     book.genre = genre
        //     book.description = description
        //     this.renderBook(book)
        //       try{
        //         const {id, title, author, genre, description, page_count} = await this.adapter.updateBook(params)
        //       }catch(err){
        //         book.title = oldBook.title
        //         book.author = oldBook.author
        //         book.genre = oldBook.genre
        //         book.description = oldBook.description
        //         book.page_count = oldBook.page_count
        //         this.renderBook(book)
        //         this.handleError(err)
        //       }
        //         this.fetchAndRenderPageResources()
        // }
        //
        // async handleUpdateReview(e) {
        //   e.preventDefault()
        //   const [id, date] = Array.from(e.target.querySelectorAll('input')).map(input => input.value)
        //   const [rating, content] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)
        //
        //   const params = { rating, content, date, id }
        //   const review = this.getReviewById(id)
        //   const oldReview = new Review({id, rating, content, date})
        //     review.rating = rating
        //     review.content = content
        //     review.date = date
        //     this.renderReview(review)
        //       try{
        //         const {id, rating, content, date} = await this.adapter.updateReview(params)
        //       }catch(err){
        //         review.rating = oldReview.rating
        //         review.content = oldReview.content
        //         review.date = oldReview.date
        //         this.renderReview(review)
        //         this.handleError(err)
        //       }
        //         this.fetchAndRenderPageResources()
        // }

        async fetchAndRenderPageResources() {
          try {
            const userObj = await this.adapter.getUser()
            this.user = new User(userObj)
            this.renderUser()
          } catch(err) {
            this.handleError(err)
          }
        }

        getListById(id) {
          return this.user.lists.find(list => list.id == id)
        }

        getBookById(id) {
          return this.user.books.find(book => book.id == id)
        }

        getReviewById(id) {
          return this.user.reviews.find(review => review.id == id)
        }

        get staticHTML() {
          return (`
            <div class="loader"></div>
          `)
        }

        renderList(list){
          if(list){
            this.container.innerHTML = list.profileShowHTML
          } else {
              this.handleError({
                type: "404 Not Found",
                msg: "List was not found"
              })
          }
        }

        renderBook(book){
          if(book){
            this.container.innerHTML = book.profileShowHTML
          } else {
              this.handleError({
                type: "404 Not Found",
                msg: "List was not found"
              })
          }
        }

        renderReview(review){
          if(review){
            this.container.innerHTML = review.profileShowHTML
          } else {
              this.handleError({
                type: "404 Not Found",
                msg: "List was not found"
              })
          }
        }

        renderUser() {
          this.container.innerHTML = this.user.profileHTML
          this.profileBindingAndEventListeners()
        }
}
