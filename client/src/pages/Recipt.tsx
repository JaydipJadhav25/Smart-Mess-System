// import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axiosInstances";
// import { useEffect } from "react";

const Receipt = () => {
    const { id } = useParams();
    const navigate = useNavigate();

   //api call
  //react-query
const { isError, isLoading, data, error } = useQuery({
  queryKey: ["Messmenu" , id],
  queryFn: async () => {
    if(!id){
        return null;
    }

    const response = await axiosInstance(`open/fee/record/${id}`);
    return response?.data;
  },
  staleTime: Infinity,        // never becomes stale
  gcTime: Infinity,           // never garbage collect cached data
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  retry: false,               // optional: no retries if it fails
});


console.log("data : " , isError , isLoading , error  ,data);

  const downloadReceiptPDF = async () => {
    const receipt = document.getElementById("receipt");
    const iframe: any = document.getElementById("print-frame");

    if (!receipt || !iframe) {
      alert("Receipt not found");
      return;
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const cleanHtml = receipt.outerHTML.replace(
      'id="receipt"',
      'id="receipt-print"'
    );

    iframeDoc.open();
    iframeDoc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Receipt</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: Arial, Helvetica, sans-serif;
            background: #ffffff;
            color: #000000;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
          }
          h1, h2, h3, p {
            margin: 6px 0;
          }
        </style>
      </head>
      <body>
        ${cleanHtml}
      </body>
    </html>
  `);
    iframeDoc.close();

    // Wait for layout
    await new Promise((res) => setTimeout(res, 500));

    iframeDoc.body.style.width = "210mm";

    const canvas = await html2canvas(iframeDoc.body, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    if (!canvas.width || !canvas.height) {
      throw new Error("Canvas render failed");
    }

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`mess-fee-receipt-${data.month}-${data.year}.pdf`);
  };



  function handleBack(){
    navigate("/profile-records");
  }


// console.log(data.razorpay_Payment_Id === null ? data._id : data.razorpay_Payment_Id)

  return (
    <div>
      {/* NAVBAR */}
      <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* --- BACK BUTTON --- */}
          <button
              onClick={handleBack}
            className="group flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center mr-2 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            <span className="font-medium text-sm">Back to Dashboard</span>
          </button>

          {/* --- TITLE (Optional, for context) --- */}
          <div className="hidden md:block font-semibold text-gray-700">
            Receipt Preview
          </div>
          {/* --- DOWNLOAD BUTTON --- */}
          <button
              hidden={isLoading || isError}
            onClick={downloadReceiptPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download PDF
          </button>
        </div>
      </nav>
    
    {
        isLoading ? <>
         <h1 style={{textAlign : "center" , color : "green" , fontSize : "20px" , marginTop : "20px"}}>Loading...</h1>
        </>:
        <>
           {
            isError ? <>
         <h1 style={{textAlign : "center" , color : "red" , fontSize : "20px" , marginTop : "20px" }}>Service Temporarily Unavailable!</h1>    
            </> : <>
             {/* HIDDEN IFRAME */}
      <iframe
        id="print-frame"
        title="receipt-print"
        style={{
          position: "fixed",
          top: "-10000px",
          left: "-10000px",
          width: "210mm",
          height: "297mm",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* RECEIPT */}
      <div
        id="receipt"
        style={{
          width: "600px", // A4 Ratio width
          background: "#fff",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          padding: "40px",
          margin: "20px auto",

          boxShadow: "0 0 20px rgba(0,0,0,0.1)",

          border: "1px solid #e0e0e0",

          position: "relative",

          color: "#333",
        }}
      >
        {/* --- HEADER --- */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          {/* Left: Organization Info */}

          <div style={{ flex: 1 }}>
            {/* Logo Placeholder */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#2563eb",
                  borderRadius: "5px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  SM
                </span>
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    color: "#2563eb",
                    textTransform: "uppercase",
                  }}
                >
                  Smart Mess System
                </h2>

                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  Pune, Maharashtra - 411041
                </p>

                <p
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  support@smartmess.com
                </p>
              </div>
            </div>
          </div>

          {/* Right: Receipt Label */}
          <div style={{ textAlign: "right" }}>
            <h1
              style={{
                fontSize: "24px",
                color: "#333",
                margin: "0 0 10px 0",
                letterSpacing: "2px",
              }}
            >
              PAYMENT RECEIPT
            </h1>

            <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
              Receipt No: <strong>{data._id}</strong>
            </p>

            <p style={{ margin: "4px 0", fontSize: "13px", color: "#666" }}>
              Date: <strong>{data.paymentDate}</strong>
            </p>
          </div>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #eee",
            marginBottom: "30px",
          }}
        />

        {/* --- BILL TO & TRANSACTION DETAILS --- */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          {/* Bill To */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                color: "#888",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Bill To:
            </p>

            <h3
              style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#000" }}
            >
              {data.studentName}
            </h3>

            <p style={{ margin: "0 0 2px 0", fontSize: "13px", color: "#555" }}>
              ID: STU-{data.student_Id}
            </p>
            <p style={{ margin: "0", fontSize: "13px", color: "#555" }}>
              +91 12345 67890
            </p>

            <p style={{ margin: "0", fontSize: "13px", color: "#555" }}>
              {data.studentEmail}
            </p>
          </div>

          {/* Transaction Meta */}
          <div style={{ flex: 1, textAlign: "right" }}>
            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                color: "#888",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Transaction Details:
            </p>

            <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.6" }}>
              <p style={{ margin: 0 }}>
                Txn ID:{" "}
                <span style={{ fontFamily: "monospace" }}>
                  {data.razorpay_Payment_Id === null ? data._id : data.razorpay_Payment_Id}
                </span>
              </p>

              <p style={{ margin: 0 }}>Payment Mode: {data.method}</p>

              <p style={{ margin: 0 }}>
                Status:{" "}
                {data.status === "paid" && <span style={{ color: "green", fontWeight: "bold" }}>
                  {data.status}
                </span>}

                {data.status !== "paid" && <span style={{ color: "red", fontWeight: "bold" }}>
                  {data.status}
                </span>}
              </p>
            </div>
          </div>
        </div>

        {/* --- TABLE --- */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#f8f9fa", textAlign: "left" }}>
              <th
                style={{
                  padding: "12px",
                  fontSize: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                  textTransform: "uppercase",
                }}
              >
                Item & Description
              </th>

              <th
                style={{
                  padding: "12px",
                  fontSize: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                  textTransform: "uppercase",
                  textAlign: "right",
                  width: "120px",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                style={{
                  padding: "16px 12px",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                <strong>Mess Fees - {data.month} {data.year}</strong> <br />
                <span style={{ fontSize: "12px", color: "#777" }}>
                  Standard Monthly Plan (Unlimited)
                </span>
              </td>

              <td
                style={{
                  padding: "16px 12px",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                  color: "#333",
                  textAlign: "right",
                }}
              >
               {data.amount}
              </td>
            </tr>

            {/* Example of Fee Breakdown like in your PDF */}

            <tr>
              <td
                style={{
                  padding: "16px 12px",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                Internet Handling Fees (exclusive)
              </td>

              <td
                style={{
                  padding: "16px 12px",
                  borderBottom: "1px solid #eee",
                  fontSize: "14px",
                  color: "#333",
                  textAlign: "right",
                }}
              >
                00.00
              </td>
            </tr>
          </tbody>
        </table>

        {/* --- TOTALS --- */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <div style={{ width: "250px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "13px",
                color: "#666",
              }}
            >
              <span>Sub Total</span>

              <span>{data.amount}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
                borderTop: "2px solid #333",
                paddingTop: "12px",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                Total
              </span>

              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                {data.amount}
              </span>
            </div>
          </div>
        </div>

        {/* --- AMOUNT IN WORDS --- */}

        {/* <div
          style={{
            marginBottom: "40px",
            borderTop: "1px solid #eee",
            paddingTop: "15px",
          }}
        >
          <p
            style={{
              margin: "0 0 5px 0",
              fontSize: "11px",
              color: "#888",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Amount Received in Words:
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontStyle: "italic",
              color: "#333",
            }}
          >
            Two Thousand Five Hundred Fifteen Rupees Only
          </p>
        </div> */}

        {/* --- FOOTER / NOTES --- */}

        <div
          style={{
            background: "#f9fafb",
            padding: "15px",
            borderRadius: "4px",
            border: "1px dashed #ddd",
          }}
        >
          <p
            style={{
              margin: "0 0 5px 0",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Notes:
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "11px",
              color: "#777",
              lineHeight: "1.5",
            }}
          >
            This is a computer generated payment receipt and does not require a
            signature.
          </p>
        </div>

      </div>
            </>
           }
        </>
    }

    </div>
  );
};

export default Receipt;

/* ================= STYLES ================= */

// const styles: any = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "12px 20px",
//     background: "#ffffff",
//     borderBottom: "1px solid #ddd",
//     marginBottom: "20px",
//   },
//   backBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "14px",
//     color: "black",
//   },
//   downloadBtn: {
//     background: "#000",
//     color: "#fff",
//     padding: "8px 14px",
//     border: "none",
//     cursor: "pointer",
//   },
//   receipt: {
//     background: "#ffffff",
//     color: "#000000",
//     padding: "24px",
//     width: "600px",
//     margin: "0 auto",
//     fontFamily: "Arial, sans-serif",
//     border: "1px solid #ccc",
//   },
//   header: {
//     textAlign: "center",
//   },
//   title: {
//     margin: 0,
//   },
//   subText: {
//     margin: "4px 0",
//     fontSize: "12px",
//   },
//   receiptTitle: {
//     marginTop: "10px",
//   },
//   metaTable: {
//     width: "100%",
//     marginTop: "10px",
//     fontSize: "14px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "15px",
//   },
//   th: {
//     borderBottom: "1px solid #000",
//     textAlign: "left",
//     padding: "8px",
//   },
//   thRight: {
//     borderBottom: "1px solid #000",
//     textAlign: "right",
//     padding: "8px",
//   },
//   td: {
//     padding: "8px",
//     borderBottom: "1px solid #ddd",
//   },
//   tdRight: {
//     padding: "8px",
//     borderBottom: "1px solid #ddd",
//     textAlign: "right",
//   },
//   footer: {
//     fontSize: "12px",
//     textAlign: "center",
//     marginTop: "20px",
//   },
// };
