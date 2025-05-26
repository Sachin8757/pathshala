<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/stylesheet/details.css">
    <title>Student Details</title>

</head>
<body>

    <div class="container">
        <h2>Student Details</h2>
        <div class="details">
            <p><span class="label">Name:</span><%= st.student_name %></p>
            <p><span class="label">Father's Name:</span><%= st.fathers_name %></p>
            <p><span class="label">Fee:</span>&#8377;<%= st.fee %></p>
            <p><span class="label">Join Date:</span><%= new Date(st.join_date).toLocaleDateString("en-IN", { day: '2-digit', month: '2-digit', year: 'numeric' }) %></p>

        </div>
        <h2>Months of the Year</h2>
   <table>
    <thead>
        <tr>
            <th>Month Number</th>
            <th>Month Name</th>
            <th>Paid</th>
            <th>Dues</th>
        </tr>
    </thead>
<tbody>
    <tr><td>1</td><td>January</td><td><%= st.Month.jan ? st.Month.jan : "Not Paid" %></td></tr>
    <tr><td>2</td><td>February</td><td><%= st.Month.feb ? st.Month.feb : "Not Paid" %></td></tr>
    <tr><td>3</td><td>March</td><td><%= st.Month.mar ? st.Month.mar : "Not Paid" %></td></tr>
    <tr><td>4</td><td>April</td><td><%= st.Month.apr ? st.Month.apr : "Not Paid" %></td></tr>
    <tr><td>5</td><td>May</td><td><%= st.Month.may ? st.Month.may : "Not Paid" %></td></tr>
    <tr><td>6</td><td>June</td><td><%= st.Month.jun ? st.Month.jun : "Not Paid" %></td></tr>
    <tr><td>7</td><td>July</td><td><%= st.Month.jul ? st.Month.jul : "Not Paid" %></td></tr>
    <tr><td>8</td><td>August</td><td><%= st.Month.aug ? st.Month.aug : "Not Paid" %></td></tr>
    <tr><td>9</td><td>September</td><td><%= st.Month.sep ? st.Month.sep : "Not Paid" %></td></tr>
    <tr><td>10</td><td>October</td><td><%= st.Month.oct ? st.Month.oct : "Not Paid" %></td></tr>
    <tr><td>11</td><td>November</td><td><%= st.Month.nov ? st.Month.nov : "Not Paid" %></td></tr>
    <tr><td>12</td><td>December</td><td><%= st.Month.dec ? st.Month.dec : "Not Paid" %></td></tr>
</tbody>
</table>

    </div>

</body>
</html>