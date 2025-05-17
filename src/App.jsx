import { useState, useEffect, useCallback } from 'react'

const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

function App() {
  // State per memorizzare l'input di ricerca dell'utente
  const [query, setQuery] = useState("");

  // State per memorizzare la lista dei prodotti dall'API
  const [search, setSearch] = useState([]);

  const fetchProducts = async (query) => {
    // Se la query è vuota, resetta la lista dei risultati
    if (query.trim() === "") {
      setSearch([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await response.json();
      setSearch(data);
      console.log("API")
    } catch (error) {
      console.error("Error :", error);
    }
  }


  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500),
    []
  );


  // Hook useEffect per recuperare i dati dei prodotti quando il componente viene montato
  useEffect(() => {
    debouncedFetchProducts(query); // Chiama la funzione per recuperare i prodotti
  }, [query]);

  return (
    <div>
      {/* Campo di input per la ricerca */}
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Aggiorna lo state query quando l'utente digita
        placeholder='cerca...'
      />

      {/* Contenitore per i suggerimenti di ricerca */}
      <div className="container">
        <h1>Suggerimenti</h1>
        {/* Mostra la lista solo se ci sono risultati di ricerca */}
        {search.length > 0 && (
          <ul>
            {/* Mappa attraverso i risultati della ricerca e crea un elemento lista per ogni prodotto */}
            {search.map((i) => (
              <li key={i.id}>{i.name}</li> // Usa l'id come key univoca per ogni elemento
            ))}
          </ul>
        )}
      </div>
    </div >
  )
}

export default App
