if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready)
}else{
  ready()
}//verific daca pagina s a terminat de incarcat ca sa pot adauga javascript
//altfel nu ar merge sa incarc js ul inainte de html
function ready() {//functia care incarca js ul
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')//ia toate butoanele de remove pt a lucra pe ele(initial am avut niste iteme pe care sa lucram
  //direct in html dar le am sters si acum folosim doar chestii noi)
  for(var i = 0; i< removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)//removeCartItem e o functie mai jos
  }//in for adauga eventlistener pe fiecare buton de delete (1)
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')//baga intr o variabila noua clasa cart-quantity-inputs(e ca un vector)
  for(var i = 0; i< quantityInputs.length; i++){//parcurge cate avem
    var input = quantityInputs[i]
    input.addEventListener('change',quantityChanged)
  }
  var addToCartButtons= document.getElementsByClassName('shop-item-button')
  for(var i = 0; i< addToCartButtons.length; i++){
    var button = addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
  }
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
  alert("Thank you for the purchase!")
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while(cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event){//daca e apasat acel buton
  var buttonClicked = event.target//aloc variabilei buttonClicked apasarea butonului
  buttonClicked.parentElement.parentElement.remove()//va sterge tot randul pt ca acel remove se afla intr un item care se afla intr-un rand
  updateCartTotal()//apelam metoda update cart total ca sa se updatee mereu totalul
}

function quantityChanged(event){
  var input = event.target
  if(isNaN(input.value)||input.value<=0){
    input.value=1
  }
  updateCartTotal()
}

function addToCartClicked(event){
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  console.log(title,price,imageSrc)
  addItemToCart(title,price,imageSrc)
  updateCartTotal()
}

function addItemToCart(title,price,imageSrc){
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for(var i=0; i<cartItemNames.length;i++){
      if(cartItemNames[i].innerText==title){
        alert("this item is already added to the cart!")
        return
      }
  }
  var cartRowContents= `
  <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total=0
  for(var i = 0; i< cartRows.length; i++){
    var cartRow = cartRows[i]
    var priceElement=cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace(' lei',''))
    var quantity=quantityElement.value
    total=total+(price*quantity)
  }
  total = Math.round(total*100)/100
  document.getElementsByClassName('cart-total-price')[0].innerText= total +' lei'
}
