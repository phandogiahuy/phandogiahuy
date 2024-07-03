import FormComponent from "./components/Form";

function App() {
  return (
    <div className=" h-screen flex items-center flex-col" style={{background:"url(/bg.jpg)",backgroundSize:"cover"}}>
      <p className="mt-28 text-slate-100 text-6xl font-serif ">
        Swap anytime, anywhere, anycurrency
      </p>
      <FormComponent/>
    </div>
  );
}

export default App;

