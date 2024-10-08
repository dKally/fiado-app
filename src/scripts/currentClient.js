const { ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs')

const clientsFolder = ipcRenderer.sendSync('clientsFolder');

const urlParams = new URLSearchParams(window.location.search)
const currentClient = urlParams.get('currentClient')
console.log(currentClient)

let currentClientPath


document.addEventListener('DOMContentLoaded', function() {
    const folder = urlParams.get('folder');

    if(currentClient == undefined){
        currentClientPath  = clientsFolder + "/" + folder
        console.log(currentClientPath)
    } else{
        currentClientPath  = clientsFolder + "/" + currentClient
        console.log(currentClientPath)
    }

    const registerClientPath = currentClientPath + "/" + "Cadastro.json"

    fs.readFile(registerClientPath, 'utf8', (error, data) => {
        if (error) {
          console.error(error)
          return
        }
        setTimeout(()=> {
            console.log(data)
      
            const jsonObject = JSON.parse(data)
            const client = jsonObject.client
        


            // Formatar CPF

            if(client.cpf === ""){
                console.log('Nenhum CPF registrado!')
            }
            else{

                const cpfString = client.cpf.toString()

                const formattedCPF = cpfString.slice(0, 3) + '.' +
                cpfString.slice(3, 6) + '.' +
                cpfString.slice(6, 9) + '-' +
                cpfString.slice(9);

                document.querySelector('#cpf').innerText = formattedCPF
                
            }

            // Formatar CPF


            // Formatar Número

            if(client.phone === ""){
                console.log('Nenhum número registrado!')
            }
            else{

                const phoneString = client.phone.toString()


                const formattedPhone = `(${phoneString.slice(0, 2)}) ` +
                `${phoneString.slice(2, 7)}-${phoneString.slice(7)}`;

                document.querySelector('#phone').innerText = formattedPhone

            }


            // Formatar Número
            

            document.querySelector('#name').innerText = client.name
            document.querySelector('#last-name').innerText = client.lastName


        }, 500)

      })

})

document.addEventListener('DOMContentLoaded', function() {

    const purchasesScript = document.createElement('script');
    purchasesScript.src = '../scripts/purchases.js';
    document.body.appendChild(purchasesScript);
})
