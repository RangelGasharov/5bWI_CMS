import './App.css'
import CardContainer from './components/CardContainer'

let cardData = [
  {
    imageURL: 'https://images.unsplash.com/photo-1728853487293-1a4c5c39b393?q=80&w=3384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    textTitle: 'Lorem ipsum dolor sit amet',
    descriptionText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1721332153282-3be1f363074d?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    textTitle: 'Lorem ipsum dolor sit amet',
    descriptionText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1719937051230-8798ae2ebe86?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    textTitle: 'Lorem ipsum dolor sit amet',
    descriptionText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    imageURL: 'https://images.unsplash.com/photo-1726853546098-380e29da9e31?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    textTitle: 'Lorem ipsum dolor sit amet',
    descriptionText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  }
]

function App() {
  return (
    <div className='bg-drab-dark-brown min-h-[100vh]'>
      <div className='p-10'>
        <div className='text-white text-4xl font-bold text-right'>HTL Dornbirn 5bWI</div>
      </div>
      <CardContainer
        cardData={cardData} />
    </div>
  )
}

export default App