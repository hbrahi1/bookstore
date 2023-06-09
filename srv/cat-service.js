const cds = require('@sap/cds')
module.exports = async function (){

  const db = await cds.connect.to('db') // connect to database service
  const { Books } = db.entities         // get reflected definitions

  // Reduce stock of ordered books if available stock suffices
  this.on ('submitOrder', async req => {
    const {book,quantity} = req.data
    const n = await UPDATE (Books, book)
      .with ({ stock: {'-=': quantity }})
      .where ({ stock: {'>=': quantity }})
    n > 0 || req.error (409,`${quantity} exceeds stock for book #${book}`)
  })

  // Add some discount for overstocked books
  this.after ('READ','Books', each => {
    if (each.stock > 111)  each.title += ` -- 11% discount!`
  })

  //define function import
  this.on('hello' , req => `Hello ${req.data.to} !!!`)

  this.on('sumUnbound', req => (
    { sum: req.data.a + req.data.b, text: 'Green'}
  ))

  this.on('sumBound', 'Books', async req => {
    const data = await cds.run(req.query)
    return { sum: req.data.a + req.data.b, text: data[0].title.substring(0,3) }
  })  

  this.after('READ', 'Authors', (authors,req) => {
    return authors.map( async author => {
      const publications = await cds.transaction(req).run(
        SELECT.from(Books).where({author_ID:author.ID})
      )
      author.numberOfBooks = publications.length
    }

    )
  })
  
}
