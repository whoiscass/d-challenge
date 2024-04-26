import { useEffect, useState } from "react"

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const categoriesRes = await fetch('http://localhost:3000/categories');
    const categories = await categoriesRes.json();
    setCategories(categories);
}
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      setUser(user)
    }
    (async () => getCategories())();
  },[])
  const [inputValues, setInputValues] = useState({
    categories: '',
    topic: '',
  });

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify({type: inputValues.category})
    })
    document.getElementById('modal_category').close()
    setInputValues({
      category: '',
      topic: '',
    })
  }
  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    const categoryRes = await fetch(`http://localhost:3000/categories?type=${inputValues.categories}`)
    const category = await categoryRes.json();
    await fetch('http://localhost:3000/topics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:  JSON.stringify({type: inputValues.topic, category: category._id})
    })
    document.getElementById('modal_topics').close()
    setInputValues({
      category: '',
      topic: '',
    })
  }

  return (
    <>
      <nav className="w-full flex h-10 bg-slate-300 justify-center items-center">
        <h3>Hello {user?.name ?? 'John Doe'}</h3>
      </nav>

        <>
          <div className=" w-full flex justify-center items-center mt-8 gap-4">
          <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={()=>document.getElementById('modal_category').showModal()}>
            Create Category
          </button>
          <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" onClick={()=>document.getElementById('modal_topics').showModal()}>
            Create Topic
          </button>
          </div>

          <dialog id="modal_category" className="rounded-md p-20 order-solid border-2 border-indigo-600 modal bg-slate-200 border-slate-500">
          <form onSubmit={handleCategorySubmit} className="space-y-6" action="#">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create Category
          </h3>
          <div>
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Category Name
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="category name"
              required=""
              onChange={handleInputChange}
            />
            <button
            type="submit"
            onClick={handleCategorySubmit}
            className="mt-20 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            create
          </button>
          </div>
        </form>
          </dialog>
          <dialog id="modal_topics" className="rounded-md p-20 order-solid border-2 border-indigo-600 modal bg-slate-200 border-slate-500">
          <form onSubmit={handleTopicSubmit} className="space-y-6" action="#">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create Topic
          </h3>
          <div>
            <label
              htmlFor="topic"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Category Topic
            </label>
            <input
              type="text"
              name="topic"
              id="topic"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="category name"
              required=""
              onChange={handleInputChange}
            />
            { categories.length > 0 &&
              <div>
              <label
                htmlFor="categories"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Categories
              </label>
              <select id='categories' name="categories" defaultValue={categories?.[0]?.type} value={inputValues?.category} onChange={handleInputChange}>
                {categories.map((cat, i) => <option key={i} value={cat.type}>{cat.type}</option>)}
              </select>
            </div>
            }
            <button
            type="submit"
            onClick={handleTopicSubmit}
            className="mt-20 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            create
          </button>
          </div>
        </form>
          </dialog>
        </>
    </>
  )
}

export default Dashboard
