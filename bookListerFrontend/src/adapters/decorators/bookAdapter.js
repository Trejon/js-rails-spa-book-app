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
}
