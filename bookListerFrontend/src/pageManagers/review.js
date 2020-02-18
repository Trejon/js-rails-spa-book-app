class ReviewPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new ReviewAdapter(adapter)
    this.reviews = [];
  }

  initBindingsAndEventListeners(){
    this.container.addEventListener('DOMContentLoaded', function() {
    var elems = this.container.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  })
  }

  async fetchAndRenderPageResources(){
    try {
      const reviewsObj = await this.adapter.getReviews()
      .then(reviews => {
          reviews.forEach(review => this.reviews.push(new Review(review)))
        })
      .then(() => this.renderReviews(this.adapter.reviews))
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

  renderNewForm() {
    this.container.innerHTML += `<form id="new-review-form">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="rating">Rating</label>
            <input type="text" class="form-control" id="rating" placeholder="Name"  required >
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
            <label for="date">Date</label>
             <input type="text" class="datepicker">
          </div>
        </div>
      <button id="new-list" type="submit" class="btn btn-primary">Add New Review</button>
    </form> `
    }
}
