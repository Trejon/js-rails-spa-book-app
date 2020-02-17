class BookAdapter{

  constructor(baseAdapter) {
    this.baseAdapter = baseAdapter;
    this.baseURL = this.baseAdapter.baseURL;
    this.bookURL = 
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
}
