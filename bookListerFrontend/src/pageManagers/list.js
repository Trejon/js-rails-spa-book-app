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

    const userLists = this.container.querySelector('ul#lists')
    if(userLists){
    userLists.addEventListener('click', this.handleListClick.bind(this))}
  }

  handleListClick(e) {
    if(e.target.tagName === 'A'){
      const listId = e.target.dataset.id
      const list = this.getListById(listId)
      this.renderClickedList(list)
      }
  }

  renderClickedList(list) {
    if(list){
      this.container.innerHTML = list.showHTML
      this.listBindingsAndEventListeners()
    } else {
      this.handleError({
        type: "404 Not Found",
        msg: "List was not found"
      })
    }
  }

  listBindingsAndEventListeners() {
    const editButton = this.container.querySelector('button#edit-list')
    editButton.addEventListener('click', this.formalizeList.bind(this))
  }

  listFormBindingsAndEventListeners() {
    const form = this.container.querySelector('form')
    form.addEventListener('submit', this.handleUpdateList.bind(this))
  }

  formalizeList(e) {
    e.preventDefault()
    const id = e.target.dataset.id
    const list = this.getListById(id)
      if(list){
          this.container.innerHTML = list.formHTML
          this.listFormBindingsAndEventListeners()
      } else {
          this.handleError({
            type: "404 Not Found",
            msg: "List was not found"
          })
        }
  }

  getListById(id) {
    return this.lists.find(list => list.id == id)
  }

  async handleUpdateList(e){
        e.preventDefault()
        const id = e.target.querySelector('input').value
        const [name, description] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)

        const params = { name, description, id }
        const list = this.getListById(id)
        const oldList = new List({id, name, description})
          list.name = name
          list.description = description
          this.renderClickedList(list)
          try{
              const {id, name, description} = await this.adapter.updateList(params)
          }catch(err){
              list.name = oldList.name
              list.description = oldList.description
              this.renderClickedList(list)
              this.handleError(err)
          }
          this.fetchAndRenderPageResources()
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
      const uniqueLists = Array.from(new Set(this.lists.map(list => list.id)))
        .map(id => {
      return this.lists.find(list => list.id === id)
     })
      this.container.innerHTML += this.listsHTML(uniqueLists)
      this.container.innerHTML += `<h1>Add New List</h1>`
      this.renderNewForm()
    }

   listsHTML(list) {
      return (`
        <h4>Your Created Lists:</h4>
        <ul id="lists">
            ${list.map(list => list.liAndLinkHTML).join('')}
        </ul>
        `)
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
