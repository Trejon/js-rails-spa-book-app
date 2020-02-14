class WelcomePage extends PageManager {


  initBindingsAndEventListeners() {

  }

  get staticHTML(){
    return (`
      <h1>Welcome to <a href='#'>Book</a> Lister</h1>
      <h4>Please <a href='#' id='signup'>Signup</a> or <a href='#' id="login">Login</a></h4>
      `)
    }


}
