class ListPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new ListAdapter(adapter)
    this.lists = []
  }

  initBindingsAndEventListeners(){
    const form = this.container.querySelector('form#new-list-form')
    if (form){
      form.addEventListener('submit', this.handleListSubmit.bind(this))}

    const userLists = this.container.querySelector('ul#lists')
    if(userLists){
    userLists.addEventListener('click', this.handleListClick.bind(this))}

    const deleteButtons = this.container.querySelectorAll('button#delete')
    if(deleteButtons){
      for (var i = 0 ; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click' , this.handleDelete.bind(this))}}
  }

    handleDelete(e){
      e.preventDefault()
      const liId = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'))
      const listItem = this.getListById(liId)
      this.lists = this.lists.filter(list => list.id != liId)
      this.adapter.deleteList(listItem)
      e.target.parentNode.parentNode.remove()
    }

  async handleListClick(e) {
    if(e.target.tagName === 'A'){
      const listId = e.target.parentNode.dataset.id
      const listObj = await this.adapter.getListById(listId)
      this.list = new List(listObj)
      this.renderClickedList(this.list)
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
    if (editButton){
    editButton.addEventListener('click', this.formalizeList.bind(this))}

    const addBookForm = this.container.querySelector('form#new-book-form')
    if(addBookForm){
    addBookForm.addEventListener('submit', this.handleBookSubmit.bind(this))}
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
        const id = this.list.id
        const [name, description] = Array.from(e.target.querySelectorAll('textarea')).map(input => input.value)

        const params = { name, description, id }
        const list = this.list
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
    }


  renderNewForm() {
    this.container.innerHTML += List.formHTML()
  }

 async handleListSubmit(e) {
      e.preventDefault()
      const name = e.target.querySelector('#name').value
      const description = e.target.querySelector('#description').value
      const params = {
          list: {
             name, description
          }
      }
      try{
         await this.adapter.createList(params)
         this.lists.push(params.list)
         this.redirect('list')
      }catch(err)  {
        this.handleError(err)
      }
  }

  get staticHTML() {
    return (`
      <div class="loader"></div>
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
        <h1>Welcome To Your Lists Page</h1>
        <h4>Your Created Lists:</h4>
        <ul id="lists">
            ${list.map(list => list.liAndLinkHTML).join('')}
        </ul>
        `)
    }

    async handleBookSubmit(e) {
         e.preventDefault()
         const title = e.target.getElementsByTagName('textarea')[0].value
         const author = e.target.getElementsByTagName('textarea')[1].value
         const genre = e.target.getElementsByTagName('textarea')[2].value
         const description = e.target.getElementsByTagName('textarea')[3].value
         const page_count = e.target.getElementsByTagName('input')[1].value
         const list_ids = e.target.getElementsByTagName('input')[0].value
         const lists = this.getListById(list_ids)
         const params = {
             book: {
                title, author, genre, description, page_count, list_ids
             }
         }
         try{
            const book = await this.adapter.createBook(params)
            lists.books.push(book)
            this.renderClickedList(lists)
         }catch(err)  {
           this.handleError(err)
         }
     }
   }
