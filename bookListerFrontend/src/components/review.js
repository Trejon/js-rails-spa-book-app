class Review{
    constructor(review){
      const { id, rating, content, date, user_id, book_id, book} = review
        this.id = id
        this.rating = rating
        this.content = content
        this.date = date
        this.book_id = book_id
        this.book = book
      }

      static formHTML(review) {
            return(`
              <form id="${review ? 'edit' : 'new'}-review-form">
                  ${review ? `<input type='hidden' value="` + review.id + `">` : ''}
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="rating">Rating</label>
                      <textarea class="form-control" id="rating" rows="3">${review ? review.rating : ''}</textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="content">Content</label>
                       <textarea class="form-control" id="content" rows="3">${review ? review.content : ''}</textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="date">Date Finished</label>
                       <input type="date" class="datepicker">
                    </div>
                  </div>
                <button type="submit" class="btn btn-primary">${review ? 'Update' : 'Create'}</button>
              </form>
              `)
        }

        get formHTML() {
          return Review.formHTML(this)
        }

      get liAndLinkHTML() {
        return `<br><li data-id=${this.id}><a href="#" id="reviews-list">${this.book.title}: <br>Rating: ${this.rating ? this.rating : 'None'} - Content: ${this.content ? this.content : 'None'}</a><button id="delete" type="delete" class="btn-floating btn waves-effect waves-light light-blue lighten-2 right"><i class="material-icons" style="font-size: 20px" data-id=${this.id}>delete_forever</i></li>`
      }

      get profileShowHTML() {
        return (`
            <h2>Rating: ${this.rating}</h2>
            <h4>Content: ${this.content}</h4>
            <h4>Date Finished: ${new Date(this.date).toDateString()}</h4>
            <button data-id=${this.id} id="edit-review">Edit</button>
          `)
        }

      get showHTML() {
        const utcDate = new Date(this.date)
        return (`
            <h1>Book: ${this.book.title}</h1>
            <h2>Rating: ${this.rating ? this.rating : "None"}</h2>
            <h4>Content: ${this.content ? this.content : "None"}</h4>
            <h4>Date Finished: ${new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000)}</h4>
            <button data-id=${this.id} id="edit-review">Edit</button>
          `)
        }
  }
