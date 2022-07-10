class Response {
    constructor(status, message) {
      this.status = status;
      this.message = message;
      this.success = undefined;
    }

    display() {
      const msg = this.status + this.message + this.success
      return (msg);
    }
}

class Error extends Response {
    constructor(status, message) {
        super(...arguments);
        this.success = false;
      }
}

class Success extends Response {
    constructor(status, message, data) {
        super(...arguments);
        this.success = true;
        this.data = data
      }
}

export {Error, Success}
