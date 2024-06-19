'use client'
import { query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.

export default function PaginatedItems({ itemsPerPage, items, Cb, Header }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(()=>{
    const newOffset = (0 * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${0}, which is offset ${newOffset} ככככככככ`
    );
    setItemOffset(newOffset);
    console.log('retard')
    
  },[items])
  
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);

  };

  
  return (
    <table className="table overflow-x-auto  table-xs table-fixed" >
      <Header/>
      <Cb currentItems={currentItems} />

      <ReactPaginate
        containerClassName="join"
        breakLinkClassName="join-item btn btn-disabled"
        breakLabel="..."
        nextLinkClassName=" flex justify-center items-center w-12 h-12 bg-[#191e24] rounded-l-lg"
        previousClassName=" flex justify-center items-center w-12 h-12 bg-[#191e24] rounded-r-lg"
        pageLinkClassName="join-item btn"
        activeLinkClassName="join-item btn btn-active"
        nextLabel="קדימה"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="חזור"
        renderOnZeroPageCount={null}
        
      />
    </table>
  );
}
