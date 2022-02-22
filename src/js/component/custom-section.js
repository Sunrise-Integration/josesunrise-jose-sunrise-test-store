import axios from "axios";
export class Section {

    constructor(){
        const secondText = document.getElementById('second-text');
        const API = 'https://cdn.contentful.com/spaces/1n73dxemtec5/environments/master/entries/4pNKrSC2lodcn4MYp0rTZC?access_token=uVDKyEgCFZAd3YSs8uW3Wuj9FcRK8h_ndItnFRqbxQ4';
        const data = this.bringText(API);

        data.then(response=> {
            secondText.innerHTML = response.fields.alertBanner
        }).catch(error=>{
            console.log(error)
        })

        this.updateMyCart()
        this.clickAddtoCart()
    }

    updateMyCart() {
        const cartInfo = document.getElementById('cart-text');
        const cart = this.bringText('/cart.js');
        cart.then(response=> {
            cartInfo.innerHTML = response.item_count
        }).catch(error=>{
            console.log(error)
        })
    }

    async bringText(apiroute) {
        try {
            const response = await axios.get(apiroute)
            const content = await response.data
            return content
        } catch (error) {
            console.error(`Error: ${error.message}`)
        }
    }

    clickAddtoCart = () =>{
        let items = { items: [ { id: 42517224194277, quantity: 1 } ] };
        let element = document.getElementById('mistery-add_to_cart');
        element.addEventListener('click',()=>{
            this.addToCart(items);
        });
    }

    async addToCart(items) {
        try {
          const response = await axios.post('/cart/add.js', items)
          const data = response.data;
          this.updateMyCart()
        } catch (error) {
          console.error(`Error: ${error}`)
        }
      }


}

