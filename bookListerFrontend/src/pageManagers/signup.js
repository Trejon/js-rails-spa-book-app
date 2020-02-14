class SignupPage extends PageManager{

  initBindingsAndEventListeners() {
    this.form = this.container.querySelector('#signup-form')


    this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

  handleSubmit(e) {
    e.preventDefault()
    const inputs = Array.from(e.target.querySelectorAll('input'))
    const [email, password, name] = inputs.map(input => input.value)
    console.log(email, name)
  }


    get staticHTML() {
    return (`
      <h2>Sign Up</h2>
      <form class="col s12" id="signup-form">
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
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name">Name</label>
            <input type="text" class="validate" id="name" placeholder="Name" required>
          </div>
          </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
      </form>`
)
  }
}
