const PaymentInfoTicker = ({onlinePaymentStatus} : {onlinePaymentStatus : boolean}) => {
  return (
    <div
      className="mb-4 overflow-hidden rounded-md
                    bg-blue-50 dark:bg-background
                    border border-blue-200 dark:border-background
                    py-2"
    >
    
    {
      !onlinePaymentStatus ?
        <p className="whitespace-nowrap animate-marquee
                            text-[13px] font-medium tracking-wide
                            text-red-700 dark:text-red-700 px-4">
          ⚠️ Online fee payment is temporarily disabled by the administration.
        </p>
       :
         <div
        className="whitespace-nowrap animate-marquee
                            text-[13px] font-medium tracking-wide
                            text-slate-700 dark:text-slate-300 px-4"
      >
        ℹ️ After payment, status may appear as Pending for a few minutes while
        blockchain verification is completed. Status updates automatically.
      </div>

    }

    </div>
  );
};

export default PaymentInfoTicker;

{
  /* <div
  className="mb-5 overflow-hidden rounded-lg
             border border-slate-200/70 dark:border-slate-700
             bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50
             dark:from-slate-900 dark:via-blue-950 dark:to-slate-900
             py-2.5 shadow-sm"
>
  <div
    className="whitespace-nowrap animate-marquee
               text-[13px] font-medium tracking-wide
               text-slate-700 dark:text-slate-300 px-4"
  >
    Payment status may temporarily appear as pending while blockchain verification is in progress. 
    Once confirmed, the status will update automatically.
  </div>
</div> */
}
