const { createRoot } = ReactDOM;
const { useState } = React;
const { createPortal } = ReactDOM


/* Animals Accordion component  */
const animalsChoice = [
  'Gatto',
  'Cane',
  'Cavallo',
  'Elefante',
  'Leone',
  'Giraffa',
  'Pinguino',
  'Tigre',
  'Delfino',
  'Gufo'
];

const AnimalList = () => {

  const [animals, setAnimals] = useState([]);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const addAnimal = async () => {
    if (!input) return;
    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:3333/animals?search=${input}`)
      const [animal] = await response.json()

      if (!animal) {
        throw new Error('Nessun animale trovato')
      }
      const userAnimal = {
        name: animal.name || null,
        description: animal.description || null,
        image: animal.image || null
      }
      setAnimals(curr => [...curr, userAnimal])
      console.log(animal);

    } catch (error) {
      console.log(error)
    } finally {
      setInput('')
      setShow(false)
      setIsLoading(false)
    }
  }




  // accordion markup
  return (
    <details>
      <summary>Animali</summary>
      <div>
        {animals.map((a, index) => (
          <div key={index} className="card">
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            {a.image && <figure><image src={a.image} alt={a.name} /></figure>}
          </div>
        ))}
      </div>
      <button onClick={() => setShow(true)}>Aggiungi Animale</button>
      <Modal
        title='Aggiungi il tuo animale'
        content={
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {isLoading && <p>caricamento ....</p>}
          </div>
        }
        show={show}
        onClose={() => setShow(false)}
        onConfirm={addAnimal}
      />

    </details>
  )
}

// mount React component to DOM
const listaAnimali = document.querySelector('.lista-animali')
const root = createRoot(listaAnimali)
root.render(<AnimalList />)


/* Modal component */
function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
}) {


  return show && createPortal(
    <div className="modal-container">
      <div className="modal">
        <h2>{title}</h2>
        {content}
        <button onClick={onConfirm}>Conferma</button>
        <button onClick={onClose}>Annulla</button>
      </div>
    </div>,
    document.body
  )
}



