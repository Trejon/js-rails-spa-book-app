class ReviewPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new ReviewAdapter(adapter)
    // this.review = null;
  }

  initBindingsAndEventListeners(){
    return null
  }

  async fetchAndRenderPageResources(){
    try {
      const reviewsObj = await this.adapter.getReviews()
      const reviews = new Review(reviewsObj)
    }catch(err){
      this.handleError(err)
    }
  }


  get staticHTML() {
    return (`
    <h1>List of Your Reviews:</h1>
    `)
  }

}
