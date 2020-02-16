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

    async updateList(params) {
      const { name, description, id} = params
      const url = `${this.baseURL}/lists/${id}`
      const body = {
        list: {
          name,
          description
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

    async getUser() {
        const res = await fetch(`${this.baseURL}/profile`, {
            headers: this.headers
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
      }


  }
