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