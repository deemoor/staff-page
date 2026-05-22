import { useMemo, useState, type ChangeEvent, type MouseEvent } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination
} from '@mui/material';
import { MOCK_STAFF } from '../../config/mock';
import { type StaffMember } from '../../config/types';
import cls from './StaffPage.module.css';

export const StaffPage = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Имитация серверной пагинации (бэкенд возвращает только часть данных через LIMIT/OFFSET)
  const visibleStaff = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return MOCK_STAFF.slice(startIndex, endIndex);
  }, [page, rowsPerPage]);
  
  const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={cls.content}>
      <h2 className={cls.title}>Сотрудники компании</h2>

      <TableContainer component={Paper} sx={{ marginTop: '20px', boxShadow: 3 }}>
        <Table aria-label="staff table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>First/last name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Роль</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Отдел</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleStaff.map((row: StaffMember) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.department}</TableCell>
              </TableRow>
            ))}
            {visibleStaff.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  Нет сотрудников с выбранными фильтрами
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
     
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={MOCK_STAFF.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`}
        />
      </TableContainer>
    </div>
  );
};
