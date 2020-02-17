class ReviewPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new ReviewAdapter(adapter)
    this.reviews = null;
  }

  initBindingsAndEventListeners(){
    return null
  }

  async fetchAndRenderPageResources(){
    try {
      const reviewsObj = await this.adapter.getReviews()
      this.reviews = new Review(reviewsObj)
      this.renderReviews(this.adapter.reviews)
    }catch(err){
      this.handleError(err)
    }
  }

  get staticHTML() {
    return (`
    <h1>List of Your Reviews:</h1>
    `)
  }

  renderReviews() {
    this.container.innerHTML = this.reviews.reviewsHTML
  }


}
