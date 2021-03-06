class BookAdapter{

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

  async getBooks() {
      const res = await fetch(`${this.baseURL}/books`, {
          headers: this.headers
      })
      await this.baseAdapter.checkStatus(res)
      return await res.json()
    }

    async getBookById(params) {
        const id = parseInt(params)
        const url = `${this.baseURL}/books/${id}`
        const res = await fetch(url, {
            headers: this.headers
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
      }

    async updateBook(params) {
      const { title, author, genre, description, page_count, id} = params
      const url = `${this.baseURL}/books/${id}`
      const body = {
        book: {
          title,
          author,
          genre,
          description,
          page_count
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

  async createReview(params) {
    const res = await fetch(`${this.baseURL}/reviews`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(params)
    })
    await this.baseAdapter.checkStatus(res)
    return await res.json()
  }

  async deleteBook(params) {
    const { title, author, genre, description, page_count, id} = params
    const url = `${this.baseURL}/books/${id}`
    const res = await fetch(url, {
      method: 'DELETE',
      headers: this.headers
    })
    await this.baseAdapter.checkStatus(res)
  }
}
