import { useState } from "react";

import AddFactInput from "./components/AddFactInput";
import Header from "./components/Header";
import MainSection from "./components/MainSection";

import { FactsProvider } from "./contexts/FactsContext";
import Footer from "./components/Footer";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleToggleForm() {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <div className="flex flex-col justify-between lg:min-h-screen">
      <div className="mx-auto flex max-w-screen-xl flex-col  p-2 px-5 text-definedColor-base">
        <FactsProvider>
          <Header onHandleToggle={handleToggleForm} isFormOpen={isFormOpen} />
          {isFormOpen && <AddFactInput />}
          <MainSection />
        </FactsProvider>
      </div>
      <div className="border-t-2 border-stone-500 bg-definedColor-base2 pt-2">
        <Footer />
      </div>
    </div>
  );
}

export default App;
