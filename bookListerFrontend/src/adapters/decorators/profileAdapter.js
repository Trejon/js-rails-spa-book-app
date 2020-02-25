class ProfileAdapter{

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

    async deleteList(params) {
      const { name, description, id} = params
      const url = `${this.baseURL}/lists/${id}`
      const res = await fetch(url, {
        method: 'DELETE',
        headers: this.headers
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

    async getUser() {
        const res = await fetch(`${this.baseURL}/profile`, {
            headers: this.headers
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
      }

  }
