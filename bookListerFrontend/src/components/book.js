class Book{
    constructor(book){
      const { id, title, author, genre, description, page_count } = book
        this.id = id
        this.title = title
        this.author = author
        this.genre = genre
        this.description = description
        this.page_count = page_count
      }

      get liAndLinkHTML() {
        return `<li><a href="#" data-id=${this.id}>${this.title} - ${this.author}</a></li>`
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
            <h4>Description: <br><br> ${this.description}</h4>
            <button data-id=${this.id} id="edit-list">Edit</button>
          `)
        }

    }
