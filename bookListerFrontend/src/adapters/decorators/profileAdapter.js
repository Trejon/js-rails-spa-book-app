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

//     async updateList(params) {
//       const { name, description, id} = params
//       const url = `${this.baseURL}/lists/${id}`
//       const body = {
//         list: {
//           name,
//           description
//         }
//       }
//       const res = await fetch(url, {
//         method: 'PATCH',
//         headers: this.headers,
//         body: JSON.stringify(body)
//       })
//       await this.baseAdapter.checkStatus(res)
//       return await res.json()
//   }
//
//   async updateBook(params) {
//     const { title, author, genre, description, page_count, id} = params
//     const url = `${this.baseURL}/books/${id}`
//     const body = {
//         book: {
//           title,
//           author,
//           genre,
//           description,
//           page_count
//         }
//       }
//     const res = await fetch(url, {
//       method: 'PATCH',
//       headers: this.headers,
//       body: JSON.stringify(body)
//     })
//     await this.baseAdapter.checkStatus(res)
//     return await res.json()
// }
//
// async updateReview(params) {
//     const { rating, content, date, id} = params
//     const url = `${this.baseURL}/reviews/${id}`
//     const body = {
//       review: {
//         rating,
//         content,
//         date
//       }
//     }
//     const res = await fetch(url, {
//       method: 'PATCH',
//       headers: this.headers,
//       body: JSON.stringify(body)
//     })
//     await this.baseAdapter.checkStatus(res)
//     return await res.json()
//   }



//   async createList(params) {
//     const { name, description} = params
//     const url = `${this.baseURL}/lists`
//     const body = {
//       list: {
//         name,
//         description
//       }
//     }
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: this.headers,
//       body: JSON.stringify(body)
//     })
//     await this.baseAdapter.checkStatus(res)
//     return await res.json()
// }

    async getUser() {
        const res = await fetch(`${this.baseURL}/profile`, {
            headers: this.headers
        })
        await this.baseAdapter.checkStatus(res)
        return await res.json()
      }

  }
