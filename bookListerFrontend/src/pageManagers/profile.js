class ProfilePage extends PageManager{

  constructor(container, adapter){
      super(container)
      this.adapter =  new ProfileAdapter(adapter)
      this.user = null;
    }

    initBindingsAndEventListeners() {
      return null
    }

  async fetchAndRenderPageResources() {
    try {
      const lists = await this.adapter.getLists()
      this.container.innerHTML = lists.map(l => l.name).join('')
    } catch(err) {
        this.handleError(err)
    }
  }


    get staticHTML() {
        return (`
          <h1>Your Profile Page</h1>
          `)
      }


}
