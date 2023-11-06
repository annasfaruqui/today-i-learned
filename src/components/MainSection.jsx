import CategoryList from "./CategoryList";
import FactsList from "./FactsList";

function MainSection() {
  return (
    <div className="flex flex-col gap-6 md:max-h-[36rem] md:flex-row lg:gap-9">
      <div className="my-4 px-4 md:w-2/5 md:overflow-y-auto lg:w-1/4">
        <CategoryList />
      </div>
      <div className="my-4 w-full px-3 md:w-3/5 md:overflow-y-auto  lg:w-3/4 ">
        <FactsList />
      </div>
    </div>
  );
}

export default MainSection;
