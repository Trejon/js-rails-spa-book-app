class ProfilePage extends PageManager{

  constructor(container, adapter){
      super(container)
      this.adapter =  new ProfileAdapter(adapter);
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
      const userReviews = this.container.querySelector('ul#reviews')
      userReviews.addEventListener('click', this.handleReviewClick.bind(this))
      // const createButton = this.container.querySelector('button')
      // createButton.addEventListener('click', this.handleCreateListClick.bind(this))
    }


    listBindingsAndEventListeners() {
      const editButton = this.container.querySelector('button')
      editButton.addEventListener('click', this.formalizeList.bind(this))
    }

    listFormBindingsAndEventListeners(){
      const form = this.container.querySelector('form')
      form.addEventListener('submit', this.handleUpdateList.bind(this))
    }

    handleListClick(e) {
      if(e.target.tagName === 'A'){
        const listId = e.target.dataset.id
        const list = this.getListById(listId)
        this.renderList(list)
        }
      }

      handleBookClick(e) {
        if(e.target.tagName === 'A'){
          const bookId = e.target.dataset.id
          const book = this.getBookById(bookId)
          this.renderBook(book)
          }
        }

        handleReviewClick(e) {
          if(e.target.tagName === 'A'){
            const reviewId = e.target.dataset.id
            const review = this.getReviewById(reviewId)
            this.renderReview(review)
            }
          }


    // handleCreateListClick(e) {
    //   e.preventDefault()
    //   this.newFormHTML
    //   }


    formalizeList(e){
        e.preventDefault()
        const id = e.target.dataset.id
        const list = this.user.lists.find(list => list.id == id)
          if(list){
              this.container.innerHTML = list.formHTML
              this.listFormBindingsAndEventListeners()
          } else {
              this.handleError({
                type: "404 Not Found",
                msg: "List was not found"
              })
            }
        }

    async handleUpdateList(e){
          e.preventDefault()
          const [id, name] = Array.from(e.target.querySelectorAll('input')).map(input => input.value)
          const description = e.target.querySelector('textarea').value

          const params = { name, description, id }
          const list = this.getListById(id)
          const oldList = new List({id, name, description})
            list.name = name
            list.description = description
            this.renderList(list)
            try{
                const {id, name, description} = await this.adapter.updateList(params)
            }catch(err){
                list.name = oldList.name
                list.description = oldList.description
                this.renderList(list)
                this.handleError(err)
            }
            this.fetchAndRenderPageResources()
      }


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
          this.container.innerHTML = list.showHTML
          this.listBindingsAndEventListeners()
        } else {
          this.handleError({
            type: "404 Not Found",
            msg: "List was not found"
          })
        }
      }

      renderBook(book){
          if(book){
            this.container.innerHTML = book.showHTML
            // this.listBindingsAndEventListeners()
          } else {
            this.handleError({
              type: "404 Not Found",
              msg: "List was not found"
            })
          }
        }

        renderReview(review){
            if(review){
              this.container.innerHTML = review.showHTML
              // this.reviewBindingsAndEventListeners()
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
