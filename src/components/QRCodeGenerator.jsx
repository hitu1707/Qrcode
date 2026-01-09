import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // ✅ Named import
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const qrRef = useRef();

  // 🔗 Replace with your actual signup URL
  const signupURL = "https://careers.appteknow.com/candidate/create-account";

  // Download QR as PNG
  const downloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement('a');
    link.download = 'apteknow-signup-qr.png';
    link.href = image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print QR Code
  const printQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const dataUrl = canvas.toDataURL();
    
    const windowContent = `
      <!DOCTYPE html>
      <html>
        <head><title>ApteKnow QR Code</title></head>
        <body style="text-align:center; margin-top:50px;">
          <h2>Scan to Sign Up - ApteKnow</h2>
          <img src="${dataUrl}" style="width:300px; height:300px;" />
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write(windowContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="qr-container">
      <h1>ApteKnow - Signup QR Code</h1>
      <p className="subtitle">Scan to create your account instantly</p>

      {/* QR Code Display */}
      <div ref={qrRef} className="qr-box">
        <QRCodeCanvas
          value={signupURL}
          size={280}
          level="H"
          includeMargin={true}
          fgColor="#000000"
          bgColor="#ffffff"

          // 🎨 Optional: Add your logo in center
          // imageSettings={{
          //   src: "/apteknow-logo.png",
          //   height: 50,
          //   width: 50,
          //   excavate: true,
          // }}
        />
      </div>


      {/* Action Buttons */}
      <div className="button-group">
        <button onClick={downloadQR} className="btn btn-primary">
          📥 Download PNG
        </button>
        <button onClick={printQR} className="btn btn-secondary">
          🖨️ Print QR
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;