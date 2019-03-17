const randoms = {
  prefix: 'word-',
  get(id) {
    try {
      return JSON.parse(localStorage.getItem(id))
    } catch (e) {
      return null
    }
  },
  all() {
    return Array(localStorage.length).fill().map((_, i) => {
      const key = localStorage.key(i)
      console.log(key)
      return key.includes(this.prefix)
        ? this.get(key)
        : null
    }).filter(item => item)
  },
  /**
   * 
   * @param {Object} random random object to save
   * @param {String} random.id id of the random object
   * @param {String} random.name id of the random object
   * @param {Array.<String>} random.words Contain all words
   */
  save(random) {
    random.id = this.prefix + (Math.random() * 100000).toFixed(0)
    if (!random.words) random.words = []
    this.update(random)
    return random
  },

  /**
   * 
   * @param {Object} random random object to save
   * @param {String} random.id id of the random object
   * @param {String} random.name id of the random object
   * @param {Array.<String>} random.words Contain all words
   */
  delete(random) {
    localStorage.removeItem(random.id)
  },
  /**
   * 
   * @param {Object} random random object to save
   * @param {String} random.id id of the random object
   * @param {String} random.name id of the random object
   * @param {Array.<String>} random.words Contain all words
   */
  update(random) {
    localStorage.setItem(random.id, JSON.stringify(random))
    return random
  }
}

export default randoms