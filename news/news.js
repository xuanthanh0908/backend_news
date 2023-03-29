const fs = require('fs')
class News {
  constructor(filename = 'news.json') {
    this.path = `./data/${filename}`
    try {
      fs.readdirSync('data')
    } catch (error) {
      fs.mkdirSync('data')
    }
    try {
      fs.accessSync(this.path)
    } catch (error) {
      fs.writeFileSync(this.path, '[]')
    }
  }
  createId() {
    return new Date().getTime().toString()
  }
  async create(data, id, imageFile) {
    const Totaldata = await this.getAll()
    Totaldata.push({
      id,
      ...data,
      thumbnail: `http://192.168.1.4:5000/${imageFile}`,
    })

    await fs.promises.writeFile(this.path, JSON.stringify(Totaldata, null, 2))
  }
  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.path))
  }
  async getSingle(id) {
    const data = await this.getAll()
    return data.find((item) => item.id === id)
  }
  async getByCategory(category) {
    const data = await this.getAll()
    return data.filter((item) => item.category === category)
  }
  async searchPosts(query) {
    try {
      const data = await this.getAll()
      return data.filter((news) =>
        news.title.toLowerCase().includes(query.toLowerCase()),
      )
    } catch (error) {
      console.log('Error while searching post.')
    }
  }
}

module.exports = News
