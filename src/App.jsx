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
    <div className="flex flex-col gap-6 md:max-h-screen md:gap-4">
      <div className="mx-auto flex w-screen flex-col px-4 pt-2 text-definedColor-base md:overflow-hidden xl:w-[80rem]">
        <FactsProvider>
          <Header onHandleToggle={handleToggleForm} isFormOpen={isFormOpen} />
          {isFormOpen && <AddFactInput />}
          <MainSection />
        </FactsProvider>
      </div>
      <footer className="max-w-screen border-t-2 border-stone-500 bg-definedColor-base2 pt-2">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
