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
    }
