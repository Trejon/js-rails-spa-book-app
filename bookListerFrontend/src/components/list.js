class List{
    constructor(list){
      const { id, name, description, books } = list
        this.id = id
        this.name = name
        this.description = description
        this.books = books
        this.lists = []
      }

    static formHTML(list) {
          return(`
            <form id="${list ? 'edit' : 'new'}-list-form">
                ${list ? `<input type='hidden' value="` + list.id + `">` : ''}
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="name">Name</label>
                    <textarea class="form-control" id="name" rows="3">${list ? list.name : ''}</textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="description">Description</label>
                     <textarea class="form-control" id="description" rows="3">${list ? list.description : ''}</textarea>
                  </div>
                </div>
              <button type="submit" class="btn btn-primary">${list ? 'Update' : 'Create'}</button>
            </form>
            `)
      }

      get formHTML() {
          return List.formHTML(this)
        }


      get showHTML() {
        return (`
            <h1>List: ${this.name}</h1>
            <p>Description:\n${this.description ? this.description : "None"}</p>
            <button data-id=${this.id} id="edit-book">Edit</button>
            <button data-id=${this.id} id="delete-list">Delete</button>
            <h1>Books On This List:</h1>
            <h3>${this.books.map(book => book.title)}</h3>

            <h1>Add A Book To This List</h1>
            <form id="new-book-form">
              <input id="hidden" type='hidden' value="${this.id}">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="title">Title</label>
                    <textarea class="form-control" id="title" rows="3"></textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="author">Author</label>
                    <textarea class="form-control" id="author" rows="3"></textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="genre">Genre</label>
                     <textarea class="form-control" id="genre" rows="3"></textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="description">Description</label>
                     <textarea class="form-control" id="description" rows="3"></textarea>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="page_count">Pages</label>
                    <input type="text" class="form-control" id="page_count" placeholder="Pages" required >
                  </div>
                </div>
              <button type="submit" class="btn btn-primary">Add New Book</button>
            </form>
          `)
        }

      get liAndLinkHTML() {
        return `<br><li><a href="#" data-id=${this.id}>${this.name} - ${this.description}</a><button type="submit" class="btn-floating btn waves-effect waves-light light-blue lighten-2 right"><i class="material-icons" style="font-size: 20px">delete_forever</i></li>`
      }

      get profileLiAndLinkHTML() {
          return `<br><li data-id=${this.id}><a href="#" id="books-list">${this.name} - ${this.description}</a><button id="delete" type="submit" class="btn-floating btn waves-effect waves-light light-blue lighten-2 right"><i class="material-icons" style="font-size: 20px">delete_forever</i></li>`
      }
}
