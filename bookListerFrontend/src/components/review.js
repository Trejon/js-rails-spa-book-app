class Review{
    constructor(review){
      const { id, rating, content, date } = review
        this.id = id
        this.rating = rating
        this.content = content
        this.date = date
      }

      static formHTML(review) {
            return(`
              <form id="${review ? 'edit' : 'new'}-review-form">
                  ${review ? `<input type='hidden' value="` + review.id + `">` : ''}
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="rating">Rating</label>
                      <input type="text" class="form-control" id="rating" placeholder="Rating" value=${review ? review.rating : ''} required >
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
                      <label for="date">Date</label>
                      <input type="text" class="form-control" id="date" placeholder="Date" value=${review ? review.date : ''} required >
                    </div>
                  </div>
                <button type="submit" class="btn btn-primary">${review ? 'Update' : 'Create'}</button>
              </form>

              `)
        }

        get formHTML() {
            return Review.formHTML(this)
          }


        get showHTML() {
          return (`
              <h2>${this.rating}</h2>
              <p>Description:\n${this.content ? this.content : "None"}</p>
              <button data-id=${this.id} id="edit-review">Edit</button>
            `)
          }

        get liAndLinkHTML() {
          return `<li><a href="#" data-id=${this.id}>${this.rating} - ${this.content}</a></li>`
        }

        get reviewHTML() {
          return (`
              <h2>Welcome ${this.name}!</h2>
              <h3>Your Reviews:</h3>
              <ul>
                  ${this.reviews.map(review => review.liAndLinkHTML).join('')}
              </ul>
              <button class="btn btn-primary">Create</button>
            `)
        }



  }
