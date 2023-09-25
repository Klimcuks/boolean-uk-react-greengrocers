import './styles/reset.css'
import './styles/index.css'
import initialStoreItems from './store-items'
import { useState } from 'react'

console.log(`initialStoreItems`, initialStoreItems)

export default function App() {
  const [cart, setCart] = useState([])
  const [store, setStore] = useState(initialStoreItems)
  const [searchTerm, setSearchTerm] = useState('')

  const addToCart = targetItem => {
    if (!cart.includes(targetItem)) {
      targetItem.quantity = 1
      setCart([...cart, targetItem])
    } else {
      targetItem.quantity++
      setCart([...cart])
    }
  }

  const increaseItemQuantity = targetItem => {
    const updatedCart = item =>
      item.map(item =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity++ }
          : item
      )
    setCart(updatedCart)
  }

  const decreaseItemQuantity = targetItem => {
    const updatedCart = item =>
      item.map(item =>
        item.id === targetItem.id
          ? { ...item, quantity: item.quantity-- }
          : item
      )
    setCart(updatedCart)
  }

  const removeItemFromCart = targetItem => {
    console.log(targetItem.quantity)
    if (targetItem.quantity === 1) {
      console.log(`Removing ${targetItem.name} from cart`)
      const updatedCart = cart.filter(item => item !== targetItem)
      setCart(updatedCart)
    }
  }

  const calculateTotal = () => {
    let total = 0
    cart.forEach(item => (total += item.quantity * item.price))
    return `£${total.toFixed(2)}`
  }

  console.log(`cart`, cart)

  const displayFruit = () => {
    const filteredStore = initialStoreItems.filter(
      item => item.type === 'fruit'
    )
    return setStore(filteredStore)
  }

  const displayVeggies = () => {
    const filteredStore = initialStoreItems.filter(
      item => item.type === 'vegetable'
    )
    return setStore(filteredStore)
  }

  const sortAZ = () => {
    const sortedStore = [...store].sort((a, b) => {
      const nameA = a.name
      const nameB = b.name
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
    setStore(sortedStore)
  }

  const sortZA = () => {
    const sortedStore = [...store].sort((a, b) => {
      const nameA = a.name
      const nameB = b.name
      if (nameA > nameB) return -1
      if (nameA < nameB) return 1
      return 0
    })
    setStore(sortedStore)
  }

  const sortByPriceAsc = () => {
    const sortedStore = [...store].sort((a, b) => {
      const priceA = a.price
      const priceB = b.price
      if (priceA < priceB) return -1
      if (priceA > priceB) return 1
      return 0
    })
    setStore(sortedStore)
  }

  const sortByPriceDesc = () => {
    const sortedStore = [...store].sort((a, b) => {
      const priceA = a.price
      const priceB = b.price
      if (priceA > priceB) return -1
      if (priceA < priceB) return 1
      return 0
    })
    setStore(sortedStore)
  }

  const searchItem = e => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    const filteredStore = initialStoreItems.filter(item => {
      return item.name.includes(term)
    })
    return setStore(filteredStore)
  }

  const clearFilters = () => {
    return setStore(initialStoreItems)
  }

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <div className="filter-cont">
          <button onClick={displayFruit}>DISPLAY FRUIT</button>
          <button onClick={displayVeggies}>DISPLAY VEGETABLES</button>
          <button onClick={sortAZ}>SORT A-Z</button>
          <button onClick={sortZA}>SORT Z-A</button>
          <button onClick={sortByPriceAsc}>PRICE (LOW TO HIGH)</button>
          <button onClick={sortByPriceDesc}>PRICE (HIGH TO LOW)</button>
          <button onClick={clearFilters}>CLEAR FILTERS</button>
          <input
            type="text"
            placeholder="store item"
            value={searchTerm}
            onChange={searchItem}
          ></input>
        </div>
        <ul className="item-list store--item-list">
          {store.map(item => {
            return (
              <li key={item.id}>
                <div className="store--item-icon">
                  <img src={`/assets/icons/${item.id}.svg`} alt={item.alt} />
                </div>
                <p>
                  {item.name} - £{item.price}
                </p>

                <button
                  onClick={() => {
                    console.log('clicked', item.name)
                    return addToCart(item)
                  }}
                >
                  Add to cart
                </button>
              </li>
            )
          })}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cart.map(item => {
              return (
                <li key={item.id}>
                  <img
                    className="cart--item-icon"
                    src={`/assets/icons/${item.id}.svg`}
                    alt={item.alt}
                  />
                  <p>{item.name}</p>
                  <button
                    className="quantity-btn remove-btn center"
                    onClick={() => {
                      console.log('clicked -', item.name)
                      decreaseItemQuantity(item)
                      removeItemFromCart(item)
                    }}
                  >
                    -
                  </button>
                  <span className="quantity-text center">{item.quantity}</span>
                  <button
                    className="quantity-btn add-btn center"
                    onClick={() => {
                      console.log('clicked +', item.name)
                      increaseItemQuantity(item)
                    }}
                  >
                    +
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">{calculateTotal()}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
