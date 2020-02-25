class ReviewPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new ReviewAdapter(adapter)
    this.reviews = [];
  }

  initBindingsAndEventListeners(){
    const form = this.container.querySelector('form')
    if (form){
    form.addEventListener('submit', this.handleReviewSubmit.bind(this))}

    const reviewsList = this.container.querySelector('ul#reviews')
    if(reviewsList){
    reviewsList.addEventListener('click', this.handleReviewClick.bind(this))}

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
    const listItem = this.getReviewById(liId)
    this.reviews = this.reviews.filter(review => review.id != liId)
    this.adapter.deleteReview(listItem)
    e.target.parentNode.parentNode.remove()
  }

  reviewBindingsAndEventListeners() {
    const editButton = this.container.querySelector('button#edit-review')
    if(editButton){
    editButton.addEventListener('click', this.formalizeReview.bind(this))}
  }

  reviewFormBindingsAndEventListeners() {
    const form = this.container.querySelector('#edit-review-form')
    form.addEventListener('submit', this.handleUpdateReview.bind(this))
  }

  formalizeReview(e){
    e.preventDefault()
    const id = e.target.dataset.id
    const review = this.getReviewById(id)
      if(review){
        this.container.innerHTML = review.formHTML
        this.reviewFormBindingsAndEventListeners()
      } else {
        this.handleError({
          type: "404 Not Found",
          msg: "List was not found"
        })
      }
  }

  getReviewById(id) {
    return this.reviews.find(review => review.id == id)
  }

  handleReviewClick(e) {
    if(e.target.tagName === 'A'){
      const reviewId = e.target.parentNode.dataset.id
      const review = this.getReviewById(reviewId)
      this.renderReview(review)
    }
  }

  renderReview(review){
      if(review){
        this.container.innerHTML = review.showHTML
        this.reviewBindingsAndEventListeners()
      } else {
        this.handleError({
          type: "404 Not Found",
          msg: "List was not found"
        })
      }
    }

    async handleUpdateReview(e) {
          e.preventDefault()
          const [id, date] = Array.from(e.target.querySelectorAll('input')).map(input => input.value)
          const [rating, content] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)

          const params = { rating, content, date, id }
          const review = this.getReviewById(id)
          const oldReview = new Review({id, rating, content, date})
            review.rating = rating
            review.content = content
            review.date = date
            this.renderReview(review)
            try{
                const {id, rating, content, date} = await this.adapter.updateReview(params)
            }catch(err){
                review.rating = oldReview.rating
                review.content = oldReview.content
                review.date = oldReview.date
                this.renderReview(review)
                this.handleError(err)
            }
      }


  async fetchAndRenderPageResources(){
    try {
      const reviewsObj = await this.adapter.getReviews()
      .then(reviews => {
          reviews.forEach(review => this.reviews.push(new Review(review)))
        })
      .then(() => this.renderReviews(this.reviews))
      .then(() => this.initBindingsAndEventListeners())
    }catch(err){
      this.handleError(err)
    }
  }

  get staticHTML() {
    return (`
      <h2>Welcome to your reviews page</h2>
    `)
  }

  renderReviews() {
    const uniqueReviews = Array.from(new Set(this.reviews.map(l => l.id)))
      .map(id => {
    return this.reviews.find(a => a.id === id)
   })
    this.container.innerHTML += this.reviewsHTML(uniqueReviews)
  }

  reviewsHTML(reviews) {
     return (`
       <h4>Your Logged Reviews:</h4>
       <ul id="reviews">
           ${reviews.map(review => review.liAndLinkHTML).join('')}
       </ul>
       `)
   }

  async handleReviewSubmit(e) {
       e.preventDefault()
       const rating = e.target.querySelectorAll('input')[0].value
       const content = e.target.querySelector('textarea').value
       const date = e.target.querySelectorAll('input')[1].value
       const params = {
           review: {
              rating, content, date
           }
       }
       try{
          await this.adapter.createReview(params)
          this.reviews.push(params.review)
          this.redirect('review')
       }catch(err)  {
         this.handleError(err)
       }
   }
}
