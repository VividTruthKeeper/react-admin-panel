// Icons
import { IoIosCreate } from "react-icons/io";

const Category = () => {
  return (
    <main className="category">
      <div className="container">
        <div className="category inner">
          <div className="dashboard__head category__head">
            <IoIosCreate />
            <h1>Category</h1>
          </div>
          <form
            className="category__form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <div className="category__form__block">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                placeholder="Enter category name"
              />
            </div>
            <button type="submit">Add category</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Category;
