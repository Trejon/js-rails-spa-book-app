class SignupPage extends PageManager{

  constructor(container, adapter){
      super(container)
      this.adapter = new SignupAdapter(adapter)
  }

  initBindingsAndEventListeners() {
      this.form = this.container.querySelector('#signup-form')


      this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

  handleSubmit(e) {
      e.preventDefault()
      const inputs = Array.from(e.target.querySelectorAll('input'))
      const [firstName, lastName, email, password] = inputs.map(input => input.value)
      const name = `${firstName} ${lastName}`
      const params = {
          user: {
            name, email, password
          }
      }
      this.adapter.signup(params)
  }


    get staticHTML() {
        return (`
          <h2>Sign Up</h2>
          <form class="col s12" id="signup-form">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="first-name">First Name</label>
              <input type="text" class="validate" id="first-name" placeholder="First Name" required>
            </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="last-name">Last Name</label>
                <input type="text" class="validate" id="last-name" placeholder="Last Name" required>
              </div>
              </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="email">Email</label>
                <input type="email" class="validate" id="email" placeholder="Email" required >
              </div>
              <div class="form-group col-md-6">
                <label for="password">Password</label>
                <input type="password" class="validate" id="password" placeholder="Password" required>
              </div>
            </div>
              <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>`
        )
      }
}
