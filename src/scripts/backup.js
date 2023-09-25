const fs = require('fs')
const zip = require('zip-local')
const path = require('path')
const os = require('os')

function saveBackup() {
    const clientsPaste = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP')

    const clientsZip = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP.zip')


  zip.sync.zip(clientsPaste).compress().save(clientsZip);

  console.log(`Backup da pasta "${clientsPaste}" criado com sucesso em "${clientsZip}".`);
}

saveBackup()