class App{
  constructor(){

    this.adapter = new BaseAdapter()

    this.initBindingsAndEventListeners()
    this.router = new Router({
      'welcome': new WelcomePage(this.pageContainer, this.adapter),
      'login': new LoginPage(this.pageContainer, this.adapter),
      'signup': new SignupPage(this.pageContainer, this.adapter),
      'profile': new ProfilePage(this.pageContainer, this.adapter)
    })
    this.router.assignCallback(this.pageManagerRedircet.bind(this))
    this.renderPage('welcome')
  }

  initBindingsAndEventListeners() {
    this.container = document.querySelector('#app-container')
    this.navbarContainer = document.querySelector('#navbar-container')
    this.pageContainer = document.querySelector('#page-container')
    this.alertContainer = document.querySelector('#alert-container')
  }

  pageManagerRedircet(page){
    this.renderPage(page)
  }

  renderPage(page){
    this.router.render(page)
  }

}
