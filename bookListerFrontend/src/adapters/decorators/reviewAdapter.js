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
      const res = await fetch(`${this.baseURL}/reviews`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(params)
      })
      await this.baseAdapter.checkStatus(res)
      return await res.json()
    }

    async updateReview(params) {
        const { rating, content, date, id} = params
        const url = `${this.baseURL}/reviews/${id}`
        const body = {
          review: {
            rating,
            content,
            date
          }
        }
        const res = await fetch(url, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(body)
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
      }

}
