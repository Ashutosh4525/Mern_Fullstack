import Memo from "./components/Memo";
import HOC from "./components/HOC";
import Callback from "./components/Callback";



function App() {

  const NewHome=HOC(Memo)

  return (
    <>
      {/* <NewHome name = "some Text here"/> */}
      <Callback/>
    </>
  )
}

export default App
