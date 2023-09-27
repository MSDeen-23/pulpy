package com.pulpy.emailservice.service;

import com.pulpy.sharedservices.models.EmailModel;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {
    @Value("${spring.sendgrid.api-key}")
    private String apiKey;
    public  void sendEmail(EmailModel emailModel) throws IOException {
        Email from = new Email("info@pulpy.io");
        String subject = emailModel.getSubject();
        Email to = new Email(emailModel.getTo());
        Content content = new Content("text/plain", emailModel.getMessage());
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
//        String to = emailModel.getTo();
//        String from = "pulpyiomail@gmail.com";
//        String host = "smtp.gmail.com";
//        Properties properties = System.getProperties();
//        properties.put("mail.smtp.host", host);
//        properties.put("mail.smtp.port", "465");
//        properties.put("mail.smtp.ssl.enable", "false");
//        properties.put("mail.smtp.auth", "true");
//        properties.put("mail.transport.protocol", "smtp");
//        properties.put("mail.smtp.starttls.enable", "true");
//        properties.put("mail.imap.partialfetch", "false");
//        properties.put("mail.smtp.ssl.trust", "*");
//        Session session = Session.getDefaultInstance(properties);
//        try {
//            MimeMessage message = new MimeMessage(session);
//            message.setFrom(new InternetAddress(from));
//            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
//            message.setSubject(emailModel.getSubject());
//            Multipart multipart = new MimeMultipart();
//            MimeBodyPart textPart = new MimeBodyPart();
//            textPart.setText(emailModel.getMessage());
//            multipart.addBodyPart(textPart);
//            message.setContent(multipart);
//            System.out.println("sending...");
//            Transport transport = session.getTransport();
////            transport.connect("smtp.gmail.com", "pulpyiomail@gmail.com", "Pulpy@123");
//            transport.connect("smtp.sendgrid.net", "apikey", "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");
//            transport.sendMessage(message, message.getAllRecipients());
//            System.out.println("Sent message successfully....");
//        } catch (MessagingException mex) {
//            mex.printStackTrace();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

    }
}
