class User{
  constructor(user){
    const { id, email, name, lists } = user
      this.id = id
      this.email = email
      this.name = name
      this.lists = lists.map(list => new List(list))
    }

    get profileHTML() {
      return (`
          <h2>Welcome ${this.name}!</h2>
          <h3>Your Lists:</h3>
          <ul>
              ${this.lists.map(list => list.liAndLinkHTML).join('')}
          </ul>
        `)
    }


}
