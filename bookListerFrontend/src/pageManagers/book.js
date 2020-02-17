class BookPage extends PageManager{

  constructor(container, adapter){
    super(container)
    this.adapter = new BookAdapter(adapter)
    this.book = null;
  }

  initBindingsAndEventListeners(){
    return null
  }

  get staticHTML() {
    return (`
    <h1>Your Books:</h1>
    `)
  }
}
