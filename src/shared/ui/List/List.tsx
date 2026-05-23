import { type ChangeEvent } from 'react';
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
import type { Column, Filters, WithId } from 'src/shared/types';
import { DEFAULT_PAGE, DEFAULT_PERPAGE, PERPAGE_OPTIONS } from 'src/shared/config';
import cls from './List.module.css';

type Props<T> = {
  items: T[];
  total: number;
  columns: Column[];
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  isLoading: boolean;
}

export const List = <T extends WithId>({ 
  items, 
  total,
  columns, 
  filters, 
  updateFilters, 
  isLoading
}: Props<T>) => {
  const handleChangePage = (newPage: number) => {
    updateFilters({ page: newPage });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFilters = { 
      page: 0,
      perPage: Number(event.target.value)
    };
    updateFilters(newFilters);
  };

  const handleSort = (columnId: string) => {
    const newFilters: Filters = { 
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
    <TableContainer component={Paper} className={cls.container}>
      {isLoading && (
        <Box className={cls.loaderOverlay}>
          <CircularProgress />
        </Box>
      )}

      <Table aria-label="staff-table">
        <TableHead className={cls.tableHead}>
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
                  style={cellStyles}
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
                <TableCell key={column.id}>
                  {String(item[column.id as keyof T] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
          
          {!isLoading && items.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={columns.length} 
                align="center" 
                className={cls.emptyCell}
              >
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
