// const input = document.querySelector('input[name="price"]')
// input = addEventListener("keydown", function(event){
    
//     setTimeout(function(){

//         let { value } = event.target
    
//         value = value.replace(/\D/g, "")

//         value = new Intl.NumberFormat('pt-BR', {
//             style: 'currency',
//             currency: 'BRL'
//         }).format(value/100)
//     },1)
//         event.target.value = value

// })

// puxaremos essa função diretamente no arquivo .njk através do onkeydown="Mask.apply(this, 'formatBRL'" no input
const Mask = {
    apply(input, func) {
        setTimeout(function(){
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}

//função p/ gerenciar o upload de imagens no front

const PhotosUpload = {
    uploadLimit: 6,
    handleFileInput(event){
        const { files: fileList } = event.target //files oriundos do input = event.target
        const { uploadLimit } = PhotosUpload

        //restrição para o primeiro upload de arquivos não ultrapassar o uploadLimit
        if( fileList.length > uploadLimit ) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return
        }

        Array.from(fileList).forEach( file => {
            
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = document.createElement('div')
                div.classList.add('photo')

                div.onclick = () => alert('remover')

                div.appendChild(image)

                document.querySelector('#photos-preview').appendChild(div)
            }

            reader.readAsDataURL(file)
        })
        

    }
}