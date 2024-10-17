import './App.css'
import Card from './components/Card'

let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function App() {
  return (
    <div className='bg-drab-dark-brown'>
      <div className='p-10'>
        <div className='text-white text-4xl font-bold text-right'>HTL Dornbirn 5bWI</div>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-2, lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-6 p-10 justify-items-center'>
        {ids.map((id) => {
          return (
            <Card
              key={id}
              imageURL='https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?q=80&w=3384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              textTitle='Lorem ipsum dolor sit amet'
              descriptionText='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
            />
          )
        })}
      </div>
    </div>
  )
}

export default App