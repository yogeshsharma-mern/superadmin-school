import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { 
  FiSearch, 
  FiChevronLeft, 
  FiChevronRight, 
  FiChevronsLeft, 
  FiChevronsRight,
  FiArrowUp,
  FiArrowDown,
  FiFilter,
  FiDownload,
  FiRefreshCw
} from "react-icons/fi";
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function ReusableTable({
  columns,
  data,
  paginationState,
  setPaginationState,
  sortingState,
  setSortingState,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
  totalCount,
  tablePlaceholder = "Search...",
  error,
  isError,
  fetching,
  loading,
  onRefresh,
  onExport
}) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / paginationState.pageSize),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    state: {
      pagination: paginationState,
      sorting: sortingState,
      columnFilters,
      globalFilter,
    },
    onPaginationChange: setPaginationState,
    onSortingChange: setSortingState,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 "
    >
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Data Table</h2>
            <p className="text-sm text-gray-500 mt-1">
              Total {totalCount} records • Page {paginationState.pageIndex + 1} of {Math.ceil(totalCount / paginationState.pageSize)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={tablePlaceholder}
                className="pl-10 pr-4 py-2.5 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Button */}
            <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all">
              <FiFilter size={18} />
            </button>

            {/* Export Button */}
            {onExport && (
              <button 
                onClick={onExport}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all"
              >
                <FiDownload size={18} />
              </button>
            )}

            {/* Refresh Button */}
            {onRefresh && (
              <button 
                onClick={onRefresh}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all"
              >
                <FiRefreshCw size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="relative">
        {/* Loading Overlay */}
        <AnimatePresence>
          {(loading || fetching) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-sm text-gray-600 font-medium">Loading data...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {isError && error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">!</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-800">Error loading data</h4>
                  <p className="text-xs text-red-600 mt-0.5">{error?.message || "Something went wrong"}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-50/80">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="group px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/80 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        <span className="text-gray-400">
                          {{
                            asc: <FiArrowUp size={14} className="text-indigo-600" />,
                            desc: <FiArrowDown size={14} className="text-indigo-600" />,
                          }[header.column.getIsSorted()] ?? (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <HiOutlineSortAscending size={14} />
                            </div>
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 ">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-700"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <FiSearch size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">No data found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Page Size Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Show</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">entries</span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 transition-all"
            >
              <FiChevronsLeft size={16} />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                const pageNumber = i + 1;
                const isCurrentPage = pageNumber === paginationState.pageIndex + 1;
                return (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      isCurrentPage
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              {table.getPageCount() > 5 && (
                <>
                  <span className="text-gray-400">...</span>
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {table.getPageCount()}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronRight size={16} />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronsRight size={16} />
            </button>
          </div>
        </div>

        {/* Table Info */}
        <div className="mt-4 text-xs text-gray-400 text-center sm:text-left">
          Showing {paginationState.pageIndex * paginationState.pageSize + 1} to{' '}
          {Math.min(
            (paginationState.pageIndex + 1) * paginationState.pageSize,
            totalCount
          )}{' '}
          of {totalCount} entries
        </div>
      </div>
    </motion.div>
  );
}