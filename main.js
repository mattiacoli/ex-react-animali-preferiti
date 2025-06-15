
const { createRoot } = ReactDOM


const animals = [
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
  return (
    <details>
      <summary>Animali</summary>
      <ul>
        {animals.map((a, index) => (<li key={index}>{a}</li>))}
      </ul>
    </details>
  )
}

const listaAnimali = document.querySelector('.lista-animali')
const root = createRoot(listaAnimali)
root.render(<AnimalList />)

