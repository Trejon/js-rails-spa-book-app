class ListPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new ListAdapter(adapter)
    this.lists = []
  }

  initBindingsAndEventListeners(){
    const form = this.container.querySelector('form')
    if (form){
    form.addEventListener('submit', this.handleListSubmit.bind(this))}

    // const listItems = this.container.querySelectorAll('li')

    // userList.addEventListener('click', this.handleListClick.bind(this))

  }

  renderNewForm() {
    this.container.innerHTML += `<form id="new-list-form">

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" placeholder="Name"  required >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="description">Description</label>
             <textarea class="form-control" id="description" rows="3"></textarea>
          </div>
        </div>
      <button id="new-list" type="submit" class="btn btn-primary">Add New List</button>
    </form>
    `
  }

 async handleListSubmit(e) {
      e.preventDefault()
      const name = e.target.querySelector('input').value
      const description = e.target.querySelector('textarea').value
      const params = {
          list: {
             name, description
          }
      }
      try{
         await this.adapter.createList(params)
         this.redirect('list')
      }catch(err)  {
        this.handleError(err)
      }
  }

  get staticHTML() {
    return (`
      <h2>Welcome to your lists page</h2>
      <h4>Your lists:</h4>
    `)
  }

  async fetchAndRenderPageResources() {
      try {
        const listsObj = await this.adapter.getLists()
        .then(lists => {
            lists.forEach(list => this.lists.push(new List(list)))
          })
        .then(() => this.renderLists(this.lists))
        .then(() => this.initBindingsAndEventListeners())
      } catch(err) {
          this.handleError(err)
      }
    }

    renderLists() {
      const uniqueLists = Array.from(new Set(this.lists.map(l => l.id)))
        .map(id => {
      return this.lists.find(a => a.id === id)
     })
      this.container.innerHTML += uniqueLists.map(list => list.liAndLinkHTML).join('')
      this.container.innerHTML += `<h1>Add New List</h1>`
      this.renderNewForm()
    }

    async handleBookSubmit(e) {
         e.preventDefault()
         const name = e.target.querySelector('input').value
         const description = e.target.querySelector('textarea').value
         const params = {
             list: {
                name, description
             }
         }
         try{
            await this.adapter.createList(params)
            this.redirect('list')
         }catch(err)  {
           this.handleError(err)
         }
     }
}
