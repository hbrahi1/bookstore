module.exports = (srv) =>  {

    srv.on('READ', 'zlabia', ()=> {
        console.log('reading zlabia...');
        return [
            {"ID":123, "name": "AAA"},
            {"ID":456, "name": "BBB"}
        ]
    })

}