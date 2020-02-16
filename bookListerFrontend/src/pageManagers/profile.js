class ProfilePage extends PageManager{

  constructor(container, adapter){
      super(container)
      this.adapter =  new ProfileAdapter(adapter)
      this.user = null;
    }

    initBindingsAndEventListeners() {
      return null
    }

    profileBindingAndEventListeners() {
      const userList = this.container.querySelector('ul')
      userList.addEventListener('click', this.handleListClick.bind(this))
  }

  listBindingsAndEventListeners() {
    const editButton = this.container.querySelector('button')
    editButton.addEventListener('click', this.formalizeList.bind(this))
  }

  handleListClick(e) {
    if(e.target.tagName === 'A'){
      const listId = e.target.dataset.id
      const list = this.getListById(listId)
      this.renderList(list)
    }
}

formalizeList(e){
      e.preventDefault()
      const id = e.target.dataset.id
      const list = this.user.lists.find(list => list.id == id)
      if(list){
          this.container.innerHTML = list.formHTML
          // this.listBindingsAndEventListeners()
      } else {
          this.handleError({
            type: "404 Not Found",
            msg: "List was not found"
          })
        }
      }

  async fetchAndRenderPageResources() {
    try {
      const userObj = await this.adapter.getUser()
      this.user = new User(userObj)
      this.renderUser()
    } catch(err) {
        this.handleError(err)
    }
  }

  getListById(id) {
    return this.user.lists.find(list => list.id == id)
  }


    get staticHTML() {
        return (`
          <div class="loader"></div>
          `)
      }

      renderList(list){
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

    renderUser() {
      this.container.innerHTML = this.user.profileHTML
      this.profileBindingAndEventListeners()
    }


}
