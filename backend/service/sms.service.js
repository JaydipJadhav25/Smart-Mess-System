import twilio from "twilio"



const accountSid ="AC42296b792fa8bbfa1f3e9c779c4539a6";
const authToken ="beb24e4be582373b013e7622b0eeb76a";
const client = twilio(accountSid, authToken);

export async function createMessage() {
  const message = await client.messages.create({
    body: "Smart Mess System: Your child jaydip has paid ₹3000. Fee submitted successfully.".replace("Sent from your Twilio trial account -", ""),
    from: "+16506754792",
    to: "+917249824513",
  });

  console.log(message.body);

  return {
    message : "successfully",
    message
  }
}