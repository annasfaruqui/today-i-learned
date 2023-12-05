import CategoryList from "./CategoryList";
import FactsList from "./FactsList";

function MainSection() {
  return (
    <main className="flex flex-col gap-6 md:flex-row md:overflow-hidden lg:gap-9">
      <aside className="my-4 px-4 md:w-2/5 md:overflow-y-auto lg:w-1/4">
        <CategoryList />
      </aside>
      <section className="my-4 w-full px-3 md:w-3/5 md:overflow-y-auto lg:w-3/4">
        <FactsList />
      </section>
    </main>
  );
}

export default MainSection;
