
const { createRoot } = ReactDOM;
const { useState } = React;

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

  const getAnimal = () => {
    const randomIndex = Math.floor(Math.random() * animalsChoice.length)
    const newAnimal = animalsChoice[randomIndex]
    if (!animals.includes(newAnimal)) {
      setAnimals([...animals, newAnimal])
    }
    return animals

  }

  return (
    <details>
      <summary>Animali</summary>
      <ul>
        {animals.map((a, index) => (<li key={index}>{a}</li>))}
      </ul>
      <button onClick={getAnimal}>Aggiungi Animale</button>
    </details>
  )
}

const listaAnimali = document.querySelector('.lista-animali')
const root = createRoot(listaAnimali)
root.render(<AnimalList />)

