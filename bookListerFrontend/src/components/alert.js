class Alert {

    constructor(container){
      this.container = container
    }

    stopAlert(){
      clearTimeout(this.timeout)
      this.container.innerHTML = ''
    }

    render(msg, type, timeout){
        const html = `
            <div class="alert alert-${type} red-text" role="alert">
                ${msg}
            </div>
            `
        this.container.innerHTML = html
        this.timeout = setTimeout(() => {
          this.container.innerHTML = ''
        }, timeout)

        }
  }
