
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

  // Handlers
  const onConfirm = () => {
    getAnimal(input)
    setShow(false)
    setInput('')
  }

  const showModal = () => {
    setShow(true)
  }

  const onClose = () => {
    setShow(!show)
    setInput('')
  }

  // Function to get animal from input text
  const getAnimal = (query) => {

    const newAnimal = query
    if (!animals.includes(newAnimal)) {
      setAnimals([...animals, newAnimal])
      setShow(true)
    }
    return animals
  }

  // accordion markup
  return (
    <details>
      <summary>Animali</summary>
      <ul>
        {animals.map((a, index) => (<li key={index}>{a}</li>))}
      </ul>
      <button onClick={showModal}>Aggiungi Animale</button>
      <Modal
        title='Aggiungi il tuo animale'
        content={'Scrivi il tuo animale preferito'}
        show={show}
        setShow={setShow}
        onClose={onClose}
        onConfirm={onConfirm}
        setInput={setInput}
        value={input}
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
  setInput,
  value,
}) {


  return show && createPortal(
    <div className="modal-container">
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
        <input
          type='text'
          value={value}
          onChange={(e) => { setInput(e.target.value) }} />
        <button onClick={onConfirm}>Conferma</button>
        <button onClick={onClose}>Annulla</button>
      </div>
    </div>,
    document.body
  )
}



