import React, { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { 
  Box, 
  Button, 
  Drawer, 
  Chip, 
  Typography, 
  IconButton, 
  Stack, 
  Paper
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { type ListFilters, type ListParams } from 'src/config';
import cls from './StaffFilters.module.css';

type Props = {
  filters: ListFilters;
  setFilters: Dispatch<SetStateAction<ListFilters>>
}

export const StaffFilters: FC<Props> = ({ filters, setFilters }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fields = Object.entries(filters.fields || {});
  const hasActiveFilters = fields.length > 0;

  const updateFilters = (newFilters: ListFilters) => {
    setFilters((old: ListFilters) => ({
      ...old,
      ...newFilters
    }));
  }

  const handleRemoveFilter = (key: string) => {
    const updatedFields = { ...filters.fields };
    delete updatedFields[key];

    const newFilters = { page: 1, fields: updatedFields };
    updateFilters(newFilters);
  };

  const handleResetAll = () => {
    const newFilters = { 
      page: 0,
      search: '',
      fields: {}
     };
     updateFilters(newFilters);
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Главный контейнер-строка */}
      <Stack 
        direction="row" 
        // justifyContent="space-between" 
        // alignItems="center"
        spacing={2}
        component={Paper}
      >
        {/* Левая часть: Выбранные фильтры (чипсы) */}
        <Stack 
          direction="row" 
          spacing={1} 
          // flexWrap="wrap" 
          // В MUI v6 пропсы контейнеров отлично работают с флекс-гэпами
          sx={{ gap: 1 }} 
          component={Paper}
        >
          {hasActiveFilters && fields.map(([key, value]) => (
            <Chip
              key={key}
              label={`${key}: ${value}`} 
              onDelete={() => handleRemoveFilter(key)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>

        {/* Правая часть: Кнопки */}
        <Stack 
          direction="row" 
          spacing={2} 
          // alignItems="center" 
          sx={{ flexShrink: 0 }}
          component={Paper}
        >
          {hasActiveFilters && (
            <Button 
              variant="text" 
              color="error" 
              onClick={handleResetAll}
            >
              Сбросить все фильтры
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Фильтры
          </Button>
        </Stack>
      </Stack>

      {/* Боковая панель (Drawer) */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        // В MUI v6 свойство PaperProps считается устаревшим, 
        // вместо него используется современный slotProps.paper
        slotProps={{
          paper: {
            sx: { 
              width: { xs: '100%', sm: 400 }, 
              p: 3,
              boxSizing: 'border-box'
            }
          }
        }}
      >
        {/* Шапка Дровера */}
        <Stack 
          direction="row" 
          // justifyContent="space-between" 
          // alignItems="center" 
          sx={{ mb: 3 }}
          component={Paper}
        >
          <Typography variant="h6" component="h3">
            Фильтры
          </Typography>
          <IconButton onClick={() => setIsDrawerOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Тело Дровера */}
        <Box>
          <Typography color="text.secondary">
            Тут будут ваши инпуты (TextField, Select и т.д.)
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};