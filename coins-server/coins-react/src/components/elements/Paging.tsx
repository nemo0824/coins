import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/pagination"

  interface PagingProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  }

const Paging = ({ currentPage, totalPages, onPageChange }:PagingProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      console.log("된다")
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
        console.log("된다")
    }
  };
  return (
    <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={handlePrevious} className='cursor-pointer'/>
      </PaginationItem>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationItem key={index + 1} className='cursor-pointer'>
          <PaginationLink
            onClick={() => onPageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext onClick={handleNext} className='cursor-pointer' />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  )
}

export default Paging