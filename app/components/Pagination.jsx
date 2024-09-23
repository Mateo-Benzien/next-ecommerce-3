import Link from 'next/link';

const Pagination = ({ currentPage }) => {
  const nextPage = currentPage + 1;
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;

  return (
    <div className="pagination">
      <Link href={`/products?page=${prevPage}`}>
        <button disabled={currentPage === 1}>Previous</button>
      </Link>
      <span>Page {currentPage}</span>
      <Link href={`/products?page=${nextPage}`}>
        <button>Next</button>
      </Link>
    </div>
  );
};

export default Pagination;
