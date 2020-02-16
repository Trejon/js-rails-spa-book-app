class List{
  constructor(list){
    const { id, name, description } = list
      this.id = id
      this.name = name
      this.description = description
  }

  get liAndLinkHTML() {
      return `<li><a href="#" data-id=${this.id}>${this.name} - ${this.description}</a></li>`
  }



}
