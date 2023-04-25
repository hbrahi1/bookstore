module.exports = ( async function () {

    const cds = require('@sap/cds')
    const bupa = await cds.connect.to('API_BUSINESS_PARTNER')

    this.on('READ', 'Participants', (req) => {
        console.log('----------> read participants')
        return bupa.run(req.query)
    })

})
