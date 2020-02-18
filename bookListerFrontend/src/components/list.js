class List{
    constructor(list){
      const { id, name, description } = list
        this.id = id
        this.name = name
        this.description = description
      }

    static formHTML(list) {
          return(`
            <form id="${list ? 'edit' : 'new'}-list-form">
                ${list ? `<input type='hidden' value="` + list.id + `">` : ''}
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Name" value=${list ? list.name : ''} required >
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
            <h2>${this.name}</h2>
            <p>Description:\n${this.description ? this.description : "None"}</p>
            <button data-id=${this.id} id="edit-list">Edit</button>
          `)
        }

      get liAndLinkHTML() {
        return `<br><li><a href="#" data-id=${this.id}>${this.name} - ${this.description}</a></li>`
      }

      get listsHTML() {
        return (`
          <h2>Welcome to your lists page</h2>
          <h3>Here's Your lists:</h3>
          <br>
          `)
      }
}
