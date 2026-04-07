'use client'

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, Paper } from '@mui/material';

export default function AdminDataGrid({ data, columns, onRowClick, onEdit, actions, searchFields = ['title', 'name'] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    const query = searchQuery.toLowerCase();
    return data.filter(item => 
      searchFields.some(field => {
        // Handle nested fields with dot notation
        const value = field.split('.').reduce((obj, key) => obj?.[key], item)?.toString().toLowerCase();
        return value?.includes(query);
      })
    );
  }, [data, searchQuery, searchFields]);

  const rows = filteredData.map((item, idx) => ({
    ...item,
    id: item._id || idx,
  }));

  // Add actions column if onEdit or actions are provided
  const displayColumns = (onEdit || actions) ? [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: actions ? 200 : 120,
      flex: actions ? 1 : 0.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(params.row);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          )}
          {actions && actions(params.row)}
        </div>
      ),
    },
  ] : columns;

  const handleRowClick = (params) => {
    const item = filteredData.find(d => d._id === params.id);
    if (item && onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <Paper className="rounded-2xl border border-white/10 bg-[#0b1220] p-4 mt-6" sx={{ background: 'transparent' }}>
      <Box className="mb-4">
        <TextField
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            },
            '& .MuiOutlinedInput-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
              opacity: 1,
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        />
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <DataGrid
          rows={rows}
          columns={displayColumns}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          onRowClick={handleRowClick}
          sx={{
            border: 'none',
            backgroundColor: '#050a14 !important',
            '.MuiDataGrid-root': {
              backgroundColor: '#050a14 !important',
              color: '#ffffff',
              fontSize: '14px',
            },
            '.MuiDataGrid-cell': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              cursor: 'pointer',
              backgroundColor: '#050a14 !important',
              padding: '12px 16px',
            },
            '.MuiDataGrid-columnHeader': {
              backgroundColor: '#0f1419 !important',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#fbbf24',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            },
            '.MuiDataGrid-row': {
              backgroundColor: '#050a14 !important',
              borderColor: 'rgba(255, 255, 255, 0.06)',
              '&:hover': {
                backgroundColor: '#0f1823 !important',
              },
              cursor: 'pointer',
            },
            '.MuiDataGrid-footerContainer': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              backgroundColor: '#0f1419 !important',
              color: '#ffffff',
            },
            '.MuiTablePagination-root': {
              color: '#ffffff',
            },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              margin: 0,
              color: '#ffffff',
            },
            '.MuiSelect-select': {
              color: '#ffffff !important',
            },
            '.MuiIconButton-root': {
              color: '#fbbf24',
              '&:hover': {
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
              },
            },
            '.MuiCheckbox-root': {
              color: 'rgba(255, 255, 255, 0.5)',
              '&.Mui-checked': {
                color: '#fbbf24',
              },
            },
            '.MuiTablePagination-toolbar': {
              backgroundColor: '#0f1419 !important',
            },
          }}
        />
      </Box>
    </Paper>
  );
}
