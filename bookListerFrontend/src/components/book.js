class Book{
    constructor(book){
      const { id, title, author, genre, description, page_count, reviews} = book
        this.id = id
        this.title = title
        this.author = author
        this.genre = genre
        this.description = description
        this.page_count = page_count
        this.reviews = reviews
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

      get liAndLinkHTML() {
        return `<br><li><a href="#" data-id=${this.id}>${this.title} - ${this.author}</a></li>`
      }

      get booksHTML() {
        return (`
          <h2>Welcome to your books page</h2>
          <h3>Your books:</h3>
          `)
      }

      get showHTML() {
        return (`
            <h2>${this.title}</h2>
            <h4>Author: ${this.author}</h4>
            <h4>Genre: ${this.genre}</h4>
            <h4>Pages: ${this.page_count}</h4>
            <h4>Description: <br> ${this.description}</h4>
            <button data-id=${this.id} id="edit-book">Edit</button>
          `)
        }
    }
