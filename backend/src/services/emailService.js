require("dotenv").config();
const nodemailer = require("nodemailer");
let sendSimplEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    from: process.env.EMAIL_APP,
  });
  const info = await transporter.sendMail({
    from: '"Bệnh viện Chí Thanh" <maddison53@ethereal.email>',
    to: data.reciverEmail,
    subject: "Thông tin đặt lịch khám bệnh ",
    text: `Xin chào ${data.patientName ? data.patientName : "Quý khách"}`,
    html: getBodyHTMLEmail(data),
  });
};
let getBodyHTMLEmail = (data) => {
  let result = "";
  if (data.language === "vi") {
    result = `
  <span> Bạn nhận được gmail này vì bạn đã đặt lịch khám bệnh ở bệnh viện Chí Thanh thành công !</span>
    <br/>
    <span>Thông tin lịch khám bệnh </span>
    <br/>
   <h3>Thời gian: ${data.time} </h3>
   <h3>Bác sĩ: ${data.doctorName} </h3>
   <p> Vui lòng xác nhận lịch khám <a href=${data.link} target="_bank">Click here </a></p>
   <span>Xin chân thành cảm ơn!Nếu có thắc mắc cần được giải đáp hãy liên hệ với chúng tôi </span>
   <span>Xin chân thành cảm ơn!</span>
  `;
  }
  if (data.language === "en") {
    result = `
    <span> You get this Gmail because you have scheduled a medical examination at Chi Thanh Hospital successfully! </ span>
    <br/>
    <span> Medical examination information </span>
    <br/>
   <h3> Time: ${data.time} </h3>
   <h3> Doctor: ${data.doctorName} </h3>
   <p> If you have any questions, please contact us <a href=${data.link} target="_bank"> Click here </a> </p>
   <span> Thank you very much! </span>
  `;
  }
  return result;
};
let sendAttachments = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    from: process.env.EMAIL_APP,
  });
  const info = await transporter.sendMail({
    from: '"Bệnh viện Chí Thanh" <maddison53@ethereal.email>',
    to: data.email,
    subject: "kết quả đặt lịch khám bệnh ",
    text: `Xin chào ${data.patientName ? data.patientName : "Quý khách"}`,
    html: getBodyHTMLEmailRemedy(data),
    attachments: [
      {
        filename: "text1.png",
        content: data.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};
let getBodyHTMLEmailRemedy = (data) => {
  let result = "";
  if (data.language === "vi") {
    result = `
<span> Bạn nhận được gmail này vì bạn đã đặt lịch khám bệnh ở bệnh viện Chí Thanh thành công !</span>
  <br/>
  <span>Thông tin đơn thuốc hóa đơn được gửi trong file đính kèm  </span>
  <br/>
  <div> Xin chân thành cảm ơn </div>
 `;
  }
  if (data.language === "en") {
    result = `
  <span> You get this Gmail because you have scheduled a medical examination at Chi Thanh Hospital successfully! </ span>
  <br/>
  <span>  bla bal  </span>
  <br/>
 <span> Thank you very much! </span>
`;
  }
  return result;
};
module.exports = {
  sendSimplEmail,
  sendAttachments,
};
