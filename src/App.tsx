import './App.css'
import CardContainer from './components/CardContainer'

type Project = {
  id: number,
  projectTitle: string,
  projectDescription: string,
  projectImageURL: string
}

let cardsData = fetch("http://10.115.1.36:8055/items/Projects").then(response => {
  if (!response.ok) {
    throw new Error("Network response was not ok" + response.statusText);
  }
  return response.json();
}).catch(error => {
  console.error("Error fetching data:", error);
})

function App() {
  return (
    <div className='bg-drab-dark-brown min-h-[100vh]'>
      <div className='p-10'>
        <div className='text-white text-4xl font-bold text-right'>HTL Dornbirn 5bWI</div>
      </div>
      <CardContainer
        cardsData={cardsData} />
    </div>
  )
}

export default App