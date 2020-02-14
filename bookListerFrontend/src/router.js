class Router {

  constructor(kvpairs){
    this.routes = kvpairs
  }

  set rootPage(rootPageKey){
    this.rootPage = this.routes[rootPageKey]
  }

  render(page){
      this.routes[page].render()
    }

  assignCallback(callback){
      for(let route in this.routes){
        this.routes[route].redirect = callback
      }
    }



}
