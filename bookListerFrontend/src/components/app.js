class App{
  constructor(){

    this.adapter = new BaseAdapter()

    this.initBindingsAndEventListeners()

    this.alertManager = new Alert(this.alertContainer)

    this.router = new Router({
      'welcome': new WelcomePage(this.pageContainer, this.adapter),
      'login': new LoginPage(this.pageContainer, this.adapter),
      'signup': new SignupPage(this.pageContainer, this.adapter),
      'profile': new ProfilePage(this.pageContainer, this.adapter)
    })
    const navbar = new Navbar(this.navbarContainer, this.adapter)

    this.router.assignAlertHandler(this.handleAlert.bind(this))
    this.router.assignNavbar(navbar)
    this.router.assignRedirect(this.pageManagerRedircet.bind(this))
    this.renderPage('welcome')
  }

  initBindingsAndEventListeners() {
    this.container = document.querySelector('#app-container')
    this.navbarContainer = document.querySelector('#navbar-container')
    this.pageContainer = document.querySelector('#page-container')
    this.alertContainer = document.querySelector('#alert-container')
  }

  handleAlert(msg, type, timeout = 5000) {
      this.alertManager.render(msg, type, timeout)
  }

  pageManagerRedircet(page){
    this.renderPage(page)
  }

  renderPage(page){
    this.router.render(page)
  }

}
