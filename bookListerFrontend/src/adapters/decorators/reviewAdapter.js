class ReviewAdapter{

  constructor(baseAdapter) {
    this.baseAdapter = baseAdapter;
    this.baseURL = this.baseAdapter.baseURL;
  }

  get token() {
    return this.baseAdapter.token
  }

  get headers() {
    return this.baseAdapter.headers
  }

  async getReviews() {
      const res = await fetch(`${this.baseURL}/reviews`, {
          headers: this.headers
      })
      await this.baseAdapter.checkStatus(res)
      return await res.json()
    }

    async createReview(params) {
      console.log('first test')
      const res = await fetch(`${this.baseURL}/reviews`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(params)
      })
      console.log('2nd test')
      await this.baseAdapter.checkStatus(res)
      return await res.json()
    }
}
