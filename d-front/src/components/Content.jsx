import { useEffect, useState } from "react";

const Content = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([])

    const getCategories = async () => {
        const categoriesRes = await fetch('http://localhost:3000/categories');
        const topicsRres = await fetch('http://localhost:3000/topics');
        const categories = await categoriesRes.json();
        const topics = await topicsRres.json();
        setCategories(categories);
        setTopics(topics)
    }
    useEffect(() => {
      (async () => getCategories())()
    },[])

    const [inputValues, setInputValues] = useState({
      title: '',
      resource: '',
      topic: '',
    });
  
    const handleInputChange = (e) => {
      setInputValues({
        ...inputValues,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault()

      const topciRes = await fetch(`http://localhost:3000/topics?type=${inputValues.topic}`)
      const topcis = await topciRes.json();

      
      await fetch('http://localhost:3000/contents', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body:  JSON.stringify({title: inputValues.title, topic: topcis._id, category: topcis.category._id, user: user._id, resource: inputValues.resource })
      })

      setInputValues({
        title: '',
        resource: '',
        topic: '',
      })
      document.getElementById("modal_content").close();
    }

  return (
    <div>
      <section className="flex flex-col gap-10 mb-10 p-10">
        {/* categoris */}
        <section className="border-b border-indigo-200 pb-8">
          <h3>categories <span>({categories?.length})</span></h3>
          {categories && categories?.map((cat, i) => (
            <span key={i} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{cat.type}</span>
          ))}
        </section>
        {/* topics */}
        <section className="border-b border-indigo-200 pb-8">
          <h3>topics <span>({topics?.length})</span></h3>
          {topics && topics?.map((top, i) => (
            <span key={i} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{top.type}</span>
          ))}
        </section>
      </section>
      <div className=" w-full flex justify-center items-center mt-8 gap-4">
        <button
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => document.getElementById("modal_content").showModal()}
        >
          Create Content
        </button>

        {/* dialogo */}
        <dialog id="modal_content" className="rounded-md p-20 order-solid border-2 border-indigo-600 modal bg-slate-200 border-slate-500">
          <form onSubmit={handleSubmit} className="space-y-6" action="#">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create Content
          </h3>
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="title name"
              required=""
              onChange={handleInputChange}
            />
            <label
              htmlFor="resource"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Resource
            </label>
            <input
              type="text"
              name="resource"
              id="resource"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="resource name"
              required=""
              onChange={handleInputChange}
            />
           {topics.length > 0 && (
            <>
             <label
              htmlFor="topic"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Topic
            </label>
            <select id='topic' name="topic" defaultValue={topics?.[0].type} value={inputValues.topic} onChange={handleInputChange}>
                {topics?.length && topics.map((top,i)=> (
                  <option key={i} value={top.type}>{top.type}</option>
                ))}
              </select>
            </>
           )}
            <button
            type="submit"
            className="mt-20 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            create
          </button>
          </div>
        </form>
        </dialog>
      </div>
    </div>
  );
};

export default Content;
