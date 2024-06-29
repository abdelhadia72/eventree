import QRCode from 'qrcode'

const generateQRCode = async (content) => {
    try {
        return await QRCode.toDataURL(content);
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}

export default generateQRCode;