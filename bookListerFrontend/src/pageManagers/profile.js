class ProfilePage extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = new ProfileAdapter(adapter);
        // this.user = null;
    }

    initBindingsAndEventListeners() {
        const userLists = this.container.querySelector('ul#lists')
        if(userLists){
        userLists.addEventListener('click', this.handleListClick.bind(this))}

        const userBooks = this.container.querySelector('ul#books')
        if(userBooks){
        userBooks.addEventListener('click', this.handleBookClick.bind(this))}

        const deleteButtons = this.container.querySelectorAll('button#delete')
        if(deleteButtons){
          for (var i = 0 ; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click' , this.handleDelete.bind(this), false);
          }
        }
    }

  //   profileBindingAndEventListeners() {
  //   //   const userLists = this.container.querySelector('ul#lists')
  //   //   userLists.addEventListener('click', this.handleListClick.bind(this))
  //   //
  //   //   const userBooks = this.container.querySelector('ul#books')
  //   //   userBooks.addEventListener('click', this.handleBookClick.bind(this))
  //   //
  //   //   const deleteButtons = this.container.querySelectorAll('button#delete')
  //   //   if(deleteButtons){
  //   //     for (var i = 0 ; i < deleteButtons.length; i++) {
  //   //       deleteButtons[i].addEventListener('click' , this.handleDelete.bind(this), false ) ;
  //   //     }
  //   // }
  // }

    handleDelete(e){
      e.preventDefault()
      const liId = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'))
      if (e.target.parentNode.parentNode.parentNode.id == 'lists'){
        const listItem = this.getListById(liId)
        this.user.lists = this.user.lists.filter(list => list.id != liId)
        this.adapter.deleteList(listItem)
      } else {
        const listItem = this.getBookById(liId)
        this.user.books = this.user.books.filter(book => book.id != liId)
        this.adapter.deleteBook(listItem)
      }
      e.target.parentNode.parentNode.remove()
    }

<<<<<<< HEAD
    async handleListClick(e) {
      if(e.target.tagName === 'A'){
        const listId = e.target.parentNode.dataset.id
        const listObj = await this.adapter.getListById(listId)
        this.list = new List(listObj)
        this.renderList(this.list)
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
=======
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
>>>>>>> ccb61d97d80a6b40e144cda4719cfea4df171142

    // handleReviewClick(e) {
    //   if(e.target.tagName === 'A'){
    //     const reviewId = e.target.parentNode.getAttribute('data-id')
    //     const review = this.getReviewById(reviewId)
    //     this.renderReview(review)
    //   }
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
                msg: "Book was not found"
              })
          }
        }

        // renderReview(review){
        //   if(review){
        //     this.container.innerHTML = review.profileShowHTML
        //   } else {
        //       this.handleError({
        //         type: "404 Not Found",
        //         msg: "List was not found"
        //       })
        //   }
        // }

        renderUser() {
          this.container.innerHTML = this.user.profileHTML
          // this.profileBindingAndEventListeners()
          this.initBindingsAndEventListeners()
        }
}
