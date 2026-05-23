import { useEffect, useState, type ChangeEvent, type Dispatch, type FC, type MouseEvent, type SetStateAction } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  TableSortLabel,
  Box,
  CircularProgress,
} from '@mui/material';
import { DEFAULT_PAGE, DEFAULT_PERPAGE, PERPAGE_OPTIONS, type Column, type ListFilters, type ListParams, type QueryParams, type SortOrder } from 'src/config';
import cls from './List.module.css';

interface WithId {
  id: string | number;
}

type Props<T> = {
  items: T[];
  total: number;
  columns: Column[];
  filters: ListFilters;
  setFilters: Dispatch<SetStateAction<ListFilters>>
  isLoading: boolean;
}

export const List = <T extends WithId>({ 
  items, 
  total,
  columns, 
  filters, 
  setFilters, 
  isLoading
}: Props<T>) => {

  const updateFilters = (newFilters: ListFilters) => {
    setFilters((old: ListFilters) => ({
      ...old,
      ...newFilters
    }));
  }

  const handleChangePage = (newPage: number) => {
    const newFilters = { page: newPage };
    updateFilters(newFilters);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFilters = { 
      page: 0,
      perPage: Number(event.target.value)
    };
    updateFilters(newFilters);
  };

  const handleSort = (columnId: string) => {
    const newFilters: ListFilters = { 
      page: 0,
      sortBy: columnId,
      sortOrder: 'asc',
    };

    if (filters.sortBy === columnId) {
      if (filters.sortOrder === 'asc') {
        newFilters.sortOrder = 'desc';
      } else {
        newFilters.sortBy = '';
        newFilters.sortOrder = undefined;
      }
    }

    updateFilters(newFilters);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, position: 'relative' }}>
      {isLoading && (
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 2
        }}>
          <CircularProgress />
        </Box>
      )}

      <Table aria-label="staff-table">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            {columns.map((column: Column) => {
              const cellStyles = {
                fontWeight: 'bold',
                ...(column.width ? { width: column.width } : {}),
                ...(column.flex ? { flex: column.flex } : {}),
              };

              return (
                <TableCell
                  key={column.id} 
                  sx={cellStyles}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={filters.sortBy === column.id}
                      direction={filters.sortOrder}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.name}
                    </TableSortLabel>
                  ) : (
                    column.name
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={String(item.id)} hover>
              {columns.map((column) => (
                <TableCell key={column.id}>{item[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
          
          {!isLoading && items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                Нет сотрудников с выбранными фильтрами
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    
      <TablePagination
        rowsPerPageOptions={PERPAGE_OPTIONS}
        component="div"
        count={total}
        rowsPerPage={filters.perPage || DEFAULT_PERPAGE}
        page={filters.page || DEFAULT_PAGE}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
      />
    </TableContainer>
  );
};