class Review{
    constructor(review){
      const { id, rating, content, date, user_id, book_id} = review
        this.id = id
        this.rating = rating
        this.content = content
        this.date = date
        this.book_id = book_id
      }

      // get reviewsHTML() {
      //   return (`
      //     <h2>Welcome to your reviews page</h2>
      //     <h3>Your reviews:</h3>
      //     <h5>${this.rating} - ${this.content}</h5>
      //     `)
      // }

      get liAndLinkHTML() {
        return `<br><li><a href="#" data-id=${this.id}>${this.rating} - ${this.content}</a></li>`
      }

      get showHTML() {
        return (`
            <h2>Rating: ${this.rating}</h2>
            <h4>Content: ${this.content}</h4>
            <h4>Date: ${new Date(this.date).toDateString()}</h4>
            <h4>Book Id: ${this.book_id}</h4>
            <button data-id=${this.id} id="edit-list">Edit</button>
          `)
        }
  }
