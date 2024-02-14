import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "@firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { Paper, Typography, Grid, Divider, Container, Card } from "@mui/material";
import PaymentsAccordian from "./paymentsAccordian";
import { doc, setDoc } from '@firebase/firestore';
import { format, addMonths } from 'date-fns';
import ClosableAlert from "../../../common/closableAlert";

const TennantPayments = () => {
  const [tennants, setTennants] = useState([])
  const [paymentUpdated, setPaymentUpdated] = useState(false)

  const getTennents = async () => {
    try {
      setTennants([])
      let data = [];
      setTennants([])
      const q = query(collection(firebaseDb, "Users"), where("role", "==", 'READ'), where("status", "==", "Active"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setTennants(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddPayment = async (tennant, paymentAmount, paymentDate, dueMonth) => {
    const currentDate = new Date();
    const currentMonth = format(currentDate, 'yyyy-MM'); // Get current month in YYYY-MM format
    let totalAmountPaid = 0;
    let isNewMonth = true; // Set isNewMonth to true initially

    // Check if the selected due month exists in payment history
    const existingPaymentIndex = tennant?.paymentHistory?.findIndex(payment => format(payment.dueDate, 'yyyy-MM') === dueMonth);

    if (existingPaymentIndex !== -1) {
      isNewMonth = false; // Set isNewMonth to false if the selected due month exists in payment history
      // Sum up the total payment amount for the selected month
      totalAmountPaid = tennant.paymentHistory.reduce((total, payment) => {
        if (format(payment.dueDate, 'yyyy-MM') === dueMonth) {
          return total + payment.paymentAmount;
        }
        return total;
      }, 0);
    }

    // Calculate total due amount
    const totalRent = tennant?.finalizedRent;
    const dueAmount = parseFloat(totalRent) - parseFloat(paymentAmount) - totalAmountPaid;

    // Determine due date for the new row
    let newDueDate = currentDate; // Use the current date by default
    if (!isNewMonth && tennant.paymentHistory[existingPaymentIndex]) {
      newDueDate = tennant.paymentHistory[existingPaymentIndex].dueDate;
    }

    // Add new payment object
    let updatedPaymentRow = {
      paymentDate: paymentDate,
      paymentAmount: parseFloat(paymentAmount),
      rent: totalRent,
      status: (totalAmountPaid + parseFloat(paymentAmount) >= totalRent) ? 'Paid' : 'Pending',
      dueAmount: dueAmount < 0 ? 0 : dueAmount,
      dueDate: newDueDate, // Use the determined due date
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), // Corrected typo in property name
    };

    // Add a new row for the payment
    tennant.paymentHistory.push(updatedPaymentRow);

    // Check if rent is paid in full for the selected month
    if (totalAmountPaid + parseFloat(paymentAmount) >= totalRent) {
      // Update status to 'Paid' and add a new row for the next month
      updatedPaymentRow.status = 'Paid';
      const nextMonthDate = addMonths(newDueDate, 1);
      const nextMonthFormatted = format(nextMonthDate, 'yyyy-MM-dd');

      tennant.paymentHistory.push({
        paymentDate: "",
        paymentAmount: 0,
        rent: totalRent,
        status: 'Pending',
        dueAmount: totalRent,
        dueDate: nextMonthFormatted,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'), // Corrected typo in property name
      });
    }

    try {
      const userRef = doc(firebaseDb, "Users", tennant.uid);
      await setDoc(userRef, {
        ...tennant,
        paymentHistory: tennant.paymentHistory,
      });
      console.log('successfully updated');
      getTennents()
    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    getTennents()
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Payments</Typography>
      {paymentUpdated && <ClosableAlert message="Payment has been successfully updated" severity={'success'} />}
      <Divider />
      <Card elevation={3} sx={{ padding: 2, minHeight: '80vh' }} >
        <Grid>
          <Grid item xs={12}>
            <Paper>
              {tennants.map((tennant) => {
                return <PaymentsAccordian
                  key={tennant.emailUid}
                  tennant={tennant}
                  handleAddPayment={handleAddPayment}
                />
              })}
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default TennantPayments;
