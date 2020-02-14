class Navbar extends PageManager {

  constructor(container, adapter){
    super(container)
    this.adapter = adapter
  }

  get is_authenticated() {
    return !!this.adapter.token
  }

  initBindingsAndEventListeners(){

    this.container.addEventListener('click', this.handleClick.bind(this))

  }

  handleClick(e) {
    if(e.target.tagName === 'A'){
      const route = e.target.id.split('-')[0]
      this.redirect(route)
  }
}

  get staticHTML(){
    if (this.is_authenticated){
      return (`
        <nav>
        <nav class="nav-wrapper black">
          <a href="#" class="brand-logo right">Book Lister</a>
          <div class="left hide-on-small-and-down" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <li><a id="books-link" href="#"><i class="material-icons left">collections_bookmark</i>Books</a></li>
              <li class="nav-item">
                <a class="nav-link" id="lists-link" href="#">Lists</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="reviews-link" href="#">Reviews</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="logout-link" href="#">Log Out</a>
              </li>
          </ul>
          </div>
        </nav>
        </nav>
        `)
    } else {
      return (`
        <nav>
        <nav class="nav-wrapper black">
          <a href="#" class="brand-logo right">Book Lister</a>
          <div class="left hide-on-small-and-down" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <li><a id="welcome-link" href="#"><i class="material-icons left">collections_bookmark</i>Welcome</a></li>
              <li class="nav-item">
                <a id="login-link" class="nav-link" id="login-link" href="#">Log In</a>
              </li>
              <li class="nav-item">
                <a id="signup-link" class="nav-link" id="signup-link" href="#">Sign Up</a>
              </li>
          </ul>
          </div>
        </nav>
        </nav>
        `)
    }
  }
}
