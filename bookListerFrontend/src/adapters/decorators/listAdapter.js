class ListAdapter{

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

  async getLists() {
      const res = await fetch(`${this.baseURL}/lists`, {
          headers: this.headers
      })
      await this.baseAdapter.checkStatus(res)
      return await res.json()
    }

    // async createList(params) {
    //   const res = await fetch(`${this.baseURL}/lists`, {
    //     method: 'POST',
    //     headers: this.headers,
    //     body: JSON.stringify(params)
    //   })
    //   await this.baseAdapter.checkStatus(res)
    //   this.baseAdapter.token = res.headers.get('authorization').split(' ')[1]
    // }


}
