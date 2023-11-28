const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link')

  const getData = () => {
    fetch("https://wildberries-e428b-default-rtdb.firebaseio.com/db.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem('data', JSON.stringify(data))
      })
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      getData()
    })
  })

  // localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]))
  // const goods = JSON.parse(localStorage.getItem('goods'))
  // console.log(goods)

  // localStorage.removeItem('goods')
  // console.log(localStorage)
};

getGoods();
