import { useEffect, useState } from 'react';
import CustomTable from './components/CustomTable'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onCheckboxSelect = (evt) => {
    console.log(evt)
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        if (response.ok) {
          const prods = await response.json()
          setProducts(prods.results)
          setIsLoading(false)
        } else {
          setIsLoading(false)
          console.log(response)
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <main className="App-main">
        <CustomTable characters={products} isLoading={isLoading} onCheckboxSelect={onCheckboxSelect}/>
      </main>
    </div>
  );
}

export default App;
