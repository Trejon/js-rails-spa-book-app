class ListPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new ProfileAdapter(adapter)
    this.lists = null
  }

  initBindingsAndEventListeners(){
    return null
  }

  get staticHTML() {
    return (`
    <h1>Your Lists:</h1>
    `)
  }

  async fetchAndRenderPageResources() {
      try {
        const listsObj = await this.adapter.getUser()
        const lists = new List(listsObj)
        this.container.innerHTML = lists.listsHTML
      } catch(err) {
          this.handleError(err)
      }
    }


}
