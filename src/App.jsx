import { useState, useEffect } from 'react'

function App() {
  // State per memorizzare l'input di ricerca dell'utente
  const [query, setQuery] = useState("");

  // State per memorizzare la lista dei prodotti dall'API
  const [search, setSearch] = useState([]);
  console.log(search)

  // Hook useEffect per recuperare i dati dei prodotti quando il componente viene montato
  useEffect(() => {
    // Se la query è vuota, resetta la lista dei risultati
    if (query.trim() === "") {
      setSearch([]);
      return;
    }
    // Chiamata API per recuperare i dati dei prodotti dal server locale
    fetch(`http://localhost:3333/products?search=${query}`)
      .then(Response => Response.json())
      .then(data => setSearch(data)) // Memorizza i dati ricevuti nello state search
      .catch(error => console.error(error)) // Gestisce eventuali errori
  }, [query]); // Esegue l'effetto ogni volta che query cambia

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
        {/* Elemento details espandibile per i suggerimenti */}
        <details>
          <summary>Suggerimenti</summary>
          {/* Mostra la lista solo se ci sono risultati di ricerca */}
          {search.length > 0 && (
            <ul>
              {/* Mappa attraverso i risultati della ricerca e crea un elemento lista per ogni prodotto */}
              {search.map((i) => (
                <li key={i.id}>{i.name}</li> // Usa l'id come key univoca per ogni elemento
              ))}
            </ul>
          )}
        </details>
      </div>
    </div>
  )
}

export default App
