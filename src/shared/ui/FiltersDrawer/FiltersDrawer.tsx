import { useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from 'react';
import { 
  Button, 
  Drawer, 
  Typography, 
} from '@mui/material';
import type { Filters, FiltersFormProps } from 'src/shared/types';
import cls from './FiltersDrawer.module.css';

type Props = {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  children: (props: FiltersFormProps) => ReactNode;
};

export const FiltersDrawer: FC<Props> = ({ filters, updateFilters, isDrawerOpen, setIsDrawerOpen, children }) => {
  const [draftSearch, setDraftSearch] = useState<Filters['search']>('');
  const [draftFields, setDraftFields] = useState<Filters['fields']>({});

  useEffect(() => {
    if (isDrawerOpen) {
      setDraftSearch(filters.search);
      setDraftFields(filters.fields);
    }
  }, [isDrawerOpen])

  const handleSave = () => {
    const newFilters = {
      page: 0,
      search: draftSearch,
      fields: draftFields
    }
    updateFilters(newFilters);
    setIsDrawerOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      slotProps={{
        paper: {
          className: cls.paper,
        }
      }}
    >
      <div className={cls.drawerHeader}>
        <Typography variant="h2">
          Filters
        </Typography>
        
        <div className={cls.drawerActions}>
          <Button 
            variant="text" 
            color="inherit" 
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      {children({
        draftSearch: draftSearch,
        setDraftSearch,
        draftFields: draftFields,
        setDraftFields
      })}
    </Drawer>
  );
};
