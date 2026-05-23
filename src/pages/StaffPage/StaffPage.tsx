import { useState } from 'react'
import { Typography } from '@mui/material';
import { initFilters } from 'src/shared/config';
import type { Filters } from 'src/shared/types';
import { FiltersDrawer, ListFilters } from 'src/shared/ui';
import { StaffFiltersForm, StaffTable } from './ui';
import { columns } from './model';
import cls from './StaffPage.module.css';

export const StaffPage = () => {
  const [filters, setFilters] = useState<Filters>(initFilters);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((old) => ({
      ...old,
      ...newFilters
    }));
  };

  return (
    <div className={cls.content}>
      <Typography variant="h1" className={cls.title}>Сотрудники компании</Typography>
      
      <ListFilters
        columns={columns}
        filters={filters}
        updateFilters={updateFilters}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <FiltersDrawer
        filters={filters}
        updateFilters={updateFilters}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      >
        {(drawerProps) => <StaffFiltersForm {...drawerProps} />}
      </FiltersDrawer>
      
      <StaffTable 
        filters={filters}
        updateFilters={updateFilters}
      />
    </div>
  );
};
