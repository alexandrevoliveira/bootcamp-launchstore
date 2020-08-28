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
    },
    cpfCnpj(value) {
        value = value.replace(/\D/g, "")

        if(value.length > 14) {
            value = value.slice(0, -1)
        }

        // check if is cnpj - 11.222.333/0001-11
        if(value.length > 11) {
            // 11.222333000111
            value = value.replace(/(\d{2})(\d)/, "$1.$2")

            // 11.222.333000111
            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            // 11.222.333/000111
            value = value.replace(/(\d{3})(\d)/, "$1/$2")

            // 11.222.333/0001-11
            value = value.replace(/(\d{4})(\d)/, "$1-$2")

            // ou
            // value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5")
            // expressões regulares
            // () ==> placeholder

        } else {
            // 111.22233344
            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            // 111.222.33344
            value = value.replace(/(\d{3})(\d)/, "$1.$2")

            // 111.222.333-44
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }

        return value
    },
    cep(value) {
        value = value.replace(/\D/g, "")

        if(value.length > 8) {
            value = value.slice(0, -1)
        }
            
        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value
    }
}

//função p/ gerenciar o upload de imagens no front
const PhotosUpload = {
    input: "",
    uploadLimit: 6,
    preview: document.querySelector('#photos-preview'),
    files: [],
    handleFileInput(event){
        const { files: fileList } = event.target //files oriundos do input = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach( file => {

            PhotosUpload.files.push(file)

            
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input
        
        //restrição para o primeiro upload de arquivos não ultrapassar o uploadLimit
        if( fileList.length > uploadLimit ) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo"){
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length

        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "delete"
        
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if(removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()

    }

}

//funções para organizar e setar corretamente as imagens da galeria de imagens
const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e) {
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add("active")

        Lightbox.image.src = target.src
        ImageGallery.highlight.src = target.src
    }
}
const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0
    },
    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if(results.error) {
            Validate.displayError(input, results.error)
        }
        
    },
    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)        
        input.focus()
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")
        if (errorDiv) {
            errorDiv.remove()
        }
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        // expressões regulares
        // ^ ==> tem que começar com alguma coisa
        // + ==> 1 ou mais vezes
        // () ==> parenteses para agrupar uma ideia
        // [] ==> chaves para passar alguns caracteres que vão ser permitidos
        // para permitir o caracter de '.' precisamos passar uma '\' antes, pois o '.' em expressões regulares tem outro valor
        // ? ==> uso facultativo
        // * ==> significa que pode ter nenhum ou muitos
        // {2,3} ==> 2 ou 3 items
        // $ ==> tem que terminar com isso

        if (!value.match(mailFormat)) {
            error = "Email inválido"
        }

        return {
            error,
            value
        }
    },
    isCpfCnpj(value) {
        let error = null

        const cleanValues = value.replace(/\D/g, "")

        if (cleanValues.length > 11 && cleanValues.length !== 14) {
            error = "CNPJ incorreto"
        }
        else if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = "CPF incorreto"
        }

        return {
            error,
            value
        }
    },
    isCep(value) {
        let error = null

        const cleanValues = value.replace(/\D/g, "")

        if (cleanValues.length !== 8) {
            error = "CEP incorreto"
        }

        return {
            error,
            value
        }
    }
}