import { Box, TextField } from '@mui/material'

const DateSelector = ({ fromDate, toDate, onFromDateChange, onToDateChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextField
        size="small"
        fullWidth
        type="date"
        label="From"
        InputLabelProps={{
          shrink: true,
        }}
        value={fromDate}
        onChange={e => onFromDateChange(e.target.value)}
        style={{ marginRight: '6px' }}
      />
      <TextField
        size="small"
        fullWidth
        type="date"
        label="To"
        InputLabelProps={{
          shrink: true,
        }}
        value={toDate}
        onChange={e => onToDateChange(e.target.value)}        
      />
    </Box>
  )
}
export default DateSelector;