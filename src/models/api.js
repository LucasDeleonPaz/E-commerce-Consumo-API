// GETS DOS ELEMENTOS DA PÁGINA HTML

const contenteGeneral = document.getElementById('content')


// CLASSE QUE CONSOME A API E RETORNA OS VALORES 

class Api {
    
    static URLBASE = 'https://m2-kenzie-shop.herokuapp.com/products'
    
    static async getProducts(){
        const response = await fetch(this.URLBASE)
        const data = await response.json()
        return data
    }

    static async createCard(){
        const data = await this.getProducts();
        const dataProduct = await data.products
        dataProduct.forEach(element => {
            Create.card(element);
        });        
    }
}

// CLASSE QUE CRIA OS CARDS E ALIMENTA AS INFORMAÇÕES

class Create {
    static async card(element){
        // ATRIBUTOS DE CRIAÇÃO DOS ELEMENTOS DOS CARDS

        let content = document.createElement('div');
        let img = document.createElement('img');
        let divReview = document.createElement('div')
        let divParag = document.createElement('div')
        let divAbout = document.createElement('div')
        let about = document.createElement('p');
        let divPrice = document.createElement('div');
        let price = document.createElement('span');
        let button = document.createElement('button');

        // SET DE CLASSES E IDS PARA ESTILIZAÇÃO

        content.setAttribute('id', 'content--card');
        img.classList.add('content--img')
        divReview.classList.add('review');
        divParag.classList.add('product--info-div');
        divAbout.classList.add('product--info-parag');
        about.classList.add('product--info');
        divPrice.classList.add('product--price-div');
        price.classList.add('product--price');
        button.setAttribute('id', 'content--button');

        // ATRIBUIÇÃO DOS VALORES PARA CRIAÇÃO DOS CARDS

        img.src = `https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${element.id}/Image.png`;
        about.textContent = element.productName;
        price.textContent = priceType(element);
        button.textContent = 'Comprar';

        // INCLUSÃO DOS ELEMENTOS NA DIV CONTENT

        inputReview(divReview, element.reviews);
        divAbout.append(about)
        divPrice.append(price)
        divParag.append(divAbout, divPrice)
        content.append(img, divReview, divParag, button);
        contenteGeneral.append(content);
    }
}

// FUNÇÃO QUE CONFERE E IMPUTA A QUANTIDADE DE ESTRELAS DE ACORDO COM O REVIEW

function inputReview (content, qtd) {
    for(let i = 0 ; i < qtd ; i++){
        let review = document.createElement('img');
        review.classList.add('review--img');
        review.src = './src/IMG/review.png'
        content.append(review)
    }
}

// FUNÇÃO QUE CONFERE SE EXISTE O PREÇO PROMOCIONAL E IMPUTA, CASO EXISTA.

function priceType(element) {
    if(element.price.productPromotionPrice !== undefined && element.price.productPromotionPrice !== 0 ){
        return `DE: R$${element.price.productPrice},00 POR: R$${element.price.productPromotionPrice},00`
    }
    return `R$ ${element.price.productPrice},00` 
}

export { Api }
