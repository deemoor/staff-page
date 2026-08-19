import { type Dispatch, type FC, type SetStateAction } from 'react';
import { 
  Button, 
  Chip, 
  Paper,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getLabel } from 'src/shared/lib';
import type { Column, Filters } from 'src/shared/types';
import cls from './ListFilters.module.css';

type Props = {
  columns: Column[];
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

export const ListFilters: FC<Props> = ({ columns, filters, updateFilters, setIsDrawerOpen }) => {
  const fields = Object.entries(filters.fields || {});
  const hasFields = fields.length > 0;

  const handleRemoveField = (key: string) => {
    const updatedFields = { ...filters.fields };
    delete updatedFields[key];

    updateFilters({ page: 0, fields: updatedFields });
  };

  const handleRemoveSearch = () => {
    updateFilters({ page: 0, search: '' });
  };

  const handleResetAll = () => {
    updateFilters({ 
      page: 0,
      search: '',
      fields: {}
    });
  };

  return (
    <Paper className={cls.container} elevation={0}>
      <div className={cls.chipContainer}>
        {filters.search &&
          <Chip
            key={'search'}
            label={`Search: ${filters.search}`}
            onDelete={handleRemoveSearch}
            color="primary"
            variant="outlined"
          />
        }
        {hasFields && fields.map(([key, value]) => (
          <Chip
            key={key}
            label={getLabel(columns, key, value)}
            onDelete={() => handleRemoveField(key)}
            color="primary"
            variant="outlined"
          />
        ))}
      </div>
  
      <div className={cls.actionsContainer}>
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={() => setIsDrawerOpen(true)}
          >
          Filters
        </Button>
        {(hasFields || filters.search) && (
          <Button 
            variant="text" 
            color="error" 
            onClick={handleResetAll}
          >
            Reset all filters
          </Button>
        )}
      </div>
    </Paper>
  );
};
