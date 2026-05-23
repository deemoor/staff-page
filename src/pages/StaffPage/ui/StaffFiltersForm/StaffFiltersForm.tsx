import { type FC } from 'react';
import { 
  Chip, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent
} from '@mui/material';
import type { FiltersFormProps } from 'src/shared/types';
import { STAFF_DEPARTMENT, STAFF_ROLE } from '../../model';
import cls from './StaffFiltersForm.module.css';

export const StaffFiltersForm: FC<FiltersFormProps> = ({
  draftSearch,
  setDraftSearch,
  draftFields,
  setDraftFields
}) => {
  const selectedRoles = Array.isArray(draftFields?.role) 
    ? draftFields.role 
    : [];

  const selectedDepartments = Array.isArray(draftFields?.department) 
    ? draftFields.department 
    : [];

  const handleChangeSelected = (event: SelectChangeEvent<string[]>, key: string) => {
    const value = event.target.value;

    setDraftFields((old) => {
      const updatedFields = { ...old };

      if (Array.isArray(value) && value.length === 0) {
        delete updatedFields[key];
      } else {
        updatedFields[key] = value;
      }

      return updatedFields;
    });
  };

  return (
    <div className={cls.drawerBody}>
      <TextField
        fullWidth
        size="small"
        label="Поиск"
        value={draftSearch}
        onChange={(e) => setDraftSearch(e.target.value)}
      />

      <FormControl fullWidth size="small">
        <InputLabel id="role-label">Роль</InputLabel>
        <Select
          id="role"
          labelId="role-label"
          multiple
          value={selectedRoles}
          label="Роль"
          onChange={(e) => handleChangeSelected(e, 'role')}
          renderValue={(selected) => (
            <div className={cls.chipsContainer}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </div>
          )}
        >
          {Object.entries(STAFF_ROLE).map(([key, value]) => (
            <MenuItem key={key} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth size="small">
        <InputLabel id="department-label">Отдел</InputLabel>
        <Select
          id="department"
          labelId="department-label"
          multiple
          value={selectedDepartments}
          label="Отдел"
          onChange={(e) => handleChangeSelected(e, 'department')}
          renderValue={(selected) => (
            <div className={cls.chipsContainer}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </div>
          )}
        >
          {Object.entries(STAFF_DEPARTMENT).map(([key, value]) => (
            <MenuItem key={key} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
