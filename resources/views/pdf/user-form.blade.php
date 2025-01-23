<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-height: 100px;
        }
        .header .company-name {
            font-size: 30px;
            font-weight: bold;
        }
        .title {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 30px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            text-decoration: underline;
        }
        .content p {
            font-size: 14px;
            margin: 5px 0;
        }
        .images {
            text-align: center;
            margin-top: 30px;
        }
        .images img {
            max-width: 150px;
            margin: 10px;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .data-table tr {
            border-bottom: 1px solid #ddd;
        }
        .data-table td {
            padding: 8px 10px;
            vertical-align: top;
        }
        .data-table .label {
            width: 30%; /* Label column width */
            color: #555;
        }
        .data-table .value {
            width: 70%; /* Value column width */
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <div class="header">
        <img src="{{ public_path('images/uniqLogo.png') }}" alt="Company Logo">
        <div class="company-name">UNIQ MICRO</div>
    </div>

    <!-- Title -->
    <div class="title">Loan Application Form</div>

    <!-- Biodata Section -->
    <!-- Biodata Section -->
    <div class="section">
        <div class="section-title">Biodata</div>
        <table class="data-table">
            <tr>
                <td class="label">Full Name</td>
                <td class="value">{{ $userForm->first_name }} {{ $userForm->surname }}</td>
            </tr>
            <tr>
                <td class="label">Gender</td>
                <td class="value">{{ $userForm->gender }}</td>
            </tr>
            <tr>
                <td class="label">Date of Birth</td>
                <td class="value">{{ $userForm->date_of_birth }}</td>
            </tr>
            <tr>
                <td class="label">Nationality</td>
                <td class="value">{{ $userForm->nationality }}</td>
            </tr>
            <tr>
                <td class="label">Street Name</td>
                <td class="value">{{ $userForm->street_name }}</td>
            </tr>
            <tr>
                <td class="label">House Number</td>
                <td class="value">{{ $userForm->house_number }}</td>
            </tr>
            <tr>
                <td class="label">City</td>
                <td class="value">{{ $userForm->city }}</td>
            </tr>
            <tr>
                <td class="label">Province</td>
                <td class="value">{{ $userForm->province }}</td>
            </tr>
            <tr>
                <td class="label">Postal Code</td>
                <td class="value">{{ $userForm->postal_code }}</td>
            </tr>
            <tr>
                <td class="label">Telephone</td>
                <td class="value">{{ $userForm->telephone }}</td>
            </tr>
            <tr>
                <td class="label">Email</td>
                <td class="value">{{ $userForm->email }}</td>
            </tr>
        </table>
    </div>

    <!-- Professional Data Section -->
    <div class="section">
        <div class="section-title">Other Info</div>
        <table class="data-table">
            <tr>
                <td class="label">Profession</td>
                <td class="value">{{ $userForm->profession }}</td>
            </tr>
            <tr>
                <td class="label">Date of Payment</td>
                <td class="value">{{ $userForm->date_of_payment }}</td>
            </tr>
            <tr>
                <td class="label">Codice Fiscale</td>
                <td class="value">{{ $userForm->codice_fiscale }}</td>
            </tr>
            <tr>
                <td class="label">ID Type</td>
                <td class="value">{{ $userForm->id_type }}</td>
            </tr>
            <tr>
                <td class="label">Bank Details</td>
                <td class="value">{{ $userForm->bank_details }}</td>
            </tr>
            <tr>
                <td class="label">Loan Purpose</td>
                <td class="value">{{ $userForm->loan_purpose }}</td>
            </tr>
        </table>
    </div>
        <br />
        <br />
        <br />
    <!-- Guarantor Data Section -->
    <div class="section">
        <div class="section-title">Guarantor Data</div>
        <table class="data-table">
            <tr>
                <td class="label">First Name</td>
                <td class="value">{{ $userForm->guarantor_first_name }}</td>
            </tr>
            <tr>
                <td class="label">Surname</td>
                <td class="value">{{ $userForm->guarantor_surname }}</td>
            </tr>
            <tr>
                <td class="label">Telephone</td>
                <td class="value">{{ $userForm->guarantor_telephone }}</td>
            </tr>
            <tr>
                <td class="label">Street Name</td>
                <td class="value">{{ $userForm->guarantor_street_name }}</td>
            </tr>
            <tr>
                <td class="label">House Number</td>
                <td class="value">{{ $userForm->guarantor_house_number }}</td>
            </tr>
            <tr>
                <td class="label">City</td>
                <td class="value">{{ $userForm->guarantor_city }}</td>
            </tr>
            <tr>
                <td class="label">Province</td>
                <td class="value">{{ $userForm->guarantor_province }}</td>
            </tr>
            <tr>
                <td class="label">Postal Code</td>
                <td class="value">{{ $userForm->guarantor_postal_code }}</td>
            </tr>
            <tr>
                <td class="label">ID Type</td>
                <td class="value">{{ $userForm->guarantor_id_type }}</td>
            </tr>
            <tr>
                <td class="label">Nationality</td>
                <td class="value">{{ $userForm->guarantor_nationality }}</td>
            </tr>
        </table>
    </div>

    <!-- Office Data Section -->
    <div class="section">
        <div class="section-title">Office Data</div>
        <table class="data-table">
            <tr>
                <td class="label">Amount</td>
                <td class="value">{{ $userForm->amount }}</td>
            </tr>
            <tr>
                <td class="label">Rate</td>
                <td class="value">{{ $userForm->rate }}</td>
            </tr>
            <tr>
                <td class="label">Total Amount</td>
                <td class="value">{{ $userForm->total_amount }}</td>
            </tr>
            <tr>
                <td class="label">Number of Months</td>
                <td class="value">{{ $userForm->number_of_months }}</td>
            </tr>
        </table>
    </div>

    <!-- Signatures and ID Cards Section -->
    <div class="images">
        <!-- Applicant ID Cards -->
        <div class="row">
            @if (file_exists(public_path('storage/' . $userForm->idcard_front)))
                <div>
                    <img src="{{ public_path('storage/' . $userForm->idcard_front) }}" alt="Applicant ID Card Front">
                    <div class="label">ID Card Front</div>
                </div>
            @endif
            @if (file_exists(public_path('storage/' . $userForm->idcard_back)))
                <div>
                    <img src="{{ public_path('storage/' . $userForm->idcard_back) }}" alt="Applicant ID Card Back">
                    <div class="label">ID Card Back</div>
                </div>
            @endif
        </div>

        <!-- Guarantor ID Cards -->
        <div class="row">
            @if (file_exists(public_path('storage/' . $userForm->guarantor_idcard_front)))
                <div>
                    <img src="{{ public_path('storage/' . $userForm->guarantor_idcard_front) }}" alt="Guarantor ID Card Front">
                    <div class="label">Guarantor ID Card Front</div>
                </div>
            @endif
            @if (file_exists(public_path('storage/' . $userForm->guarantor_idcard_back)))
                <div>
                    <img src="{{ public_path('storage/' . $userForm->guarantor_idcard_back) }}" alt="Guarantor ID Card Back">
                    <div class="label">Guarantor ID Card Back</div>
                </div>
            @endif
        </div>

        <!-- Signatures -->
        <div class="row">
            @if (file_exists(public_path('storage/' . $userForm->applicant_signature)))
                <div>
                    <img src="{{ public_path('storage/' . $userForm->applicant_signature) }}" alt="Applicant Signature">
                    <div class="label">Applicant Signature</div>
                </div>
            @endif
            @if (file_exists(public_path('storage/' . $userForm->guarantor_signature)))
                <div>
                    <img src="{{ public_path('storage/' . $userForm->guarantor_signature) }}" alt="Guarantor Signature">
                    <div class="label">Guarantor Signature</div>
                </div>
            @endif
        </div>
    </div>

</body>
</html>
