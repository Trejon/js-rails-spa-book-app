class Book{
    constructor(book){
      const { id, title, author, genre, description, page_count, reviews, lists} = book
        this.id = id
        this.title = title
        this.author = author
        this.genre = genre
        this.description = description
        this.page_count = page_count
        this.reviews = reviews
        this.lists = lists
      }

      static formHTML(book) {
            return(`
              <form id="${book ? 'edit' : 'new'}-book-form">
                  ${book ? `<input id="hidden" type='hidden' value="` + book.id + `">` : ''}
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="title">Title</label>
                      <textarea class="form-control" id="title" rows="3">${book ? book.title : ''}</textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="author">Author</label>
                      <textarea class="form-control" id="author" rows="3">${book ? book.author : ''}</textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="genre">Genre</label>
                       <textarea class="form-control" id="genre" rows="3">${book ? book.genre : ''}</textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="description">Description</label>
                       <textarea class="form-control" id="description" rows="3">${book ? book.description : ''}</textarea>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="page_count">Pages</label>
                      <input type="text" class="form-control" id="page_count" placeholder="Pages" value=${book ? book.page_count : ''} required >
                    </div>
                  </div>
                <button type="submit" class="btn btn-primary">${book ? 'Update' : 'Create'}</button>
              </form>
              `)
        }

        get formHTML() {
            return Book.formHTML(this)
          }

        get profileLiAndLinkHTML() {
            return `<br><li data-id=${this.id}><a href="#" id="books-list">${this.title}</a><button id="delete" type="submit" class="btn-floating btn waves-effect waves-light light-blue lighten-2 right"><i class="material-icons" style="font-size: 20px">delete_forever</i></li>`
        }

      get liAndLinkHTML() {
        return `<br><li data-id=${this.id}><a href="#" id="books-list">${this.title} - ${this.author}</a><button id="delete" type="submit" class="btn-floating btn waves-effect waves-light light-blue lighten-2 right"><i class="material-icons" style="font-size: 20px">delete_forever</i></li>`
      }

      get booksHTML() {
        return (`
          <h2>Welcome to your books page</h2>
          <h3>Your books:</h3>
          `)
      }

      get profileShowHTML() {
          return (`
              <h2>Title: ${this.title}</h2>
              <h4>Author: ${this.author}</h4>
              <h4>Genre: ${this.genre}</h4>
              <h4>Pages: ${this.page_count}</h4>
              <h4>What's it about:<br><br> ${this.description}</h4>
              `)
      }

      get showHTML() {
        debugger
        return (`
            <h2>Title: ${this.title}</h2>
            <h4>Author: ${this.author}</h4>
            <h4>Genre: ${this.genre}</h4>
            <h4>Pages: ${this.page_count}</h4>
            <h4>What's it about:<br><br> ${this.description}</h4>
            <button data-id=${this.id} id="edit-book">Edit</button>

            <h1>Your Reviews for This Book: </h1>
            <ul>
            <li>Ratings: ${this.reviews.map(review => review.rating).join(',  ')}</li>
            <li>Content: ${this.reviews.map(review => review.content).join('  -')}</li>
            </ul>

            <h1>Add Another Review:</h1>
            <form id="new-review-form">
              <input id="hidden" type='hidden' value="${this.id}">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="rating">Rating</label>
                    <input type="text" class="form-control" id="rating" placeholder="Rating"  required >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="content">Content</label>
                     <textarea class="form-control" id="content" rows="3"></textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                      <label for="date">Date Finished</label>
                     <input type="date" class="datepicker">
                  </div>
                </div>
              <button id="new-list" type="submit" class="btn btn-primary">Add New Review</button>
            </form>
          `)
        }

        // get bookReviews(){
        //   return (`
        //     <h1>Reviews For This Book:</h1>
        //     <h3>Ratings: ${this.reviews.map(review => review.rating)}</h3>
        //     <h3>Reviews: ${this.reviews.map(review => review.content)}</h3>
        //     `)
        // }
    }
    // <h1>Reviews For This Book:</h1>
    // <h3>Ratings: ${this.reviews ? this.reviews.map(review => review.rating).join(' ') : ''}</h3>
    // <h3>Reviews: ${this.reviews ? this.reviews.map(review => review.content).join(' ') : ''}</h3>
