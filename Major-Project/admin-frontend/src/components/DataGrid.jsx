'use client';

import { useMemo, useState } from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { Box, Paper, TextField } from '@mui/material';

export default function DataGrid({
  data,
  columns,
  onRowClick,
  onEdit,
  actions,
  searchFields = ['title', 'name'],
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = field
          .split('.')
          .reduce((obj, key) => obj?.[key], item)
          ?.toString()
          .toLowerCase();

        return value?.includes(query);
      })
    );
  }, [data, searchFields, searchQuery]);

  const rows = filteredData.map((item, index) => ({
    ...item,
    id: item._id || index,
  }));

  const displayColumns = onEdit || actions
    ? [
        ...columns,
        {
          field: 'actions',
          headerName: 'Actions',
          minWidth: actions ? 220 : 120,
          flex: actions ? 1 : 0.5,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <div className="flex gap-2">
              {onEdit ? (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit(params.row);
                  }}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
                >
                  Edit
                </button>
              ) : null}
              {actions ? actions(params.row) : null}
            </div>
          ),
        },
      ]
    : columns;

  return (
    <Paper className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,32,0.96),rgba(5,10,20,0.96))] p-4 shadow-2xl shadow-black/20" sx={{ background: 'transparent' }}>
      <Box className="mb-4">
        <TextField
          placeholder="Search records..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              minHeight: '52px',
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
        <MuiDataGrid
          rows={rows}
          columns={displayColumns}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          onRowClick={(params) => {
            const item = filteredData.find((entry) => entry._id === params.id);
            if (item && onRowClick) {
              onRowClick(item);
            }
          }}
          sx={{
            border: 'none',
            backgroundColor: '#050a14 !important',
            '.MuiDataGrid-cell': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              backgroundColor: '#050a14 !important',
              padding: '12px 16px',
              alignItems: 'center',
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
              cursor: onRowClick ? 'pointer' : 'default',
            },
            '.MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
            },
            '.MuiDataGrid-footerContainer': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              backgroundColor: '#0f1419 !important',
              color: '#ffffff',
            },
            '.MuiTablePagination-root, .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              color: '#ffffff',
              margin: 0,
            },
            '.MuiSelect-select': {
              color: '#ffffff !important',
            },
            '.MuiIconButton-root': {
              color: '#fbbf24',
            },
            '.MuiDataGrid-scrollbar, .MuiDataGrid-menuIconButton': {
              color: '#fbbf24',
            },
          }}
        />
      </Box>
    </Paper>
  );
}
