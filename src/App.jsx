import { useState } from "react";
import { Toaster } from "react-hot-toast";
import AddFactInput from "./components/AddFactInput";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import { FactsProvider } from "./contexts/FactsContext";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleToggleForm() {
    setIsFormOpen((isFormOpen) => !isFormOpen);
  }

  return (
    <div className="flex flex-col justify-between gap-6 md:h-screen md:gap-4">
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

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toasterId="default"
        toastOptions={{
          style: { maxWidth: "650px", minWidth: "150px" },
          className:
            "bg-definedColor-base3 text-definedColor-base rounded-2xl shadow-xl",
          duration: 5000,
          removeDelay: 1000,
          success: {
            duration: 3000,
            iconTheme: { primary: "rgb(var(--color-accent2))" },
          },
          error: {
            duration: 5000,
            iconTheme: { primary: "rgb(var(--color-accent3))" },
          },
          loading: { iconTheme: { primary: "rgb(var(--color-accent4))" } },
        }}
      />
    </div>
  );
}

export default App;
