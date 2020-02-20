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
    // const li = this.container.querySelectorAll('ul#reviews li')
    // if(li){
    //   li.addEventListener('click', console.log('delete was clicked'))
    // }
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
      const reviewId = e.target.dataset.id
      const review = this.getReviewById(reviewId)
      this.renderReview(review)
    } else {
      if(e.target.tagName === 'I'){
        const reviewId = e.target.dataset.id
        let review = this.getReviewById(reviewId)
      }
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
            this.fetchAndRenderPageResources()
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
    // this.container.innerHTML += `<h1>Add New Review</h1>`
    // this.renderNewForm()
  }

  reviewsHTML(reviews) {
     return (`
       <h4>Your Created Reviews:</h4>
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
          this.redirect('review')
       }catch(err)  {
         this.handleError(err)
       }
   }

  renderNewForm() {
    this.container.innerHTML += `<form id="new-review-form">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="rating">Rating</label>
            <input type="text" class="form-control" id="rating" placeholder="Rating"  required >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="content">Content</label>
             <textarea class="form-control" id="content" rows="3"></textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
             <input type="date" class="datepicker">
          </div>
        </div>
      <button id="new-list" type="submit" class="btn btn-primary">Add New Review</button>
    </form> `
    }
}
