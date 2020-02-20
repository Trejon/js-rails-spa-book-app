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
      <h4>Your reviews:</h4>
    `)
  }

  renderReviews() {
    const uniqueReviews = Array.from(new Set(this.reviews.map(l => l.id)))
      .map(id => {
    return this.reviews.find(a => a.id === id)
   })
    this.container.innerHTML += uniqueReviews.map(review => review.liAndLinkHTML).join('')
    this.container.innerHTML += `<h1>Add New Review</h1>`
    this.renderNewForm()
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
