const fs = require('fs')
const zip = require('zip-local')
const path = require('path')
const os = require('os')
const { shell } = require('electron')

document.querySelector('.save-backup').addEventListener('click', ()=>{
    saveBackup()
})

document.querySelector('.open-backup').addEventListener('click', ()=>{
    openBackupPaste()
})

function saveBackup() {
    const clientsPaste = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP')

    const clientsZip = path.join(os.homedir(), 'Documentos', 'Clientes FiadoAPP.zip')


  zip.sync.zip(clientsPaste).compress().save(clientsZip);

  alert(`Backup da pasta "${clientsPaste}" criado com sucesso em "${clientsZip}".`);
}

function openBackupPaste(){
    shell.openPath(path.join(os.homedir(), 'Documentos'))
}
