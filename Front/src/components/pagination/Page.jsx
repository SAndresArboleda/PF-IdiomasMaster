const Page = ({ coursePerPage, courses, page, current, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(courses / coursePerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (current === pageNumbers.length) return;
    return setCurrentPage(parseInt(current) + 1);
  };

  const prevPage = () => {
    if (current === 1) return;
    return setCurrentPage(parseInt(current) - 1);
  };

  return (
    <div>
      <div>
        {pageNumbers.length !== 0 ? (
          <button
            onClick={prevPage}
            className="mx-2 bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded cursor-pointer"
          >
            ↩
          </button>
        ) : null}

        {pageNumbers &&
          pageNumbers.map((num) => (
            <button
              className="mx-2 bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded cursor-pointer"
              key={num}
              onClick={() => page(num)}
            >
              <a style={{ fontWeight: current === num ? "bold" : "normal" }}>
                {num}
              </a>
            </button>
          ))}

        {pageNumbers.length !== 0 ? (
          <button
            onClick={nextPage}
            className="mx-2 bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded cursor-pointer"
          >
            ↪
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default Page;
