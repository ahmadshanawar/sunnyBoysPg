import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import LensIcon from '@mui/icons-material/Search';
import ResetIcon from '@mui/icons-material/RestartAlt'
import { firebaseDb } from '../../../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from '@firebase/firestore';
import { Container, Divider, Paper, Dialog, DialogTitle, DialogContent, Box, Card, DialogContentText, DialogActions, Select, MenuItem } from '@mui/material';
import { format, parseISO, isWithinInterval } from 'date-fns';
import ClosableAlert from '../../../common/closableAlert';
import DateSelector from '../../../common/dateSelector';

const ExpenseTracker = () => {
  const [expenseItem, setExpenseItem] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [expensePaidBy, setExpensePaidBy] = useState('');
  const [addError, setAddError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const [expenseType, setExpenseType] = useState('')
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };
  const handleToDateChange = (date) => {
    setToDate(date);
  };
  const getAllExpense = async () => {
    try {
      setLoading(true);
      const docRef = doc(firebaseDb, "Expenses", "ExpenseTracker");
      const docSnap = await getDoc(docRef);
      let data = (docSnap.data()?.expenses || []).filter((item) => item.deleted === false);
      setExpenses(data);
    } catch (err) {
      setAddError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmation = (expense) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };

  const generateExpenseId = () => {
    return 'Exp_' + Math.random().toString(36).slice(2, 9);
  };

  const handleAddExpense = async () => {
    const newExpense = {
      id: generateExpenseId(),
      name: expenseItem,
      amount: expenseAmount,
      createdAt: format(new Date(), "dd-MM-yyyy'T'HH:mm:ss"),
      deleted: false,
      paidBy: expensePaidBy,
      expenseType: expenseType
    };
    try {
      setLoading(true);
      const updatedExpenses = [...expenses, newExpense];
      const docRef = doc(firebaseDb, "Expenses", "ExpenseTracker");
      await updateDoc(docRef, {
        expenses: arrayUnion(newExpense)
      });
      setExpenses(updatedExpenses);
      setExpenseItem('');
      setExpenseAmount('');
      setExpenseType('');
      setExpensePaidBy('')
      setDeleteDialogOpen(false);
      setAddSuccess(true);
      setIsAddExpenseModalOpen(false)
    } catch (err) {
      setAddError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async () => {
    try {
      setLoading(true);
      setDeleteSuccess(false);
      const updatedExpenses = expenses.map(expense => {
        return expense.id === expenseToDelete.id ? { ...expense, deleted: true } : expense
      });
      const docRef = doc(firebaseDb, "Expenses", "ExpenseTracker");
      await updateDoc(docRef, { expenses: updatedExpenses });
      setExpenses(updatedExpenses);
      setDeleteDialogOpen(false);
      setDeleteSuccess(true)
    } catch (err) {
      setDeleteError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  function parseCustomDate(dateString) {
    const [day, month, yearAndTime] = dateString.split("-");
    const [year, time] = yearAndTime.split("T");
    const [hours, minutes, seconds] = time.split(":");
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
  const handleSearchClick = async () => {
    try {
      const docRef = doc(firebaseDb, "Expenses", "ExpenseTracker");
      const docSnap = await getDoc(docRef);
      const expensesData = docSnap.data()?.expenses || [];

      // Parse fromDate and toDate to Date objects
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      // Filter expenses based on createdAt field
      const filteredExpenses = expensesData.filter(item => {
        const createdAtDate = parseCustomDate(item.createdAt);
        return isWithinInterval(createdAtDate, { start: fromDateObj, end: toDateObj });
      });

      setExpenses(filteredExpenses);
    } catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    if (fromDate.length === 0 && toDate.length === 0)
      getAllExpense();
  }, [expenses, fromDate, toDate]);

  const handleResetClick = () => {
    setFromDate('')
    setToDate('')
  }

  return (
    <Container>
      <Card>
        <div style={{ padding: '20px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h5" color='#575757' gutterBottom >Expense Tracker</Typography>
            <IconButton color="primary" onClick={() => setIsAddExpenseModalOpen(true)} sx={{ marginRight: 2, marginTop: -1 }}>
              <AddIcon sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                fontSize: '30px',
                borderRadius: '50%',
              }} />
            </IconButton>
            {addError && <ClosableAlert message="Unable to add expense" severity="error" />}
            {deleteError && <ClosableAlert message="Unable to delete expense" severity="error" />}
            {deleteSuccess && <ClosableAlert message="Expense deleted!" severity="success" />}
            {addSuccess && <ClosableAlert message="Expenses Added" severity="success" />}
          </Box>
          <Divider sx={{ margin: '20px' }} />
          <Grid container justifyContent="flex-start" alignItems="center" style={{ display: 'inline-flex' }}>
            <Grid item xs={10} sm={4}>
              <DateSelector
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
              />
            </Grid>
            <Grid item xs={1} sm={.35}>
              <IconButton variant="outlined" onClick={handleSearchClick}>
                <LensIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={.35}>
              <IconButton variant="outlined" onClick={handleResetClick}>
                <ResetIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Grid>
          </Grid>


          <Divider sx={{ margin: '20px' }} />
          <div style={{ marginTop: '20px' }}>
            {expenses?.length > 0 && expenses.map((expense, index) => (
              <Paper key={index} sx={{ margin: '8px', padding: 1 }}>
                <Grid container key={index}>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="body1" fontSize={'14px'}>{expense?.createdAt?.slice(0, 10)}</Typography>
                    <Typography variant="body1" fontSize={'12px'}>{expense?.createdAt?.slice(11, expense?.createdAt.length)}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>{expense.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body1">₹{expense.amount}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1">{expense.paidBy}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1} container justifyContent="flex-end">
                    <IconButton onClick={() => handleDeleteConfirmation(expense)} aria-label="delete" >
                      <DeleteIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
        </div>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Expense?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this expense?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteExpense} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isAddExpenseModalOpen}
          onClose={() => setIsAddExpenseModalOpen(false)}
          aria-labelledby="add-expense-dialog-title"
        >
          <DialogTitle id="add-expense-dialog-title">Add Expense</DialogTitle>
          <Divider />
          <DialogContent>
            <Container>
              <Select
                sx={{ marginBottom: 2 }}
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                fullWidth
                displayEmpty
                defaultValue=""
                size="small"
              >
                <MenuItem value="" disabled>Expense Type</MenuItem>
                <MenuItem value="Repair">Repair</MenuItem>
                <MenuItem value="Electricity">Electricity</MenuItem>
                <MenuItem value="Sweeper">Sweeper</MenuItem>
                <MenuItem value="Cleaning">Cleaning</MenuItem>
                <MenuItem value="White Wash">White Wash</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              <TextField
                sx={{ marginBottom: 2 }}
                size="small"
                label="Expense Item"
                value={expenseItem}
                onChange={(e) => setExpenseItem(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                sx={{ marginBottom: 2 }}
                size="small"
                label="Expense Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
              <Select
                sx={{ marginBottom: 2 }}
                value={expensePaidBy}
                onChange={(e) => setExpensePaidBy(e.target.value)}
                fullWidth
                displayEmpty
                defaultValue=""
                size="small"
              >
                <MenuItem value="" disabled>Paid By</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
              </Select>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddExpenseModalOpen(false)} color="primary" variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleAddExpense} disabled={!(expenseType && expenseAmount && expensePaidBy && expenseItem)} color="primary" variant='outlined'>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Card >
    </Container>
  );
};

export default ExpenseTracker;
