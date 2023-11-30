const cart = function () {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector('.long-goods-list')
  const cartTable = document.querySelector('.cart-table__goods')
  const modalForm = document.querySelector('.modal-form')
  const modalData = document.querySelectorAll('.modal-input')
  const total = document.querySelector('.card-table__total')

  const countCart = (cartToCount) => {
    const sum = cartToCount.reduce((sum, good) => {
      return sum + +good.count * +good.price
    }, 0)

    total.innerText = sum + "$"
  }

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter(good => {
      return good.id !== id
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    //countCart(newCart)
  }
  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.map(good => {
      if (good.id === id) {
        good.count++
      }
      return good
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    //countCart(newCart)
  }

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.map(good => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--
        }
      }
      return good
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    //countCart(newCart)
  }

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'))
    const clickedGood = goods.find(good => good.id === id)
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []

    if (cart.some(good => good.id === clickedGood.id)) {
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count++
        }
        return good
      })
    } else {
      clickedGood.count = 1
      cart.push(clickedGood)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    // countCart(cart)
  }

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = ` `
    goods.forEach(good => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${good.name}</td>
				<td>${good.price}$</td>
				<td><button class="cart-btn-minus"">-</button></td>
				<td>${good.count}</td>
				<td><button class=" cart-btn-plus"">+</button></td>
				<td>${+good.price * +good.count}$</td>
				<td><button class="cart-btn-delete"">x</button></td>
      `

      cartTable.append(tr)

      tr.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id)
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id)
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id)
        }
      })
    });
    countCart(goods)
  }

  const sendForm = (name, phone) => {
    const cartArray = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []



    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: name,
        phone: phone,
      })
    }).then(() => {
      cart.style.display = ''
      localStorage.removeItem('cart')
    })

  }

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let name, phone



    for (i = 0; i < modalData.length; i++) {

      const arg = modalData[i]

      if (arg.name === "nameCustomer") {
        name = arg.value
        arg.value = ''
      } else {
        phone = arg.value
        arg.value = ''
      }
    }
    sendForm(name, phone)
  })

  cartBtn.addEventListener("click", function () {
    const cartArray = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []

    renderCartGoods(cartArray)
    cart.style.display = "flex";
  });

  closeBtn.addEventListener("click", function () {
    cart.style.display = "";
  });

  cart.addEventListener("click", (event) => {
    if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
      cart.style.display = "";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
      cart.style.display = "";
    }
  });

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
      if (event.target.closest('.add-to-cart')) {
        const buttonToCart = event.target.closest('.add-to-cart')
        const goodId = buttonToCart.dataset.id
        addToCart(goodId)
      }

    })
  }
};

cart();
