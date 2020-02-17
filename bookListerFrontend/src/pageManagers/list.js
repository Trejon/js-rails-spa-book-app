class ListPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new BookAdapter(adapter)
  }

  initBindingsAndEventListeners(){
    return null
  }

  get staticHTML() {
    return (`
    <h1>Your Lists:</h1>
    `)
  }

}
