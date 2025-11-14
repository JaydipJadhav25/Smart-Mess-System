import axios from "axios";

class SmsService {
   authKey = "477825AxijXzmyg6916bf60P1";
   senderId = "smart2025";
   templateId = "6916bf042c774b79506b891c";

  // -------------------------------------
  // Send Transactional SMS
  // -------------------------------------
  async sendSMS(phone, message) {
    if (!phone) return;

    const payload = {
      sender: this.senderId,
      route: "4", // 4 = transactional route
      sms: [
        {
          to: [phone],
          message: message,
        },
      ],
    };

    await axios.post(
      "https://api.msg91.com/api/v2/sendsms",
      payload,
      {
        headers: {
          authkey: this.authKey,
          "Content-Type": "application/json"
        },
      }
    );

    return "SMS Sent";
  }

  // -------------------------------------
  // Fee Payment SMS Template
  // -------------------------------------
  async sendFeePaymentSMS(parentPhone, studentName, amount) {
    const message = `Smart Mess System: ${studentName} has paid ₹${amount}. Fee submitted successfully.`;
    return await this.sendSMS(parentPhone, message);
  }
}

export const smsService = new SmsService();
